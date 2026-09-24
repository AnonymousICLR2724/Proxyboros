// Add one entry per case; empty paths remain explicitly marked as unavailable.
const comparisonCases = {
  "smpl-h": [
    {
      title: "Motion sequence 001849_135",
      input: "assets/models/SMPLH-comparison/motionfix_001849_135/input.glb",
      isir: "assets/models/SMPLH-comparison/motionfix_001849_135/isir.glb",
      meshUtg: "assets/models/SMPLH-comparison/motionfix_001849_135/mesh-utg.glb",
      poseShield: "assets/models/SMPLH-comparison/motionfix_001849_135/poseshield.glb",
      ours: "assets/models/SMPLH-comparison/motionfix_001849_135/ours.glb",
    },
    {
      title: "Motion sequence 001850_135",
      input: "assets/models/SMPLH-comparison/motionfix_001850_135/input.glb",
      isir: "assets/models/SMPLH-comparison/motionfix_001850_135/isir.glb",
      meshUtg: "assets/models/SMPLH-comparison/motionfix_001850_135/mesh-utg.glb",
      poseShield: "assets/models/SMPLH-comparison/motionfix_001850_135/poseshield.glb",
      ours: "assets/models/SMPLH-comparison/motionfix_001850_135/ours.glb",
    },
    {
      title: "Motion sequence 004429_135",
      input: "assets/models/SMPLH-comparison/motionfix_004429_135/input.glb",
      isir: "assets/models/SMPLH-comparison/motionfix_004429_135/isir.glb",
      meshUtg: "assets/models/SMPLH-comparison/motionfix_004429_135/mesh-utg.glb",
      poseShield: "assets/models/SMPLH-comparison/motionfix_004429_135/poseshield.glb",
      ours: "assets/models/SMPLH-comparison/motionfix_004429_135/ours.glb",
    },
    {
      title: "Motion sequence 004430_135",
      input: "assets/models/SMPLH-comparison/motionfix_004430_135/input.glb",
      isir: "assets/models/SMPLH-comparison/motionfix_004430_135/isir.glb",
      meshUtg: "assets/models/SMPLH-comparison/motionfix_004430_135/mesh-utg.glb",
      poseShield: "assets/models/SMPLH-comparison/motionfix_004430_135/poseshield.glb",
      ours: "assets/models/SMPLH-comparison/motionfix_004430_135/ours.glb",
    },
    {
      title: "Motion sequence 004436_135",
      input: "assets/models/SMPLH-comparison/motionfix_004436_135/input.glb",
      isir: "assets/models/SMPLH-comparison/motionfix_004436_135/isir.glb",
      meshUtg: "assets/models/SMPLH-comparison/motionfix_004436_135/mesh-utg.glb",
      poseShield: "assets/models/SMPLH-comparison/motionfix_004436_135/poseshield.glb",
      ours: "assets/models/SMPLH-comparison/motionfix_004436_135/ours.glb",
    },
    {
      title: "Motion sequence 004448_135",
      input: "assets/models/SMPLH-comparison/motionfix_004448_135/input.glb",
      isir: "assets/models/SMPLH-comparison/motionfix_004448_135/isir.glb",
      meshUtg: "assets/models/SMPLH-comparison/motionfix_004448_135/mesh-utg.glb",
      poseShield: "assets/models/SMPLH-comparison/motionfix_004448_135/poseshield.glb",
      ours: "assets/models/SMPLH-comparison/motionfix_004448_135/ours.glb",
    },
    {
      title: "Motion sequence 004466_135",
      input: "assets/models/SMPLH-comparison/motionfix_004466_135/input.glb",
      isir: "assets/models/SMPLH-comparison/motionfix_004466_135/isir.glb",
      meshUtg: "assets/models/SMPLH-comparison/motionfix_004466_135/mesh-utg.glb",
      poseShield: "assets/models/SMPLH-comparison/motionfix_004466_135/poseshield.glb",
      ours: "assets/models/SMPLH-comparison/motionfix_004466_135/ours.glb",
    },
    {
      title: "Motion sequence 004476_135",
      input: "assets/models/SMPLH-comparison/motionfix_004476_135/input.glb",
      isir: "assets/models/SMPLH-comparison/motionfix_004476_135/isir.glb",
      meshUtg: "assets/models/SMPLH-comparison/motionfix_004476_135/mesh-utg.glb",
      poseShield: "assets/models/SMPLH-comparison/motionfix_004476_135/poseshield.glb",
      ours: "assets/models/SMPLH-comparison/motionfix_004476_135/ours.glb",
    },
    {
      title: "Motion sequence 005315_135",
      input: "assets/models/SMPLH-comparison/motionfix_005315_135/input.glb",
      isir: "assets/models/SMPLH-comparison/motionfix_005315_135/isir.glb",
      meshUtg: "assets/models/SMPLH-comparison/motionfix_005315_135/mesh-utg.glb",
      poseShield: "assets/models/SMPLH-comparison/motionfix_005315_135/poseshield.glb",
      ours: "assets/models/SMPLH-comparison/motionfix_005315_135/ours.glb",
    },
    {
      title: "Motion sequence 005373_135",
      input: "assets/models/SMPLH-comparison/motionfix_005373_135/input.glb",
      isir: "assets/models/SMPLH-comparison/motionfix_005373_135/isir.glb",
      meshUtg: "assets/models/SMPLH-comparison/motionfix_005373_135/mesh-utg.glb",
      poseShield: "assets/models/SMPLH-comparison/motionfix_005373_135/poseshield.glb",
      ours: "assets/models/SMPLH-comparison/motionfix_005373_135/ours.glb",
    },
    {
      title: "Motion sequence 005398_135",
      input: "assets/models/SMPLH-comparison/motionfix_005398_135/input.glb",
      isir: "assets/models/SMPLH-comparison/motionfix_005398_135/isir.glb",
      meshUtg: "assets/models/SMPLH-comparison/motionfix_005398_135/mesh-utg.glb",
      poseShield: "assets/models/SMPLH-comparison/motionfix_005398_135/poseshield.glb",
      ours: "assets/models/SMPLH-comparison/motionfix_005398_135/ours.glb",
    },
    {
      title: "Motion sequence 005403_135",
      input: "assets/models/SMPLH-comparison/motionfix_005403_135/input.glb",
      isir: "assets/models/SMPLH-comparison/motionfix_005403_135/isir.glb",
      meshUtg: "assets/models/SMPLH-comparison/motionfix_005403_135/mesh-utg.glb",
      poseShield: "assets/models/SMPLH-comparison/motionfix_005403_135/poseshield.glb",
      ours: "assets/models/SMPLH-comparison/motionfix_005403_135/ours.glb",
    },
    {
      title: "Motion sequence 005424_135",
      input: "assets/models/SMPLH-comparison/motionfix_005424_135/input.glb",
      isir: "assets/models/SMPLH-comparison/motionfix_005424_135/isir.glb",
      meshUtg: "assets/models/SMPLH-comparison/motionfix_005424_135/mesh-utg.glb",
      poseShield: "assets/models/SMPLH-comparison/motionfix_005424_135/poseshield.glb",
      ours: "assets/models/SMPLH-comparison/motionfix_005424_135/ours.glb",
    },
    {
      title: "Motion sequence 005471_135",
      input: "assets/models/SMPLH-comparison/motionfix_005471_135/input.glb",
      isir: "assets/models/SMPLH-comparison/motionfix_005471_135/isir.glb",
      meshUtg: "assets/models/SMPLH-comparison/motionfix_005471_135/mesh-utg.glb",
      poseShield: "assets/models/SMPLH-comparison/motionfix_005471_135/poseshield.glb",
      ours: "assets/models/SMPLH-comparison/motionfix_005471_135/ours.glb",
    },
    {
      title: "Motion sequence 005642_135",
      input: "assets/models/SMPLH-comparison/motionfix_005642_135/input.glb",
      isir: "assets/models/SMPLH-comparison/motionfix_005642_135/isir.glb",
      meshUtg: "assets/models/SMPLH-comparison/motionfix_005642_135/mesh-utg.glb",
      poseShield: "assets/models/SMPLH-comparison/motionfix_005642_135/poseshield.glb",
      ours: "assets/models/SMPLH-comparison/motionfix_005642_135/ours.glb",
    },
  ],
  "non-smpl": [
    { title: "non-SMPL motion · GLBs to be added", input: "", isir: "", meshUtg: "", ours: "" },
    { title: "non-SMPL motion · GLBs to be added", input: "", isir: "", meshUtg: "", ours: "" },
    { title: "non-SMPL motion · GLBs to be added", input: "", isir: "", meshUtg: "", ours: "" },
  ],
};

