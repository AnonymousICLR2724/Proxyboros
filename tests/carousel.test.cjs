const assert = require("node:assert/strict");
const { readFileSync, existsSync } = require("node:fs");
const { join } = require("node:path");
const { test } = require("node:test");
const vm = require("node:vm");

test("all 15 SMPL-H cases reference five existing compressed GLBs", () => {
  const context = vm.createContext({ window: {}, document: { querySelectorAll: () => [] } });
  const source = readFileSync(join(__dirname, "../script.js"), "utf8");
  vm.runInContext(source, context);
  const cases = vm.runInContext('comparisonCases["smpl-h"]', context);
  assert.equal(cases.length, 15);
  assert.equal(new Set(cases.map((entry) => entry.input)).size, 15);
  const filenames = { input: "input", isir: "isir", meshUtg: "mesh-utg", poseShield: "poseshield", ours: "ours" };
  cases.forEach((entry) => {
    const sequence = entry.title.match(/\d{6}_135/)[0];
    Object.entries(filenames).forEach(([method, filename]) => {
      assert.equal(entry[method], `assets/models/SMPLH-comparison/motionfix_${sequence}/${filename}.glb`);
      assert.ok(existsSync(join(__dirname, "..", entry[method])), entry[method]);
    });
  });
  const nonSmpl = vm.runInContext('comparisonCases["non-smpl"]', context);
  assert.equal(nonSmpl.length, 3);
  assert.ok(nonSmpl.every((entry) => !entry.poseShield));
  const html = readFileSync(join(__dirname, "../index.html"), "utf8");
  assert.match(html, /class="case-progress"[^>]*max="14"/);
  assert.match(html, /01 \/ 15/);
  assert.ok(html.includes(`data-before-model="${cases[0].input}"`));
  assert.ok(html.includes(`data-after-model="${cases[0].ours}"`));
  assert.doesNotMatch(source + html, /assets\/models\/001849_135(?:_input)?\.glb/);
});

