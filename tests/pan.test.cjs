const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const { test } = require("node:test");
const vm = require("node:vm");

test("comparison and split viewers explicitly map pan and preserve displaced targets during updates", () => {
  class Vector3 {
    constructor() { this.set(0, 0, 0); }
    set(x, y, z) { Object.assign(this, { x, y, z }); return this; }
  }
  class Object3D {
    constructor() { this.position = new Vector3(); }
    add() {}
    updateProjectionMatrix() {}
  }
  class Renderer {
    setPixelRatio() {}
    setSize() {}
    clear() {}
    render(scene, camera) { this.lastCamera = camera; }
  }
  class OrbitControls {
    constructor() { this.target = new Vector3(); this.mouseButtons = {}; this.updates = 0; }
    update() { this.updates++; }
  }
  const MOUSE = { ROTATE: 0, DOLLY: 1, PAN: 2 };
  const context = vm.createContext({
    window: { devicePixelRatio: 1, addEventListener() {} },
    AbortController,
    THREE: {
      MOUSE,
      WebGLRenderer: Renderer,
      Scene: Object3D, PerspectiveCamera: Object3D, Group: Object3D,
      AmbientLight: Object3D, HemisphereLight: Object3D, DirectionalLight: Object3D,
      OrbitControls,
      Clock: class { getElapsedTime() { return 1; } },
    },
  });
  vm.runInContext(readFileSync(join(__dirname, "../script.js"), "utf8"), context);
  context.loadSplitModels = async () => true;
  const splitCameras = [];
  context.renderSplitView = (renderer, scene, camera) => splitCameras.push(camera);
  for (const singleModel of [true, false]) {
    const status = {};
    const container = {
      dataset: {}, clientWidth: 300, clientHeight: 300,
      style: { setProperty() {} },
      hasAttribute: () => singleModel,
      querySelector: (selector) => selector === "canvas" ? {} : selector === ".model-status" ? status : null,
    };
    const viewer = context.createModelComparisonViewer(container, 0);
    assert.equal(viewer.controls.enablePan, true);
    assert.equal(viewer.controls.screenSpacePanning, true);
    assert.deepEqual(viewer.controls.mouseButtons, { LEFT: MOUSE.ROTATE, MIDDLE: MOUSE.DOLLY, RIGHT: MOUSE.PAN });
    assert.deepEqual(viewer.controls.target, new Vector3(), "default pan stays at the origin");
    viewer.controls.target.set(0.8, -0.4, 0.2);
    viewer.camera.position.set(0.8, -0.4, 3.9);
    const initialUpdates = viewer.controls.updates;
    for (let frame = 0; frame < 60; frame++) viewer.update(frame / 60);
    assert.equal(viewer.controls.updates, initialUpdates + 60);
    assert.deepEqual(viewer.controls.target, new Vector3().set(0.8, -0.4, 0.2), "frames must retain user pan");
    assert.deepEqual(viewer.camera.position, new Vector3().set(0.8, -0.4, 3.9));
    if (!singleModel) assert.ok(splitCameras.length === 60 && splitCameras.every((camera) => camera === viewer.camera), "both split halves keep the viewer's shared camera");
  }
});