const activeViewers = [];

if (window.THREE) {
  initComparisonCarousel();
  initAnimationGallery();

  const tick = () => {
    if (!document.hidden) {
      activeViewers.forEach((viewer) => { if (viewer.visible) viewer.update(); });
    }
    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

function observeViewerVisibility(container, viewer) {
  viewer.visible = !window.IntersectionObserver;
  if (!window.IntersectionObserver) return;
  const observer = new IntersectionObserver(([entry]) => {
    viewer.visible = entry.isIntersecting;
  });
  observer.observe(container);
}

function initAnimationGallery() {
  const frame = document.querySelector(".film-gallery");
  if (!frame) return;
  const track = frame.querySelector(".gallery-track");
  comparisonCases["smpl-h"].forEach((entry, index) => {
    const number = String(index + 1).padStart(2, "0");
    const card = document.createElement("article");
    card.className = "model-card";
    card.dataset.caseIndex = String(index);
    card.innerHTML = `
      <div class="model-viewer" data-viewer style="--position: 50%;">
        <canvas aria-label="Interactive Original / Repaired Motion Case ${number}"></canvas>
        <div class="compare-label before-label">Original</div>
        <div class="compare-label after-label">Repaired</div>
        <div class="compare-handle model-compare-handle" role="slider" tabindex="0"
          aria-label="Original and repaired split for Motion Case ${number}"
          aria-valuemin="2" aria-valuemax="98" aria-valuenow="50"></div>
        <p class="model-status">Loading…</p>
      </div>
      <div class="card-copy"><h3>Motion Case ${number}</h3></div>`;
    const viewerRoot = card.querySelector("[data-viewer]");
    viewerRoot.dataset.beforeModel = entry.input;
    viewerRoot.dataset.afterModel = entry.ours;
    track.append(card);
  });

  const previous = frame.querySelector("[data-gallery-prev]");
  const next = frame.querySelector("[data-gallery-next]");
  const count = document.querySelector(".gallery-count");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const pointers = new Set();
  const viewers = new Map();
  let preloadActive = !window.IntersectionObserver;
  let visibleCount = 3;
  let renderedIds = new Set();
  let isTransitioning = false;
  let transitionDirection = 0;
  let transitionTimer;
  let idleTimer;
  const gallery = {
    visible: !window.IntersectionObserver,
    update() {
      if (!gallery.visible || document.hidden) return;
      viewers.forEach((viewer, id) => { if (renderedIds.has(id)) viewer.update(); });
    },
  };
  activeViewers.push(gallery);

  function renderWindow() {
    const cards = Array.from(track.children);
    visibleCount = Number(getComputedStyle(frame).getPropertyValue("--visible-cards")) || 3;
    const caseId = (card) => Number(card.dataset.caseIndex);
    const label = (card) => String(caseId(card) + 1).padStart(2, "0");
    count.textContent = `${label(cards[0])}–${label(cards[visibleCount - 1])} / ${cards.length}`;
    renderedIds = new Set(cards.slice(0, visibleCount + (isTransitioning ? 1 : 0)).map(caseId));
    cards.forEach((card, i) => {
      card.inert = i >= visibleCount;
      card.setAttribute("aria-hidden", String(card.inert));
    });
    if (!preloadActive) return;
    // The last node is the previous neighbor, including across 01 <-> 15.
    const keptCards = [...cards.slice(0, visibleCount + 1), cards[cards.length - 1]];
    const keptIds = new Set(keptCards.map(caseId));
    viewers.forEach((viewer, id) => {
      if (keptIds.has(id)) return;
      viewer.dispose();
      viewers.delete(id);
    });
    keptCards.forEach((card) => {
      const id = caseId(card);
      if (!viewers.has(id)) viewers.set(id, createModelComparisonViewer(card.querySelector("[data-viewer]"), id));
    });
  }

  function restartIdle() {
    clearTimeout(idleTimer);
    if (!gallery.visible || document.hidden || reducedMotion.matches || pointers.size || isTransitioning) return;
    idleTimer = setTimeout(() => move(1), 6000);
  }

  function finishTransition() {
    if (!isTransitioning) return;
    clearTimeout(transitionTimer);
    if (transitionDirection > 0) track.append(track.firstElementChild);
    track.style.transition = "none";
    track.style.transform = "translateX(0px)";
    // Flush the compensated node rotation before restoring animated transforms.
    void track.offsetWidth;
    track.style.transition = "";
    isTransitioning = false;
    renderWindow();
    restartIdle();
  }

  function move(direction) {
    if (isTransitioning) return;
    clearTimeout(idleTimer);
    isTransitioning = true;
    transitionDirection = direction;
    const step = track.firstElementChild.getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap);
    if (direction < 0) {
      track.style.transition = "none";
      track.prepend(track.lastElementChild);
      track.style.transform = `translateX(${-step}px)`;
      void track.offsetWidth;
    }
    renderWindow();
    if (reducedMotion.matches || !gallery.visible || document.hidden) {
      finishTransition();
      return;
    }
    track.style.transition = "";
    track.style.transform = direction > 0 ? `translateX(${-step}px)` : "translateX(0px)";
    // Also finish if the browser suppresses transitionend (e.g. during tab changes).
    transitionTimer = setTimeout(finishTransition, 1100);
  }

  track.addEventListener("transitionend", (event) => {
    if (event.target === track && event.propertyName === "transform") finishTransition();
  });
  previous.addEventListener("click", () => move(-1));
  next.addEventListener("click", () => move(1));
  frame.addEventListener("pointerdown", (event) => { pointers.add(event.pointerId); restartIdle(); });
  const release = (event) => {
    if (!pointers.delete(event.pointerId)) return;
    restartIdle();
  };
  window.addEventListener("pointerup", release);
  window.addEventListener("pointercancel", release);
  ["wheel", "keydown", "focusin"].forEach((event) => frame.addEventListener(event, restartIdle));
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) { pointers.clear(); finishTransition(); }
    restartIdle();
  });
  reducedMotion.addEventListener("change", () => { finishTransition(); restartIdle(); });
  window.addEventListener("resize", () => { finishTransition(); renderWindow(); restartIdle(); });
  if (window.IntersectionObserver) {
    new IntersectionObserver(([entry]) => {
      gallery.visible = entry.isIntersecting;
      if (gallery.visible) preloadActive = true;
      else finishTransition();
      renderWindow();
      restartIdle();
    }).observe(frame);
    const preloadObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      preloadActive = true;
      renderWindow();
      preloadObserver.disconnect();
    }, { rootMargin: "1000px 0px" });
    preloadObserver.observe(frame);
  }
  renderWindow();
  restartIdle();
}

