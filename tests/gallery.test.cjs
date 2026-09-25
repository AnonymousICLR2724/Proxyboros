const assert = require("node:assert/strict");
const { readFileSync, existsSync, readdirSync } = require("node:fs");
const { join } = require("node:path");
const { test } = require("node:test");
const vm = require("node:vm");

test("independent gallery datasets publish exactly the complete Input/Ours pairs", () => {
  const context = vm.createContext({ window: {} });
  vm.runInContext(readFileSync(join(__dirname, "../script.js"), "utf8"), context);
  for (const [group, folder] of [["smpl-h", "SMPLH-gallery"], ["non-smpl", "nonSMPLH-gallery"]]) {
    const cases = vm.runInContext('galleryCases["' + group + '"]', context);
    assert.notEqual(cases, vm.runInContext('comparisonCases["' + group + '"]', context));
    const directory = join(__dirname, "../assets/models", folder);
    const complete = readdirSync(directory, { withFileTypes: true }).filter((item) => item.isDirectory())
      .map((item) => item.name).filter((id) => ["input", "ours"].every((name) => existsSync(join(directory, id, name + ".glb")))).sort();
    assert.deepEqual(Array.from(cases, (entry) => entry.input.split("/").at(-2)).sort(), complete);
    for (const entry of cases) {
      assert.deepEqual(Object.keys(entry).sort(), ["input", "ours"]);
      const id = entry.input.split("/").at(-2);
      for (const name of ["input", "ours"]) {
        assert.equal(entry[name], `assets/models/${folder}/${id}/${name}.glb`);
        assert.ok(existsSync(join(__dirname, "..", entry[name])), entry[name]);
      }
    }
    if (group === "non-smpl") assert.equal(cases.length, 11);
    else {
      const id = "motionfix_005373_135";
      assert.equal(cases.some((entry) => entry.input.includes(id)), ["input", "ours"].every((name) => existsSync(join(directory, id, name + ".glb"))), "publish the previously incomplete case only when both required files exist");
    }
  }
});

test("page groups two accessible galleries and preserves the disabled video and Resources content", () => {
  const html = readFileSync(join(__dirname, "../index.html"), "utf8");
  const rendered = html.replace(/<!--[\s\S]*?-->/g, "");
  assert.equal((rendered.match(/Interactive Animation Gallery/g) || []).length, 1);
  for (const name of ["gallery-block", "film-gallery", "gallery-track", "gallery-count"]) {
    assert.equal((rendered.match(new RegExp(`class="${name}"`, "g")) || []).length, 2);
  }
  for (const [group, label] of [["smpl-h", "SMPL-H"], ["non-smpl", "non-SMPL-H"]]) {
    assert.ok(rendered.includes(`data-gallery-group="${group}"`));
    assert.ok(rendered.includes(`<h2>${label} Repaired Animations</h2>`));
    assert.ok(rendered.includes(`aria-label="${label} animation gallery"`));
    for (const direction of ["Previous", "Next"]) assert.ok(rendered.includes(`aria-label="${direction} ${label} animation"`));
  }
  assert.equal((rendered.match(/data-gallery-prev/g) || []).length, 2);
  assert.equal((rendered.match(/data-gallery-next/g) || []).length, 2);
  assert.match(rendered, /href="#details">Resources<\/a>/);
  assert.match(rendered, /id="details"[\s\S]*?>Resources<\/p>\s*<p>\s*The paper, research code, video, and citation will be available here upon release\.\s*<\/p>/);
  assert.doesNotMatch(rendered, /Submission Notes|<section id="videos"|href="#videos"|<video\b/);
  assert.match(html, /<section id="videos"/);
});

