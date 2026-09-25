const assert = require("node:assert/strict");
const { readFileSync, existsSync, readdirSync } = require("node:fs");
const { join } = require("node:path");
const { test } = require("node:test");
const vm = require("node:vm");

test("comparison inventories reference every complete case and initial HTML matches", () => {
  const context = vm.createContext({ window: {}, document: { querySelectorAll: () => [] } });
  const source = readFileSync(join(__dirname, "../script.js"), "utf8");
  vm.runInContext(source, context);
  const cases = vm.runInContext('comparisonCases["smpl-h"]', context);
  for (const [group, folder, expectedCount] of [["smpl-h", "SMPLH-comparison", 10], ["non-smpl", "nonSMPLH-comparison", 8]]) {
    const entries = vm.runInContext('comparisonCases["' + group + '"]', context);
    const directory = join(__dirname, "../assets/models", folder);
    const inventory = readdirSync(directory, { withFileTypes: true }).filter((item) => item.isDirectory()).map((item) => item.name).sort();
    assert.equal(entries.length, expectedCount);
    assert.deepEqual(Array.from(entries, (entry) => entry.input.split("/").at(-2)).sort(), inventory);
    const filenames = { input: "input", isir: "isir", meshUtg: "mesh-utg", ours: "ours" };
    if (group === "smpl-h") filenames.poseShield = "poseshield";
    for (const entry of entries) {
      const id = entry.input.split("/").at(-2);
      for (const [method, filename] of Object.entries(filenames)) {
        assert.equal(entry[method], `assets/models/${folder}/${id}/${filename}.glb`);
        assert.ok(existsSync(join(__dirname, "..", entry[method])), entry[method]);
      }
      if (group === "non-smpl") assert.equal(entry.poseShield, undefined);
    }
  }
  const html = readFileSync(join(__dirname, "../index.html"), "utf8");
  assert.equal(Number(html.match(/class="case-progress"[^>]*max="(\d+)"/)[1]), cases.length - 1);
  assert.ok(html.includes(`01 / ${cases.length}`));
  assert.match(html, /class="case-caption"[^>]*>Motion Case 01<\/p>/);
  assert.match(html, /class="gallery-track"/);
  assert.match(html, /<p>Explore Original \/ Repaired splits\.<\/p>/);
  assert.doesNotMatch(html, /Browse one motion at a time/);
  assert.match(html, /data-display-mode="normal" aria-pressed="true"/);
  const rendered = html.replace(/<!--[\s\S]*?-->/g, "");
  assert.doesNotMatch(rendered, /<section id="videos"|href="#videos"|<video\b/);
  assert.match(html, /<section id="videos"/, "video markup is preserved inside a comment");
  assert.doesNotMatch(source + html, /assets\/models\/001849_135(?:_input)?\.glb/);
});