function initComparisonCarousel() {
  const carousel = document.querySelector(".case-carousel");
  if (!carousel) return;

  const progress = carousel.querySelector(".case-progress");
  const caption = carousel.querySelector(".case-caption");
  const count = carousel.querySelector(".case-count");
  const caseStatus = carousel.querySelector(".case-status");
  const grid = carousel.querySelector(".method-grid");
  const scroll = carousel.querySelector(".method-scroll");
  const groupButtons = document.querySelectorAll("[data-case-group]");
  const modeButtons = carousel.querySelectorAll("[data-display-mode]");
  const clock = new THREE.Clock();
  const loader = new THREE.GLTFLoader();
  const columns = Array.from(carousel.querySelectorAll("[data-method]"));
  const viewers = columns.map((column, index) => createModelComparisonViewer(column, index, clock));
  const comparison = {
    update() {
      const elapsed = clock.getElapsedTime();
      viewers.forEach((viewer) => viewer.update(elapsed));
    },
  };
  observeViewerVisibility(carousel, comparison);
  activeViewers.push(comparison);
  let currentIndex = 0;
  let currentGroup = "smpl-h";
  let loadVersion = 0;
  let syncingCamera = false;
  let displayMode = "normal";

  viewers.forEach((source) => {
    source.controls.addEventListener("change", () => {
      if (syncingCamera) return;
      syncingCamera = true;
      viewers.forEach((target) => {
        if (target === source) return;
        target.camera.position.copy(source.camera.position);
        target.camera.quaternion.copy(source.camera.quaternion);
        target.controls.target.copy(source.controls.target);
        target.controls.update();
      });
      syncingCamera = false;
    });
  });

  async function showCase(index, direction = 1) {
    const cases = comparisonCases[currentGroup];
    currentIndex = (index + cases.length) % cases.length;
    const entry = cases[currentIndex];
    const unavailable = columns.map((column) => currentGroup === "non-smpl" && column.dataset.method === "poseShield");
    const paths = columns.map((column, i) => unavailable[i] ? "" : entry[column.dataset.method]);
    const version = ++loadVersion;
    const number = String(currentIndex + 1).padStart(2, "0");
    progress.max = cases.length - 1;
    progress.value = currentIndex;
    progress.setAttribute("aria-valuetext", `Case ${currentIndex + 1} of ${cases.length}`);
    count.textContent = `${number} / ${String(cases.length).padStart(2, "0")}`;
    caption.textContent = `Motion Case ${number}`;
    groupButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.caseGroup === currentGroup)));
    columns.forEach((column, i) => {
      viewers[i].setModel(null);
      const status = column.querySelector(".model-status");
      status.hidden = false;
      status.textContent = unavailable[i] ? "Unavailable" : paths[i] ? "Loading…" : "GLB to be added";
    });
    scroll.getAnimations().forEach((animation) => animation.cancel());
    grid.setAttribute("aria-busy", "true");
    caseStatus.textContent = `Loading Motion Case ${number}…`;

    const results = await Promise.all(paths.map(async (path) => {
      if (!path) return null;
      try {
        return await loader.loadAsync(path);
      } catch {
        return null;
      }
    }));
    // An earlier request must never replace the currently selected case.
    if (version !== loadVersion) {
      results.forEach((gltf) => { if (gltf) disposeModel(gltf.scene); });
      return;
    }

    try {
      if (results.some((gltf, i) => paths[i] && !gltf)) throw new Error("Missing GLB");
      const input = results[columns.findIndex((column) => column.dataset.method === "input")];
      const bounds = input ? getSequenceBox(input.scene, input.animations) : new THREE.Box3();
      const size = bounds.getSize(new THREE.Vector3());
      // Shared framing margin also accommodates baseline motion outside Input.
      bounds.expandByScalar(Math.max(size.x, size.y, size.z) * 0.1);
      results.forEach((gltf, i) => {
        if (!gltf) return;
        normalizeModel(gltf.scene, bounds);
        applyModelMaterial(gltf.scene, columns[i].dataset.method === "input" ? "before" : "after", displayMode);
      });
    } catch {
      results.forEach((gltf) => { if (gltf) disposeModel(gltf.scene); });
      caseStatus.textContent = `Unable to load Motion Case ${number}. Select a case to retry.`;
      columns.forEach((column, i) => {
        if (paths[i]) column.querySelector(".model-status").textContent = "Unable to load GLB";
      });
      grid.setAttribute("aria-busy", "false");
      return;
    }

    // Prepare every scene before replacing any of the displayed methods.
    results.forEach((gltf, i) => {
      viewers[i].setModel(gltf);
      const status = columns[i].querySelector(".model-status");
      status.hidden = Boolean(gltf);
      status.textContent = unavailable[i] ? "Unavailable" : "GLB to be added";
    });
    clock.start();
    grid.setAttribute("aria-busy", "false");
    caseStatus.textContent = "";
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Animate the scroll viewport inside its clip, not the scrollable content.
      scroll.getAnimations().forEach((animation) => animation.cancel());
      scroll.animate(
        [{ opacity: 0.65, transform: `translateX(${direction * 24}px)` }, { opacity: 1, transform: "translateX(0)" }],
        { duration: 260, easing: "ease-out" },
      );
    }
  }

  modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      displayMode = button.dataset.displayMode;
      modeButtons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
      viewers.forEach((viewer) => viewer.setMode(displayMode));
    });
  });

  groupButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (currentGroup === button.dataset.caseGroup) return;
      currentGroup = button.dataset.caseGroup;
      scroll.scrollLeft = 0;
      showCase(0);
    });
  });
  carousel.querySelector("[data-case-prev]").addEventListener("click", () => showCase(currentIndex - 1, -1));
  carousel.querySelector("[data-case-next]").addEventListener("click", () => showCase(currentIndex + 1, 1));
  progress.addEventListener("change", () => showCase(Number(progress.value), Number(progress.value) < currentIndex ? -1 : 1));
  showCase(0);
}