function galleryHarness({ observersEnabled = true, reducedMotion = false, groups = ["smpl-h"] } = {}) {
  const element = () => ({
    events: {}, dataset: {}, style: {}, attributes: {}, children: [],
    addEventListener(name, handler) {
      const previous = this.events[name];
      this.events[name] = (...args) => { previous?.(...args); handler(...args); };
    },
    setAttribute(name, value) { this.attributes[name] = value; },
    append(child) { this.children = this.children.filter((item) => item !== child); this.children.push(child); },
    prepend(child) { this.children = this.children.filter((item) => item !== child); this.children.unshift(child); },
    get firstElementChild() { return this.children[0]; },
    get lastElementChild() { return this.children.at(-1); },
    getBoundingClientRect: () => ({ width: 200 }),
  });
  const galleries = groups.map((group) => {
    const track = element();
    const previous = element();
    const next = element();
    const count = element();
    const frame = element();
    frame.querySelector = (selector) => ({ ".gallery-track": track, "[data-gallery-prev]": previous, "[data-gallery-next]": next }[selector]);
    const root = { querySelector: (selector) => ({ ".film-gallery": frame, ".gallery-count": count }[selector]) };
    const finish = () => track.events.transitionend({ target: track, propertyName: "transform" });
    return { group, root, frame, track, previous, next, count, finish,
      step(direction = 1) { (direction > 0 ? next : previous).events.click(); finish(); },
    };
  });
  const window = { ...element(), matchMedia: () => reduced };
  const reduced = { ...element(), matches: reducedMotion };
  const document = { ...element(), hidden: false,
    createElement() {
      const card = element();
      const viewerRoot = element();
      card.querySelector = () => viewerRoot;
      return card;
    },
  };
  const observers = [];
  class Observer {
    constructor(callback, options) { this.callback = callback; this.options = options; observers.push(this); }
    disconnect() { this.disconnected = true; }
    observe(target) { this.target = target; }
  }
  if (observersEnabled) window.IntersectionObserver = Observer;
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
  for (const gallery of galleries) {
    const cases = vm.runInContext('galleryCases["' + gallery.group + '"]', context);
    context.initAnimationGallery(gallery.root, cases);
    gallery.caseCount = cases.length;
    gallery.observers = observers.filter((observer) => observer.target === gallery.frame);
    gallery.alive = () => created.filter((viewer) => !viewer.disposed && gallery.track.children.some((card) => card.querySelector() === viewer.root));
  }
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
  return { ...galleries[0], galleries, context, window, document, reduced, created, observers, advance,
    resize(count) { visibleCards = count; window.events.resize(); },
  };
}

test("gallery creates labeled split cards from its own dataset", () => {
  const h = galleryHarness();
  const cases = vm.runInContext('galleryCases["smpl-h"]', h.context);
  assert.equal(h.track.children.length, h.caseCount);
  h.track.children.forEach((card, index) => {
    const root = card.querySelector("[data-viewer]");
    assert.equal(root.dataset.beforeModel, cases[index].input);
    assert.equal(root.dataset.afterModel, cases[index].ours);
    assert.ok(card.innerHTML.includes(`Motion Case ${String(index + 1).padStart(2, "0")}`));
    assert.doesNotMatch(card.innerHTML, /\d{6}_135/);
  });
  assert.equal(h.created.length, 0, "DOM shells do not eagerly initialize all viewers");
});

test("gallery rotates the original nodes one step, wraps both ways and resizes without skipping cases", () => {
  const h = galleryHarness();
  const nodes = [...h.track.children];
  assert.equal(h.count.textContent, `01–03 / ${h.caseCount}`);
  assert.notEqual(h.previous.disabled, true);
  h.step(-1);
  assert.equal(h.count.textContent, `${h.caseCount}–02 / ${h.caseCount}`);
  assert.equal(h.track.firstElementChild, nodes[h.caseCount - 1]);
  h.step();
  assert.equal(h.count.textContent, `01–03 / ${h.caseCount}`);
  h.step();
  h.resize(2);
  assert.equal(h.count.textContent, `02–03 / ${h.caseCount}`);
  h.resize(1);
  assert.equal(h.count.textContent, `02–02 / ${h.caseCount}`);
  for (let i = 0; i < h.caseCount - 2; i++) h.step();
  assert.equal(h.count.textContent, `${h.caseCount}–${h.caseCount} / ${h.caseCount}`);
  h.step();
  assert.equal(h.count.textContent, `01–01 / ${h.caseCount}`);
  assert.notEqual(h.next.disabled, true);
  assert.deepEqual(h.track.children, nodes, "a full cycle reuses the same nodes in original order");
  assert.equal(h.track.style.transform, "translateX(0px)");
});

test("transition guard prevents duplicate rotations and both directions settle cleanly", () => {
  const h = galleryHarness();
  h.observers[0].callback([{ isIntersecting: true }]);
  h.next.events.click();
  assert.equal(h.track.style.transform, "translateX(-214px)");
  h.next.events.click();
  h.previous.events.click();
  h.finish();
  h.finish();
  assert.equal(h.count.textContent, `02–04 / ${h.caseCount}`);
  assert.equal(h.track.children.length, h.caseCount);
  h.previous.events.click();
  assert.equal(h.track.firstElementChild.dataset.caseIndex, "0");
  h.finish();
  assert.equal(h.count.textContent, `01–03 / ${h.caseCount}`);
  h.next.events.click();
  h.advance(1100);
  assert.equal(h.count.textContent, `02–04 / ${h.caseCount}`, "fallback handles a missing transitionend");
});

