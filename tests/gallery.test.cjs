const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const { test } = require("node:test");
const vm = require("node:vm");

function galleryHarness() {
  const element = () => ({
    events: {}, dataset: {}, style: {}, attributes: {}, children: [],
    addEventListener(name, handler) { this.events[name] = handler; },
    setAttribute(name, value) { this.attributes[name] = value; },
    append(child) { this.children.push(child); },
    getBoundingClientRect: () => ({ width: 200 }),
  });
  const track = element();
  const previous = element();
  const next = element();
  const count = element();
  const frame = element();
  frame.querySelector = (selector) => ({ ".gallery-track": track, "[data-gallery-prev]": previous, "[data-gallery-next]": next }[selector]);
  const window = { ...element(), matchMedia: () => reduced };
  const reduced = { ...element(), matches: false };
  const document = { ...element(), hidden: false,
    querySelector: (selector) => ({ ".film-gallery": frame, ".gallery-count": count }[selector]),
    createElement() {
      const card = element();
      const viewerRoot = element();
      card.querySelector = () => viewerRoot;
      return card;
    },
  };
  const observers = [];
  class Observer {
    constructor(callback) { this.callback = callback; observers.push(this); }
    observe(target) { this.target = target; }
  }
  window.IntersectionObserver = Observer;
  let visibleCards = 3;
  let now = 0;
  let serial = 0;
  const timers = new Map();
  const context = vm.createContext({ window, document, IntersectionObserver: Observer,
    getComputedStyle: () => ({ getPropertyValue: () => String(visibleCards), gap: "14px" }),
    setTimeout(callback, delay) { const id = ++serial; timers.set(id, { callback, at: now + delay }); return id; },
    clearTimeout: (id) => timers.delete(id),
  });
  vm.runInContext(readFileSync(join(__dirname, "../script.js"), "utf8"), context);
  const created = [];
  context.createModelComparisonViewer = (root, index) => {
    const viewer = { root, index, updates: 0, disposed: false,
      update() { this.updates++; }, dispose() { this.disposed = true; },
    };
    created.push(viewer);
    return viewer;
  };
  context.initAnimationGallery();
  const advance = (ms) => {
    const end = now + ms;
    while (true) {
      const ready = [...timers].filter(([, timer]) => timer.at <= end).sort((a, b) => a[1].at - b[1].at)[0];
      if (!ready) break;
      const [id, timer] = ready;
      now = timer.at;
      timers.delete(id);
      timer.callback();
    }
    now = end;
  };
  return { context, frame, track, previous, next, count, window, document, reduced, created, observers, advance,
    resize(count) { visibleCards = count; window.events.resize(); },
  };
}

test("gallery derives 15 labeled split cards from comparison data", () => {
  const h = galleryHarness();
  const cases = vm.runInContext('comparisonCases["smpl-h"]', h.context);
  assert.equal(h.track.children.length, 15);
  h.track.children.forEach((card, index) => {
    const root = card.querySelector("[data-viewer]");
    assert.equal(root.dataset.beforeModel, cases[index].input);
    assert.equal(root.dataset.afterModel, cases[index].ours);
    assert.ok(card.innerHTML.includes(`Motion Case ${String(index + 1).padStart(2, "0")}`));
    assert.doesNotMatch(card.innerHTML, /\d{6}_135/);
  });
  assert.equal(h.created.length, 0, "DOM shells do not eagerly initialize 15 viewers");
});

test("gallery arrows step one card and responsive changes preserve the leading index", () => {
  const h = galleryHarness();
  assert.equal(h.count.textContent, "01–03 / 15");
  assert.ok(h.previous.disabled);
  h.next.events.click();
  assert.equal(h.count.textContent, "02–04 / 15");
  assert.equal(h.track.style.transform, "translateX(-214px)");
  h.next.events.click();
  h.resize(2);
  assert.equal(h.count.textContent, "03–04 / 15");
  h.resize(1);
  assert.equal(h.count.textContent, "03–03 / 15");
  h.previous.events.click();
  assert.equal(h.count.textContent, "02–02 / 15");
  for (let i = 0; i < 20; i++) h.next.events.click();
  assert.equal(h.count.textContent, "15–15 / 15");
  assert.ok(h.next.disabled, "manual navigation clamps without cloned viewers");
});