function createModelComparisonViewer(container, index, clock = new THREE.Clock()) {
  const canvas = container.querySelector("canvas");
  const handle = container.querySelector(".model-compare-handle");
  const singleModel = container.hasAttribute("data-method");
  if (!canvas) return null;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.LinearToneMapping;
  renderer.toneMappingExposure = 0.78;
  renderer.autoClear = false;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
  camera.position.set(0, 0, 3.7);

  const controls = new THREE.OrbitControls(camera, canvas);
  controls.enableDamping = !singleModel;
  controls.enablePan = false;
  controls.autoRotate = false;
  controls.autoRotateSpeed = 0.55;
  controls.target.set(0, 0, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.24));
  scene.add(new THREE.HemisphereLight(0xffffff, 0xd8e2e6, 0.72));

  const keyLight = new THREE.DirectionalLight(0xffffff, 0.92);
  keyLight.position.set(2.6, 3.4, 3.2);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xeaf7ff, 0.38);
  fillLight.position.set(-3.2, 1.7, 2.4);
  scene.add(fillLight);

  const backLight = new THREE.DirectionalLight(0xffffff, 0.24);
  backLight.position.set(-1.2, 2.4, -3.4);
  scene.add(backLight);

  const beforeRoot = new THREE.Group();
  const afterRoot = new THREE.Group();
  scene.add(beforeRoot, afterRoot);

  const mixers = [];
  const beforePath = (container.dataset.beforeModel || "").trim();
  const afterPath = (container.dataset.afterModel || "").trim();

  let disposed = false;
  const events = new AbortController();
  if (!singleModel) {
    const status = container.querySelector(".model-status");
    status.hidden = false;
    status.textContent = "Loading…";
    loadSplitModels([beforePath, afterPath], [beforeRoot, afterRoot], mixers, clock, () => disposed).then((loaded) => {
      if (disposed) return;
      status.hidden = loaded;
      status.textContent = loaded ? "" : "Unable to load GLB";
    });
  }

  const size = {
    width: 1,
    height: 1,
  };
  let splitPosition = 50;

  const setSplitPosition = (value) => {
    splitPosition = Math.max(2, Math.min(98, value));
    container.style.setProperty("--position", `${splitPosition}%`);

    if (handle) {
      handle.setAttribute("aria-valuenow", String(Math.round(splitPosition)));
    }
  };

  const pointerToSplitPosition = (event) => {
    const rect = container.getBoundingClientRect();
    setSplitPosition(((event.clientX - rect.left) / rect.width) * 100);
  };

  if (handle) {
    const on = (name, handler) => handle.addEventListener(name, handler, { signal: events.signal });
    on("pointerdown", (event) => {
      event.preventDefault();
      controls.enabled = false;
      handle.setPointerCapture(event.pointerId);
      pointerToSplitPosition(event);
    });

    on("pointermove", (event) => {
      if (handle.hasPointerCapture(event.pointerId)) {
        pointerToSplitPosition(event);
      }
    });

    on("pointerup", (event) => {
      controls.enabled = true;
      handle.releasePointerCapture(event.pointerId);
    });

    on("pointercancel", () => {
      controls.enabled = true;
    });

    on("keydown", (event) => {
      const step = event.shiftKey ? 10 : 3;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setSplitPosition(splitPosition - step);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setSplitPosition(splitPosition + step);
      }

      if (event.key === "Home") {
        event.preventDefault();
        setSplitPosition(2);
      }

      if (event.key === "End") {
        event.preventDefault();
        setSplitPosition(98);
      }
    });
  }

  const resize = () => {
    if (disposed) return;
    size.width = container.clientWidth;
    size.height = container.clientHeight;
    renderer.setSize(size.width, size.height, false);
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();
  };

  resize();
  setSplitPosition(50);

  let resizeObserver;
  if (window.ResizeObserver) {
    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
  } else {
    window.addEventListener("resize", resize);
  }

  return {
    camera,
    controls,
    setMode(mode) {
      setModelMaterialMode(afterRoot, mode);
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      events.abort();
      controls.dispose();
      resizeObserver?.disconnect();
      window.removeEventListener("resize", resize);
      mixers.forEach((mixer) => {
        mixer.stopAllAction();
        mixer.uncacheRoot(mixer.getRoot());
      });
      mixers.length = 0;
      disposeModel(scene);
      clearGroup(beforeRoot);
      clearGroup(afterRoot);
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.replaceWith(canvas.cloneNode());
    },
    setModel(gltf) {
      mixers.forEach((mixer) => {
        mixer.stopAllAction();
        mixer.uncacheRoot(mixer.getRoot());
      });
      mixers.length = 0;
      disposeModel(afterRoot);
      clearGroup(afterRoot);
      if (!gltf) {
        renderer.clear();
        return;
      }
      afterRoot.add(gltf.scene);
      if (gltf.animations.length) {
        const mixer = new THREE.AnimationMixer(gltf.scene);
        mixer.duration = Math.max(...gltf.animations.map((clip) => clip.duration));
        gltf.animations.forEach((clip) => mixer.clipAction(clip).play());
        mixers.push(mixer);
      }
    },
    update(elapsed = clock.getElapsedTime()) {
      mixers.forEach((mixer) => {
        const duration = mixer.duration || 0;
        mixer.setTime(duration > 0 ? elapsed % duration : elapsed);
      });
      controls.target.set(0, 0, 0);
      controls.update();
      if (singleModel) {
        renderer.clear();
        renderer.render(scene, camera);
      } else {
        renderSplitView(renderer, scene, camera, beforeRoot, afterRoot, size, splitPosition);
      }
    },
  };
}