test("gallery advances after six idle seconds, resets on interaction and pauses while dragging", () => {
  const h = galleryHarness();
  h.observers[0].callback([{ isIntersecting: true }]);
  h.advance(5999);
  assert.equal(h.count.textContent, `01–03 / ${h.caseCount}`);
  h.advance(1);
  h.finish();
  assert.equal(h.count.textContent, `02–04 / ${h.caseCount}`);
  h.advance(5000);
  h.frame.events.wheel();
  h.advance(5999);
  assert.equal(h.count.textContent, `02–04 / ${h.caseCount}`);
  h.frame.events.pointerdown({ pointerId: 7 });
  h.advance(20000);
  assert.equal(h.count.textContent, `02–04 / ${h.caseCount}`);
  h.window.events.pointerup({ pointerId: 7 });
  h.advance(6000);
  h.finish();
  assert.equal(h.count.textContent, `03–05 / ${h.caseCount}`);
});

test("autoplay always advances forward through repeated desktop, tablet and mobile wraps", () => {
  for (const visible of [3, 2, 1]) {
    const h = galleryHarness();
    h.resize(visible);
    h.observers[0].callback([{ isIntersecting: true }]);
    const nodes = new Set(h.track.children);
    for (let step = 1; step <= h.caseCount * 2 + 2; step++) {
      h.advance(6000);
      h.finish();
      assert.equal(Number(h.track.firstElementChild.dataset.caseIndex), step % h.caseCount);
      assert.equal(h.track.children.length, h.caseCount);
      assert.ok(h.track.children.every((card) => nodes.has(card)));
      assert.ok(h.created.filter((viewer) => !viewer.disposed).length <= visible + 2);
    }
  }
});

test("offscreen, hidden and reduced-motion states pause automatic but preserve circular manual navigation", () => {
  const h = galleryHarness();
  h.advance(20000);
  assert.equal(h.count.textContent, `01–03 / ${h.caseCount}`);
  h.observers[0].callback([{ isIntersecting: true }]);
  h.document.hidden = true;
  h.document.events.visibilitychange();
  h.advance(20000);
  assert.equal(h.count.textContent, `01–03 / ${h.caseCount}`);
  h.document.hidden = false;
  h.document.events.visibilitychange();
  h.reduced.matches = true;
  h.reduced.events.change();
  h.advance(20000);
  h.previous.events.click();
  assert.equal(h.count.textContent, `${h.caseCount}–02 / ${h.caseCount}`);
  assert.equal(h.track.style.transform, "translateX(0px)", "reduced-motion manual steps finish without animation");
  h.next.events.click();
  assert.equal(h.count.textContent, `01–03 / ${h.caseCount}`);
  h.reduced.matches = false;
  h.reduced.events.change();
  h.advance(6000);
  h.finish();
  assert.equal(h.count.textContent, `02–04 / ${h.caseCount}`);
  h.observers[0].callback([{ isIntersecting: false }]);
  h.advance(20000);
  assert.equal(h.count.textContent, `02–04 / ${h.caseCount}`);
});

test("bounded viewer ownership follows stable case identity across wraparound", () => {
  const h = galleryHarness();
  h.observers[0].callback([{ isIntersecting: true }]);
  assert.deepEqual(h.created.map((viewer) => viewer.index), [0, 1, 2, 3, h.caseCount - 1]);
  const original = h.created[0];
  const preceding = h.created[4];
  vm.runInContext("activeViewers[0].update()", h.context);
  assert.deepEqual(h.created.map((viewer) => viewer.updates), [1, 1, 1, 0, 0]);
  h.step(-1);
  assert.equal(preceding.disposed, false, "previous neighbor remains initialized when it becomes visible");
  h.step();
  assert.equal(original.disposed, false);
  for (let i = 0; i < h.caseCount * 2; i++) {
    h.step();
    const alive = h.created.filter((viewer) => !viewer.disposed);
    assert.ok(alive.length <= 5);
    assert.equal(new Set(alive.map((viewer) => viewer.index)).size, alive.length);
    alive.forEach((viewer) => {
      const card = h.track.children.find((item) => Number(item.dataset.caseIndex) === viewer.index);
      assert.equal(viewer.root, card.querySelector("[data-viewer]"));
    });
  }
  assert.ok(h.created.filter((viewer) => viewer.index === 0).length > 1);
  h.resize(1);
  assert.ok(h.created.filter((viewer) => !viewer.disposed).length <= 3);
  const updates = h.created.map((viewer) => viewer.updates);
  h.observers[0].callback([{ isIntersecting: false }]);
  vm.runInContext("activeViewers[0].update()", h.context);
  assert.deepEqual(h.created.map((viewer) => viewer.updates), updates);
});

