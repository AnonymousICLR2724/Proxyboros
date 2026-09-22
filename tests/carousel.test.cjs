const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const { test } = require("node:test");
const vm = require("node:vm");

test("five-method cases switch atomically, wrap, and ignore stale loads", async () => {
  const element = () => ({
    events: {},
    attributes: {},
    addEventListener(name, handler) { this.events[name] = handler; },
    setAttribute(name, value) { this.attributes[name] = value; },
  });
  const controls = Object.fromEntries([
    ".case-progress", ".case-caption", ".case-count", ".method-grid", ".method-scroll",
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
  const viewers = columns.map(() => ({
    model: null,
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
      Clock: class { start() {} },
      Box3: class { union() {} },
      GLTFLoader: class {
        loadAsync(path) {
          return new Promise((resolve, reject) => requests.push({ path, resolve, reject }));
        }
      },
    },
  });
  vm.runInContext(readFileSync(join(__dirname, "../script.js"), "utf8"), context);
  context.createModelComparisonViewer = (_, index) => viewers[index];
  context.getSequenceBox = () => ({});
  context.normalizeModel = () => {};
  context.applyModelMaterial = () => {};
  context.disposeModel = (scene) => disposed.push(scene.id);
  const populated = (prefix) => Object.fromEntries(methods.map((method) => [method, `${prefix}-${method}`]));
  context.cases = [
    { title: "First motion", ...populated("first") },
    { title: "Second motion", ...populated("second") },
    { title: "Pending motion" },
  ];
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

  assert.equal(requests.length, 5);
  requests.slice(0, 4).forEach(resolve);
  await flush();
  assert.ok(viewers.every((viewer) => viewer.model === null), "wait for all five models");
  resolve(requests[4]);
  await flush();
  assert.deepEqual(viewers.map((viewer) => viewer.model.scene.id), methods.map((method) => `first-${method}`));
  assert.ok(columns.every((column) => column.status.hidden));

  next(); // Start loading the second case, then immediately select the empty third case.
  assert.ok(viewers.every((viewer) => viewer.model === null), "clear the previous case together");
  next();
  await flush();
  requests.slice(5).forEach(resolve);
  await flush();
  assert.match(caption.textContent, /Case 03/);
  assert.equal(disposed.length, 5);
  assert.ok(viewers.every((viewer) => viewer.model === null), "late results cannot restore a stale case");
  assert.ok(columns.every((column) => column.status.textContent === "GLB to be added"));

  next();
  assert.match(caption.textContent, /Case 01/, "next wraps to the first case");
  prev();
  await flush();
  assert.match(caption.textContent, /Case 03/, "previous wraps to the last case");
  progress.value = 1;
  progress.events.input();
  assert.match(caption.textContent, /Case 02/, "progress selects a whole case");
  const lastBatch = requests.slice(-5);
  lastBatch[0].reject(new Error("missing GLB"));
  lastBatch.slice(1).forEach(resolve);
  await flush();
  assert.equal(columns[0].status.textContent, "Unable to load GLB");
  assert.ok(viewers.slice(1).every((viewer) => viewer.model.scene.id.startsWith("second-")));
  assert.equal(controls[".method-grid"].attributes["aria-busy"], "false");

  const beforeGroupSwitch = requests.length;
  groupButtons[1].events.click();
  assert.match(caption.textContent, /Case 01 · Non-SMPL/);
  assert.equal(progress.max, 1, "each group has its own case count");
  assert.equal(groupButtons[1].attributes["aria-pressed"], "true");
  assert.equal(groupButtons[0].attributes["aria-pressed"], "false");
  assert.equal(columns[3].status.textContent, "Unavailable");
  assert.equal(requests.length - beforeGroupSwitch, 4, "never request non-SMPL PoseShield, even with a path configured");
  next();
  await flush();
  assert.equal(columns[3].status.textContent, "Unavailable", "PoseShield stays unavailable across cases");
  groupButtons[0].events.click();
  assert.match(caption.textContent, /Case 01 · First motion/);
  requests.slice(beforeGroupSwitch, beforeGroupSwitch + 4).forEach(resolve);
  await flush();
  assert.ok(viewers.every((viewer) => viewer.model === null), "late loads cannot cross group boundaries");
  requests.slice(-5).forEach(resolve);
  await flush();
  assert.ok(columns[3].status.hidden, "SMPL-H restores PoseShield when its model is available");
  assert.equal(progress.max, 2);
});