function disposeModel(root) {
  const geometries = new Set();
  const materials = new Set();
  const textures = new Set();
  const skeletons = new Set();
  root.traverse((object) => {
    if (object.geometry) geometries.add(object.geometry);
    if (object.skeleton) skeletons.add(object.skeleton);
    const state = object.userData?.displayMaterials;
    [object.material, state?.source, state?.texture, state?.normal].flat().forEach((material) => {
      if (material) materials.add(material);
    });
  });
  materials.forEach((material) => {
    Object.values(material).forEach((value) => { if (value && value.isTexture) textures.add(value); });
    material.dispose();
  });
  textures.forEach((texture) => texture.dispose());
  geometries.forEach((geometry) => geometry.dispose());
  skeletons.forEach((skeleton) => skeleton.dispose());
}

function renderSplitView(renderer, scene, camera, beforeRoot, afterRoot, size, splitPosition) {
  const split = Math.round((size.width * splitPosition) / 100);

  renderer.setScissorTest(false);
  renderer.clear(true, true, true);
  renderer.setViewport(0, 0, size.width, size.height);
  renderer.setScissorTest(true);

  beforeRoot.visible = true;
  afterRoot.visible = false;
  renderer.setScissor(0, 0, split, size.height);
  renderer.render(scene, camera);

  beforeRoot.visible = false;
  afterRoot.visible = true;
  renderer.setScissor(split, 0, size.width - split, size.height);
  renderer.render(scene, camera);

  beforeRoot.visible = true;
  renderer.setScissorTest(false);
}