test("dual galleries isolate cards, preload, timers, visibility and viewer disposal", () => {
  const h = galleryHarness({ groups: ["smpl-h", "non-smpl"] });
  const [a, b] = h.galleries;
  for (const gallery of h.galleries) {
    const cases = vm.runInContext(`galleryCases["${gallery.group}"]`, h.context);
    assert.equal(gallery.track.children.length, cases.length);
    gallery.track.children.forEach((card, index) => {
      assert.equal(card.querySelector().dataset.beforeModel, cases[index].input);
      assert.equal(card.querySelector().dataset.afterModel, cases[index].ours);
      assert.ok(card.innerHTML.includes(`Motion Case ${String(index + 1).padStart(2, "0")}`));
      assert.doesNotMatch(card.innerHTML, /motionfix_|Anaconda|tomcat/);
    });
    assert.equal(gallery.observers[1].options.rootMargin, "1000px 0px");
  }
  a.observers[1].callback([{ isIntersecting: true }]);
  assert.equal(a.alive().length, 5);
  assert.equal(b.alive().length, 0, "one preload does not initialize the other gallery");
  b.observers[1].callback([{ isIntersecting: true }]);
  assert.equal(b.alive().length, 5);
  for (const gallery of h.galleries) gallery.observers[0].callback([{ isIntersecting: true }]);
  h.advance(5000);
  a.frame.events.wheel();
  h.advance(1000);
  b.finish();
  assert.equal(a.track.firstElementChild.dataset.caseIndex, "0");
  assert.equal(b.track.firstElementChild.dataset.caseIndex, "1", "interaction in A does not reset B's idle timer");
  h.advance(5000);
  a.finish();
  assert.equal(a.track.firstElementChild.dataset.caseIndex, "1");
  assert.equal(b.track.firstElementChild.dataset.caseIndex, "1");
  a.observers[0].callback([{ isIntersecting: false }]);
  const aNodes = [...a.track.children];
  const aViewers = a.alive();
  const updates = aViewers.map((viewer) => viewer.updates);
  vm.runInContext("activeViewers.forEach((viewer) => viewer.update())", h.context);
  assert.deepEqual(aViewers.map((viewer) => viewer.updates), updates);
  assert.ok(b.alive().some((viewer) => viewer.updates > 0));
  h.advance(1000);
  b.finish();
  assert.deepEqual(a.track.children, aNodes);
  for (let i = 0; i < b.caseCount * 2; i++) {
    b.step();
    assert.ok(b.alive().length <= 5);
    assert.deepEqual(a.alive(), aViewers, "B cannot dispose A's viewers with matching numeric IDs");
  }
  const bNodes = [...b.track.children];
  for (let i = 0; i < a.caseCount * 2; i++) {
    a.step(-1);
    assert.ok(a.alive().length <= 5);
    assert.deepEqual(b.track.children, bNodes);
  }
  h.reduced.matches = true;
  h.reduced.events.change();
  a.observers[0].callback([{ isIntersecting: true }]);
  const firstIds = h.galleries.map((gallery) => gallery.track.firstElementChild.dataset.caseIndex);
  h.advance(20000);
  assert.deepEqual(h.galleries.map((gallery) => gallery.track.firstElementChild.dataset.caseIndex), firstIds);
  for (const gallery of h.galleries) {
    gallery.step();
    assert.equal(Number(gallery.track.firstElementChild.dataset.caseIndex), (Number(firstIds[h.galleries.indexOf(gallery)]) + 1) % gallery.caseCount);
  }
});