test("gallery advances after six idle seconds, resets on interaction, and pauses while dragging", () => {
  const h = galleryHarness();
  h.observers[0].callback([{ isIntersecting: true }]);
  h.advance(5999);
  assert.equal(h.count.textContent, "01–03 / 15");
  h.advance(1);
  assert.equal(h.count.textContent, "02–04 / 15");
  h.advance(5000);
  h.frame.events.wheel();
  h.advance(5999);
  assert.equal(h.count.textContent, "02–04 / 15");
  h.frame.events.pointerdown({ pointerId: 7 });
  h.advance(20000);
  assert.equal(h.count.textContent, "02–04 / 15");
  h.window.events.pointerup({ pointerId: 7 });
  h.advance(6000);
  assert.equal(h.count.textContent, "03–05 / 15");
  for (let i = 0; i < 20; i++) h.next.events.click();
  assert.equal(h.count.textContent, "13–15 / 15");
  h.advance(6000);
  assert.equal(h.count.textContent, "12–14 / 15", "automatic showcase reverses at the end");
});

test("offscreen, hidden and reduced-motion states pause gallery showcase", () => {
  const h = galleryHarness();
  h.advance(20000);
  assert.equal(h.count.textContent, "01–03 / 15");
  h.observers[0].callback([{ isIntersecting: true }]);
  h.document.hidden = true;
  h.document.events.visibilitychange();
  h.advance(20000);
  assert.equal(h.count.textContent, "01–03 / 15");
  h.document.hidden = false;
  h.document.events.visibilitychange();
  h.reduced.matches = true;
  h.reduced.events.change();
  h.advance(20000);
  assert.equal(h.count.textContent, "01–03 / 15");
  h.next.events.click();
  assert.equal(h.count.textContent, "02–04 / 15", "manual arrows still work with reduced motion");
  h.reduced.matches = false;
  h.reduced.events.change();
  h.advance(6000);
  assert.equal(h.count.textContent, "03–05 / 15");
  h.observers[0].callback([{ isIntersecting: false }]);
  h.advance(20000);
  assert.equal(h.count.textContent, "03–05 / 15");
});

test("gallery loads only visible cards plus one neighbor and evicts distant viewers", () => {
  const h = galleryHarness();
  assert.equal(h.created.length, 0);
  h.observers[0].callback([{ isIntersecting: true }]);
  assert.deepEqual(h.created.map((viewer) => viewer.index), [0, 1, 2, 3]);
  vm.runInContext("activeViewers[0].update()", h.context);
  assert.deepEqual(h.created.map((viewer) => viewer.updates), [1, 1, 1, 0], "preloaded offscreen neighbor is not rendered");
  h.next.events.click();
  assert.equal(h.created.filter((viewer) => !viewer.disposed).length, 5);
  h.next.events.click();
  assert.ok(h.created[0].disposed);
  for (let i = 0; i < 15; i++) {
    h.next.events.click();
    assert.ok(h.created.filter((viewer) => !viewer.disposed).length <= 5);
  }
  for (let i = 0; i < 15; i++) h.previous.events.click();
  assert.ok(h.created.filter((viewer) => viewer.index === 0).length > 1, "revisits recreate a disposed viewer");
  h.resize(1);
  assert.ok(h.created.filter((viewer) => !viewer.disposed).length <= 3);
  const updates = h.created.map((viewer) => viewer.updates);
  h.observers[0].callback([{ isIntersecting: false }]);
  vm.runInContext("activeViewers.forEach(viewer => { if (viewer.visible) viewer.update(); })", h.context);
  assert.deepEqual(h.created.map((viewer) => viewer.updates), updates);
});

test("a GLB resolving after gallery eviction is disposed without attaching or preparing it", async () => {
  let finish;
  const disposed = [];
  const context = vm.createContext({
    window: {}, document: {},
    THREE: { GLTFLoader: class { loadAsync() { return new Promise((resolve) => { finish = resolve; }); } } },
  });
  vm.runInContext(readFileSync(join(__dirname, "../script.js"), "utf8"), context);
  context.disposeModel = (scene) => disposed.push(scene);
  context.getSequenceBox = () => { throw new Error("must not prepare an evicted model"); };
  let evicted = false;
  const result = context.loadModel("input.glb", { add() { throw new Error("must not attach"); } }, [], {}, "before", () => evicted);
  evicted = true;
  const scene = {};
  finish({ scene, animations: [] });
  assert.equal(await result, false);
  assert.deepEqual(disposed, [scene]);
});