async function loadSplitModels(paths, roots, mixers, clock, isDisposed = () => false) {
  const loader = new THREE.GLTFLoader();
  const results = await Promise.all(paths.map((path) => loader.loadAsync(path).catch(() => null)));
  if (isDisposed() || results.some((gltf) => !gltf)) {
    results.forEach((gltf) => { if (gltf) disposeModel(gltf.scene); });
    return false;
  }
  const pairMixers = [];
  try {
    const input = results[0];
    const bounds = getSequenceBox(input.scene, input.animations);
    const size = bounds.getSize(new THREE.Vector3());
    bounds.expandByScalar(Math.max(size.x, size.y, size.z) * 0.1);
    results.forEach((gltf, i) => {
      normalizeModel(gltf.scene, bounds);
      applyModelMaterial(gltf.scene, i === 0 ? "before" : "after");
      if (gltf.animations.length) {
        const mixer = new THREE.AnimationMixer(gltf.scene);
        pairMixers.push(mixer);
        mixer.duration = Math.max(...gltf.animations.map((clip) => clip.duration));
        gltf.animations.forEach((clip) => mixer.clipAction(clip).play());
      }
    });
    const elapsed = clock.getElapsedTime();
    pairMixers.forEach((mixer) => mixer.setTime(mixer.duration > 0 ? elapsed % mixer.duration : 0));
    results.forEach((gltf, i) => roots[i].add(gltf.scene));
    mixers.push(...pairMixers);
    return true;
  } catch {
    pairMixers.forEach((mixer) => { mixer.stopAllAction(); mixer.uncacheRoot(mixer.getRoot()); });
    results.forEach((gltf) => disposeModel(gltf.scene));
    return false;
  }
}