test("five-method cases switch atomically, wrap, and ignore stale loads", async () => {
  const element = () => ({
    events: {},
    attributes: {},
    getAnimations: () => [],
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
  const modeButtons = ["normal", "texture"].map((mode) => ({ ...element(), dataset: { displayMode: mode } }));
  const methods = ["input", "isir", "meshUtg", "poseShield", "ours"];
  const columns = methods.map((method) => ({
    dataset: { method },
    status: element(),
    querySelector() { return this.status; },
  }));
  const frames = [];
  const viewers = columns.map(() => ({
    model: null,
    setMode(mode) { this.mode = mode; },
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
        querySelectorAll: (selector) => selector === "[data-display-mode]" ? modeButtons : columns,
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
  const preparedModes = [];
  context.applyModelMaterial = (_, variant, mode) => preparedModes.push(mode);
  context.disposeModel = (scene) => disposed.push(scene.id);
  const populated = (prefix) => Object.fromEntries(methods.map((method) => [method, `${prefix}-${method}`]));
  const caseCount = vm.runInContext('comparisonCases["smpl-h"].length', context);
  context.cases = Array.from({ length: caseCount }, (_, i) => ({ title: `Motion ${i + 1}`, ...populated(`case-${i + 1}`) }));
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
  assert.equal(count.textContent, `01 / ${caseCount}`);
  assert.deepEqual(bounded, ["case-1-input"], "compute only Input bounds once");
  assert.equal(normalized.length, 5);
  assert.equal(normalized[0].bounds.margin, 0.2, "shared margin is 10% of Input extent on each side");
  assert.ok(normalized.every((item) => item.bounds === normalized[0].bounds), "all methods receive the same bounds object");

  assert.deepEqual(preparedModes, ["normal", "normal", "normal", "normal", "normal"]);
  const beforeToggle = requests.length;
  modeButtons[1].events.click();
  assert.ok(viewers.every((viewer) => viewer.mode === "texture"));
  assert.equal(requests.length, beforeToggle, "mode switches never reload GLBs");
  assert.equal(modeButtons[1].attributes["aria-pressed"], "true");

  next();
  assert.deepEqual(ids(), methods.map(() => null), "old geometry clears immediately");
  assert.equal(caption.textContent, "Motion Case 02", "caption immediately identifies requested case");
  assert.equal(count.textContent, `02 / ${caseCount}`);
  assert.match(status.textContent, /Loading Motion Case 02/);
  requests.slice(-5, -1).forEach(resolve);
  await flush();
  assert.deepEqual(ids(), methods.map(() => null), "partial completion leaves every method empty");
  resolve(requests.at(-1));
  await flush();
  assert.deepEqual(ids(), expected(2));
  assert.ok(preparedModes.slice(-5).every((mode) => mode === "texture"), "chosen mode persists across cases");
  assert.equal(count.textContent, `02 / ${caseCount}`);
  assert.equal(caption.textContent, "Motion Case 02");
  assert.doesNotMatch(caption.textContent + status.textContent, /\d{6}_135/);
  assert.deepEqual(bounded, ["case-1-input", "case-2-input"], "one Input computation for each loaded case");
  assert.equal(status.textContent, "");

  next();
  const stale = requests.slice(-5);
  next();
  stale.forEach(resolve);
  await flush();
  assert.deepEqual(ids(), methods.map(() => null), "stale results cannot appear while the latest batch is loading");
  await settle();
  assert.deepEqual(ids(), expected(4), "stale loads cannot overwrite latest case");
  assert.equal(disposed.length, 5, "stale scenes are disposed");

  const beforeDrag = requests.length;
  for (let value = 0; value < caseCount; value += 1) {
    progress.value = value;
    progress.events.input?.();
  }
  assert.equal(requests.length, beforeDrag, "dragging never requests intermediate cases");
  progress.events.change();
  assert.equal(requests.length, beforeDrag + 5, "commit requests one batch");
  await settle();
  assert.deepEqual(ids(), expected(caseCount));
  next();
  await settle();
  assert.deepEqual(ids(), expected(1), "next wraps through all cases");
  prev();
  await settle();
  assert.deepEqual(ids(), expected(caseCount), "previous wraps to the last case");

  next();
  const failed = requests.slice(-5);
  failed[0].reject(new Error("missing GLB"));
  failed.slice(1).forEach(resolve);
  await flush();
  assert.deepEqual(ids(), methods.map(() => null), "failed batch leaves the requested case empty");
  assert.equal(caption.textContent, "Motion Case 01");
  assert.match(status.textContent, /Unable to load Motion Case 01/);
  assert.equal(disposed.length, 9, "dispose successful members of failed batch");
  assert.equal(Number(progress.value), 0, "keep requested selection after failure");
  assert.equal(progress.attributes["aria-valuetext"], `Case 1 of ${caseCount}`);
  assert.equal(controls[".method-grid"].attributes["aria-busy"], "false");
  progress.events.change();
  await settle();
  assert.deepEqual(ids(), expected(1), "failed case can be retried");

  const beforeGroupSwitch = requests.length;
  groupButtons[1].events.click();
  assert.deepEqual(ids(), methods.map(() => null), "group switching immediately clears old geometry");
  assert.equal(groupButtons[0].attributes["aria-pressed"], "false");
  assert.equal(requests.length - beforeGroupSwitch, 4, "never request non-SMPL PoseShield, even if configured");
  requests.slice(-4).forEach(resolve);
  await flush();
  assert.equal(caption.textContent, "Motion Case 01");
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
  assert.equal(caption.textContent, "Motion Case 01");
  assert.equal(viewers[3].model, null, "late SMPL-H loads cannot cross group boundaries");
  groupButtons[0].events.click();
  await settle();
  assert.deepEqual(ids(), expected(1), "group switching returns to case 1");
  assert.ok(columns[3].status.hidden);
  assert.ok(preparedModes.slice(-5).every((mode) => mode === "texture"), "mode persists across groups");
  assert.equal(progress.max, caseCount - 1);

  context.normalizeModel = () => { throw new Error("preparation failed"); };
  next();
  await settle();
  assert.deepEqual(ids(), methods.map(() => null), "preparation failure stays empty");
  assert.match(status.textContent, /Unable to load Motion Case 02/);
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

test("material modes preserve texture references and dispose shared resources once", () => {
  class Material {
    constructor(options = {}) { Object.assign(this, options); this.disposals = 0; }
    dispose() { this.disposals++; }
  }
  const context = vm.createContext({
    window: {}, document: { querySelectorAll: () => [] },
    THREE: { MeshStandardMaterial: Material, MeshNormalMaterial: Material, DoubleSide: 2 },
  });
  vm.runInContext(readFileSync(join(__dirname, "../script.js"), "utf8"), context);
  const texture = { isTexture: true, disposals: 0, dispose() { this.disposals++; } };
  const textured = new Material({ map: texture });
  const plain = new Material();
  const geometry = { morphAttributes: { position: Array(8).fill({}), normal: Array(8).fill({}) }, disposals: 0, dispose() { this.disposals++; } };
  const mesh = { isMesh: true, isSkinnedMesh: true, userData: {}, geometry, material: [textured, plain] };
  const sibling = { ...mesh, userData: {}, material: textured };
  const model = { traverse(callback) { [mesh, sibling].forEach(callback); } };
  context.applyModelMaterial(model, "after", "normal");
  const state = mesh.userData.displayMaterials;
  assert.equal(state.texture[0], textured, "keep the source texture material");
  assert.equal(state.texture[1].color, 0x4169E1, "keep existing fallback appearance");
  assert.ok(state.normal[0].skinning && state.normal[0].morphTargets);
  assert.equal(state.normal[0].morphNormals, false, "r128 must retain all eight position targets");
  assert.equal(state.normal[0].flatShading, true);
  for (let i = 0; i < 5; i++) {
    context.setModelMaterialMode(model, "texture");
    assert.equal(mesh.material, state.texture);
    context.setModelMaterialMode(model, "normal");
    assert.equal(mesh.material, state.normal);
  }
  assert.equal(textured.disposals, 0, "toggles dispose nothing");
  context.disposeModel(model);
  assert.equal(textured.disposals, 1);
  assert.equal(plain.disposals, 1);
  assert.equal(state.texture[1].disposals, 1);
  assert.equal(state.normal[0].disposals, 1, "deduplicate normal shared by material groups");
  assert.equal(texture.disposals, 1);
  assert.equal(geometry.disposals, 1);
});

test("research overview preserves supplied prose, figure and section order", () => {
  const html = readFileSync(join(__dirname, "../index.html"), "utf8");
  const sections = ["abstract", "method-overview", "comparisons", "models", "details"].map((id) => html.indexOf(`<section id="${id}"`));
  assert.ok(sections.every((offset, i) => offset >= 0 && (i === 0 || offset > sections[i - 1])));
  const abstract = html.match(/<p class="abstract-copy">([\s\S]*?)<\/p>/)[1];
  const caption = html.match(/<figcaption>([\s\S]*?)<\/figcaption>/)[1];
  const text = (markup) => markup.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  const suppliedAbstract = "Physically plausible animation of rigged shapes is essential for realistic and high-quality 3D content creation. However, motion sequences produced by existing generation models often exhibit surface collisions and self-intersections, resulting in physically implausible geometry and noticeable visual artifacts. Resolving these invalid surface geometries while faithfully preserving the spatiotemporal characteristics of the original motion remains a challenging yet under-explored problem. To address this, we propose Proxyboros, an optimization framework for dynamic self-intersection repair that alternates mesh-space repair with rig-space pose adaptation to progressively guide the evolving rig toward temporally coherent skeletal motion. Within each step, Mesh-Space Proxy Exploration first extracts intermediate geometric proxies that capture local repair tendencies before independent repairs crystallize into temporally inconsistent static solutions. Proxy-Guided Pose Adaptation then incorporates this guidance into a temporally coupled skeletal trajectory using surface-aware proxy guidance, absorbing stable surface-separation cues while relaxing ambiguous local displacements. Experiments on SMPL-H sequences and diverse non-SMPL rigged models demonstrate consistent improvements over state-of-the-art methods in repair quality, pose preservation, and motion fidelity, with robust generalization across heterogeneous mesh and skeleton topologies.";
  const suppliedCaption = "Overview of Proxyboros. Each iteration first explores self-intersection repair directions and retains the intermediate geometry as a proxy. The proxy then drives pose adaptation under temporal B-spline controls and surface-aware geometric guidance. The resulting rigged sequence initiates the next round, gradually converting local repair directions into consistent skeletal motion.";
  assert.equal(text(abstract), suppliedAbstract);
  assert.equal(text(caption), suppliedCaption);
  assert.match(abstract, /<strong>Mesh-Space Proxy Exploration<\/strong>/);
  assert.match(abstract, /<strong>Proxy-Guided Pose Adaptation<\/strong>/);
  assert.doesNotMatch(abstract + caption, /\\textbf|\d{6}_135/);
  assert.match(html, /src="assets\/method overview.png" width="3039" height="1238"/);
  assert.ok(existsSync(join(__dirname, "../assets/method overview.png")));
});