test("five-method cases switch atomically, wrap, and ignore stale loads", async () => {
  const element = () => ({
    events: {},
    attributes: {},
    addEventListener(name, handler) { this.events[name] = handler; },
    setAttribute(name, value) { this.attributes[name] = value; },
  });
  const controls = Object.fromEntries([
    ".case-progress", ".case-caption", ".case-count", ".case-status", ".method-grid", ".method-scroll",
    "[data-case-prev]", "[data-case-next]",
  ].map((selector) => [selector, element()]));
  const groupButtons = ["smpl-h", "non-smpl"].map((group) => ({
    ...element(), dataset: { caseGroup: group },
  }));
  const methods = ["input", "isir", "meshUtg", "poseShield", "ours"];
  const columns = methods.map((method) => ({
    dataset: { method },
    status: element(),
    querySelector() { return this.status; },
  }));
  const frames = [];
  const viewers = columns.map(() => ({
    model: null,
    update(elapsed) { frames.push(elapsed); },
    controls: element(),
    setModel(model) { this.model = model; },
  }));
  const requests = [];
  const disposed = [];
  const context = vm.createContext({
    window: { matchMedia: () => ({ matches: true }) },
    document: {
      querySelectorAll: (selector) => selector === "[data-case-group]" ? groupButtons : [],
      querySelector: () => ({
        querySelector: (selector) => controls[selector],
        querySelectorAll: () => columns,
      }),
    },
    THREE: {
      Clock: class { start() {} getElapsedTime() { return 12.5; } },
      Box3: class { getSize() { return { x: 0, y: 0, z: 0 }; } expandByScalar() {} },
      Vector3: class {},
      GLTFLoader: class {
        loadAsync(path) {
          return new Promise((resolve, reject) => requests.push({ path, resolve, reject }));
        }
      },
    },
  });
  vm.runInContext(readFileSync(join(__dirname, "../script.js"), "utf8"), context);
  context.createModelComparisonViewer = (_, index) => viewers[index];
  const bounded = [];
  const normalized = [];
  context.getSequenceBox = (scene) => {
    bounded.push(scene.id);
    return { reference: scene.id, getSize: () => ({ x: 1, y: 2, z: 1 }), expandByScalar(margin) { this.margin = margin; } };
  };
  context.normalizeModel = (scene, bounds) => normalized.push({ scene: scene.id, bounds });
  context.applyModelMaterial = () => {};
  context.disposeModel = (scene) => disposed.push(scene.id);
  const populated = (prefix) => Object.fromEntries(methods.map((method) => [method, `${prefix}-${method}`]));
  context.cases = Array.from({ length: 15 }, (_, i) => ({ title: `Motion ${i + 1}`, ...populated(`case-${i + 1}`) }));
  context.nonSmplCases = [
    { title: "Non-SMPL motion", ...populated("non-smpl") },
    { title: "Another non-SMPL motion" },
  ];
  vm.runInContext('comparisonCases["smpl-h"] = cases; comparisonCases["non-smpl"] = nonSmplCases; initComparisonCarousel();', context);
  const flush = () => new Promise(setImmediate);
  const resolve = (request) => request.resolve({ scene: { id: request.path }, animations: [] });
  const next = controls["[data-case-next]"].events.click;
  const prev = controls["[data-case-prev]"].events.click;
  const progress = controls[".case-progress"];
  const caption = controls[".case-caption"];

  vm.runInContext("activeViewers[0].update()", context);
  assert.deepEqual(frames, [12.5, 12.5, 12.5, 12.5, 12.5], "all five viewers get exactly the same animation time");
  const ids = () => viewers.map((viewer) => viewer.model?.scene.id ?? null);
  const expected = (number) => methods.map((method) => `case-${number}-${method}`);
  const settle = async () => { requests.slice(-5).forEach(resolve); await flush(); };
  const status = controls[".case-status"];
  const count = controls[".case-count"];

  assert.equal(requests.length, 5);
  requests.slice(0, 4).forEach(resolve);
  await flush();
  assert.deepEqual(ids(), methods.map(() => null), "wait for all five models");
  resolve(requests[4]);
  await flush();
  assert.deepEqual(ids(), expected(1));
  assert.ok(columns.every((column) => column.status.hidden));
  assert.equal(count.textContent, "01 / 15");
  assert.deepEqual(bounded, ["case-1-input"], "compute only Input bounds once");
  assert.equal(normalized.length, 5);
  assert.equal(normalized[0].bounds.margin, 0.2, "shared margin is 10% of Input extent on each side");
  assert.ok(normalized.every((item) => item.bounds === normalized[0].bounds), "all methods receive the same bounds object");

  next();
  assert.deepEqual(ids(), expected(1), "old geometry stays visible while loading");
  assert.match(caption.textContent, /Case 01/, "old caption stays with old geometry");
  assert.equal(count.textContent, "01 / 15");
  assert.match(status.textContent, /Loading SMPL-H Case 02/);
  requests.slice(-5, -1).forEach(resolve);
  await flush();
  assert.deepEqual(ids(), expected(1), "partial completion does not swap any method");
  resolve(requests.at(-1));
  await flush();
  assert.deepEqual(ids(), expected(2));
  assert.equal(count.textContent, "02 / 15");
  assert.deepEqual(bounded, ["case-1-input", "case-2-input"], "one Input computation for each loaded case");
  assert.equal(status.textContent, "");

  next();
  const stale = requests.slice(-5);
  next();
  await settle();
  stale.forEach(resolve);
  await flush();
  assert.deepEqual(ids(), expected(4), "stale loads cannot overwrite latest case");
  assert.equal(disposed.length, 5, "stale scenes are disposed");

  const beforeDrag = requests.length;
  for (let value = 0; value < 15; value += 1) {
    progress.value = value;
    progress.events.input?.();
  }
  assert.equal(requests.length, beforeDrag, "dragging never requests intermediate cases");
  progress.events.change();
  assert.equal(requests.length, beforeDrag + 5, "commit requests one batch");
  await settle();
  assert.deepEqual(ids(), expected(15));
  next();
  await settle();
  assert.deepEqual(ids(), expected(1), "next wraps through all 15 cases");
  prev();
  await settle();
  assert.deepEqual(ids(), expected(15), "previous wraps to case 15");

  next();
  const failed = requests.slice(-5);
  failed[0].reject(new Error("missing GLB"));
  failed.slice(1).forEach(resolve);
  await flush();
  assert.deepEqual(ids(), expected(15), "failed batch retains every previous model");
  assert.match(caption.textContent, /Case 15/);
  assert.match(status.textContent, /Unable to load Case 01.*Previous case retained/);
  assert.equal(disposed.length, 9, "dispose successful members of failed batch");
  assert.equal(Number(progress.value), 14, "restore selection after failure");
  assert.equal(progress.attributes["aria-valuetext"], "Case 15 of 15");
  assert.equal(controls[".method-grid"].attributes["aria-busy"], "false");
  next();
  await settle();
  assert.deepEqual(ids(), expected(1), "failed case can be retried");

  const beforeGroupSwitch = requests.length;
  groupButtons[1].events.click();
  assert.deepEqual(ids(), expected(1), "group loading retains the displayed group");
  assert.equal(groupButtons[0].attributes["aria-pressed"], "true");
  assert.equal(requests.length - beforeGroupSwitch, 4, "never request non-SMPL PoseShield, even if configured");
  requests.slice(-4).forEach(resolve);
  await flush();
  assert.match(caption.textContent, /Case 01 · Non-SMPL/);
  assert.equal(progress.max, 1);
  assert.equal(groupButtons[1].attributes["aria-pressed"], "true");
  assert.equal(groupButtons[0].attributes["aria-pressed"], "false");
  assert.equal(columns[3].status.textContent, "Unavailable");
  assert.equal(viewers[3].model, null);
  next();
  await flush();
  assert.deepEqual(ids(), methods.map(() => null), "intentional placeholders clear the whole case");
  assert.equal(columns[3].status.textContent, "Unavailable");

  groupButtons[0].events.click();
  const staleGroup = requests.slice(-5);
  groupButtons[1].events.click();
  requests.slice(-4).forEach(resolve);
  await flush();
  staleGroup.forEach(resolve);
  await flush();
  assert.match(caption.textContent, /Case 01 · Non-SMPL/);
  assert.equal(viewers[3].model, null, "late SMPL-H loads cannot cross group boundaries");
  groupButtons[0].events.click();
  await settle();
  assert.deepEqual(ids(), expected(1), "group switching returns to case 1");
  assert.ok(columns[3].status.hidden);
  assert.equal(progress.max, 14);

  context.normalizeModel = () => { throw new Error("preparation failed"); };
  next();
  await settle();
  assert.deepEqual(ids(), expected(1), "preparation failure also retains the valid case");
  assert.match(status.textContent, /Unable to load Case 02/);
});