function clearGroup(group) {
  while (group.children.length) {
    group.remove(group.children[0]);
  }
}

function applyModelMaterial(model, variant, mode = "texture") {
  model.traverse((object) => {
    if (!object.isMesh) return;
    if (!object.userData.displayMaterials) {
      const source = object.material;
      const prepareTexture = (material) => prepareSkinnedMaterial(materialHasTexture(material) ? material : new THREE.MeshStandardMaterial({
        color: variant === "before" ? 0x65707d : 0x4169E1,
        roughness: 0.94,
        metalness: 0,
        side: THREE.DoubleSide,
      }), object);
      const texture = Array.isArray(source) ? source.map(prepareTexture) : prepareTexture(source);
      object.userData.displayMaterials = { source, texture };
    }
    object.frustumCulled = false;
  });
  setModelMaterialMode(model, mode);
}

function setModelMaterialMode(model, mode) {
  model.traverse((object) => {
    const state = object.userData?.displayMaterials;
    if (!state) return;
    if (mode === "normal" && !state.normal) {
      // r128 supports all 8 position targets only without morph-normal attributes.
      // Flat shading derives the displayed normal from the deformed surface.
      const normal = prepareSkinnedMaterial(new THREE.MeshNormalMaterial({ flatShading: true }), object);
      state.normal = Array.isArray(state.texture) ? state.texture.map(() => normal) : normal;
    }
    object.material = state[mode];
  });
}