function splitHarness() {
  const requests = [];
  const disposed = [];
  const bounded = [];
  const normalized = [];
  const bounds = { getSize: () => ({ x: 1, y: 2, z: 1 }), expandByScalar(margin) { this.margin = margin; } };
  const context = vm.createContext({
    window: {}, document: {},
    THREE: {
      Vector3: class {},
      GLTFLoader: class { loadAsync(path) { return new Promise((resolve, reject) => requests.push({ path, resolve, reject })); } },
      AnimationMixer: class {
        clipAction() { return { play() {} }; }
        setTime(time) { this.time = time; }
      },
    },
  });
  vm.runInContext(readFileSync(join(__dirname, "../script.js"), "utf8"), context);
  context.disposeModel = (scene) => disposed.push(scene.id);
  context.getSequenceBox = (scene) => { bounded.push(scene.id); return bounds; };
  context.normalizeModel = (scene, box) => normalized.push({ id: scene.id, box });
  context.applyModelMaterial = () => {};
  const roots = [0, 1].map(() => ({ children: [], add(scene) { this.children.push(scene); } }));
  const mixers = [];
  const clock = { samples: 0, getElapsedTime() { this.samples++; return 1.25; } };
  let evicted = false;
  const result = context.loadSplitModels(["input.glb", "ours.glb"], roots, mixers, clock, () => evicted);
  const resolve = (request) => request.resolve({ scene: { id: request.path }, animations: [{ duration: 2 }] });
  return { requests, disposed, bounded, normalized, bounds, roots, mixers, clock, result, resolve, evict() { evicted = true; } };
}

test("split pair computes Input bounds once and shares its 10% margin, transform and clock", async () => {
  const h = splitHarness();
  h.resolve(h.requests[0]);
  await new Promise(setImmediate);
  assert.ok(h.roots.every((root) => root.children.length === 0), "never attach a partial split");
  h.resolve(h.requests[1]);
  assert.equal(await h.result, true);
  assert.deepEqual(h.bounded, ["input.glb"]);
  assert.equal(h.bounds.margin, 0.2);
  assert.equal(h.normalized.length, 2);
  assert.ok(h.normalized.every((item) => item.box === h.bounds));
  assert.deepEqual(h.roots.map((root) => root.children[0].id), ["input.glb", "ours.glb"]);
  assert.equal(h.clock.samples, 1);
  assert.deepEqual(h.mixers.map((mixer) => mixer.time), [1.25, 1.25]);
});

test("either split-file failure disposes its partner and attaches neither scene", async () => {
  for (const failed of [0, 1]) {
    const h = splitHarness();
    h.requests[failed].reject(new Error("missing GLB"));
    h.resolve(h.requests[1 - failed]);
    assert.equal(await h.result, false);
    assert.deepEqual(h.disposed, [h.requests[1 - failed].path]);
    assert.ok(h.roots.every((root) => root.children.length === 0));
    assert.equal(h.bounded.length, 0);
  }
});

test("a split pair resolving after gallery eviction disposes both scenes before preparation", async () => {
  const h = splitHarness();
  h.resolve(h.requests[0]);
  h.evict();
  h.resolve(h.requests[1]);
  assert.equal(await h.result, false);
  assert.deepEqual(h.disposed, ["input.glb", "ours.glb"]);
  assert.equal(h.bounded.length, 0);
  assert.ok(h.roots.every((root) => root.children.length === 0));
});

test("preloading creates a bounded window without rendering or auto-advancing offscreen", () => {
  const h = galleryHarness();
  assert.equal(h.observers[1].options.rootMargin, "1000px 0px");
  h.observers[1].callback([{ isIntersecting: true }]);
  assert.equal(h.created.length, 5);
  assert.ok(h.observers[1].disconnected);
  assert.equal(vm.runInContext("activeViewers[0].visible", h.context), false);
  vm.runInContext("activeViewers[0].update()", h.context);
  assert.ok(h.created.every((viewer) => viewer.updates === 0));
  h.advance(20000);
  assert.equal(h.count.textContent, `01–03 / ${h.caseCount}`);
  h.observers[0].callback([{ isIntersecting: true }]);
  assert.equal(h.created.length, 5, "true visibility reuses preloaded viewers");
  vm.runInContext("activeViewers[0].update()", h.context);
  assert.deepEqual(h.created.map((viewer) => viewer.updates), [1, 1, 1, 0, 0]);
  h.advance(6000);
  h.finish();
  assert.equal(h.count.textContent, `02–04 / ${h.caseCount}`);
});

test("browsers without observers initialize one bounded cyclic window immediately", () => {
  const h = galleryHarness({ observersEnabled: false, reducedMotion: true });
  assert.equal(h.created.length, 5);
  h.previous.events.click();
  assert.equal(h.count.textContent, `${h.caseCount}–02 / ${h.caseCount}`);
  assert.equal(h.created.filter((viewer) => !viewer.disposed).length, 5);
});