test("standalone viewers initialize once only near the models section", () => {
  const roots = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const section = {};
  const observers = [];
  class Observer {
    constructor(callback, options) { this.callback = callback; this.options = options; observers.push(this); }
    observe(target) { this.target = target; }
    disconnect() { this.disconnected = true; }
  }
  const context = vm.createContext({
    window: { IntersectionObserver: Observer },
    IntersectionObserver: Observer,
    document: { querySelectorAll: () => roots, querySelector: () => section },
  });
  vm.runInContext(readFileSync(join(__dirname, "../script.js"), "utf8"), context);
  const initialized = [];
  context.createModelComparisonViewer = (root) => { initialized.push(root); return { update() {} }; };
  context.initStandaloneViewers();
  assert.equal(initialized.length, 0, "no viewer construction or GLB loading before intersection");
  assert.equal(observers[0].target, section);
  assert.equal(observers[0].options.rootMargin, "300px");
  observers[0].callback([{ isIntersecting: false }]);
  assert.equal(initialized.length, 0);
  observers[0].callback([{ isIntersecting: true }]);
  assert.deepEqual(initialized, roots);
  assert.ok(observers[0].disconnected, "disconnect after one initialization");
  assert.equal(vm.runInContext("activeViewers.length", context), 3);

  context.window.IntersectionObserver = undefined;
  context.initStandaloneViewers();
  assert.equal(initialized.length, 6, "older browsers initialize without an observer");
});

test("RAF skips off-screen and hidden-tab viewers and resumes without recreating them", () => {
  let tick;
  let observer;
  class Observer {
    constructor(callback) { this.callback = callback; observer = this; }
    observe(target) { this.target = target; }
  }
  const context = vm.createContext({
    window: { THREE: {}, IntersectionObserver: Observer },
    IntersectionObserver: Observer,
    document: { hidden: false, querySelectorAll: () => [], querySelector: () => null },
    requestAnimationFrame: (callback) => { tick = callback; },
  });
  vm.runInContext(readFileSync(join(__dirname, "../script.js"), "utf8"), context);
  let updates = 0;
  context.viewer = { update() { updates += 1; } };
  context.container = {};
  vm.runInContext("observeViewerVisibility(container, viewer); activeViewers.push(viewer);", context);
  assert.equal(observer.target, context.container);
  tick();
  assert.equal(updates, 0, "no work before visibility is known");
  observer.callback([{ isIntersecting: true }]);
  tick();
  assert.equal(updates, 1);
  context.document.hidden = true;
  tick();
  assert.equal(updates, 1, "hidden document pauses rendering");
  context.document.hidden = false;
  tick();
  assert.equal(updates, 2, "returning to the tab resumes rendering");
  observer.callback([{ isIntersecting: false }]);
  tick();
  assert.equal(updates, 2, "scrolling off-screen pauses rendering");
  observer.callback([{ isIntersecting: true }]);
  tick();
  assert.equal(updates, 3);
  assert.equal(vm.runInContext("activeViewers.length", context), 1, "no recreation on scrolling");
});