function prepareSkinnedMaterial(material, mesh) {
  material.skinning = Boolean(mesh.isSkinnedMesh);
  material.morphTargets = Boolean(mesh.geometry.morphAttributes.position?.length);
  material.morphNormals = false;
  material.side = THREE.DoubleSide;
  material.needsUpdate = true;
  return material;
}

function materialHasTexture(material) {
  if (!material) return false;

  return [
    "map",
    "normalMap",
    "roughnessMap",
    "metalnessMap",
    "aoMap",
    "emissiveMap",
    "alphaMap",
    "bumpMap",
    "displacementMap",
    "lightMap",
  ].some((property) => Boolean(material[property]));
}

function getSequenceBox(model, animations) {
  if (!animations.length) return getAnimatedBox(model);

  const box = new THREE.Box3();
  const mixer = new THREE.AnimationMixer(model);

  animations.forEach((clip) => {
    const action = mixer.clipAction(clip);
    action.setLoop(THREE.LoopOnce, 1);
    action.clampWhenFinished = true;
    action.reset().play();

    getClipSampleTimes(clip).forEach((time) => {
      mixer.setTime(time);
      box.union(getAnimatedBox(model));
    });

    mixer.stopAllAction();
  });

  mixer.uncacheRoot(model);
  return box.isEmpty() ? getAnimatedBox(model) : box;
}

function getClipSampleTimes(clip) {
  const times = new Set([0, clip.duration]);

  clip.tracks.forEach((track) => {
    for (let index = 0; index < track.times.length; index += 1) {
      times.add(track.times[index]);
    }
  });

  return Array.from(times).sort((a, b) => a - b);
}

function getAnimatedBox(group) {
  const box = new THREE.Box3();
  const point = new THREE.Vector3();
  let hasSkinnedMesh = false;

  group.updateWorldMatrix(true, true);
  group.traverse((object) => {
    if (!object.isSkinnedMesh) return;

    const positions = object.geometry.attributes.position;
    if (!positions) return;

    hasSkinnedMesh = true;
    object.skeleton.update();

    for (let index = 0; index < positions.count; index += 1) {
      point.fromBufferAttribute(positions, index);

      if (object.boneTransform) {
        object.boneTransform(index, point);
      } else if (object.applyBoneTransform) {
        object.applyBoneTransform(index, point);
      }

      point.applyMatrix4(object.matrixWorld);
      box.expandByPoint(point);
    }
  });

  return hasSkinnedMesh ? box : new THREE.Box3().setFromObject(group);
}

function normalizeModel(model, sourceBox) {
  const box = sourceBox || new THREE.Box3().setFromObject(model);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const maxAxis = Math.max(size.x, size.y, size.z);
  const scale = maxAxis > 0 ? 2.25 / maxAxis : 1;

  model.scale.setScalar(scale);
  model.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
}
