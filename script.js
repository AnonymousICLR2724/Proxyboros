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

const viewerRoots = document.querySelectorAll("[data-viewer]");
const activeViewers = [];

if (window.THREE) {
  initComparisonCarousel();
  initStandaloneViewers();

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

function initStandaloneViewers() {
  const initialize = () => {
    viewerRoots.forEach((viewerRoot, index) => {
      const viewer = createModelComparisonViewer(viewerRoot, index);
      if (viewer) {
        observeViewerVisibility(viewerRoot, viewer);
        activeViewers.push(viewer);
      }
    });
  };
  const section = document.querySelector("#models");
  if (window.IntersectionObserver && section) {
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      initialize();
    }, { rootMargin: "300px" });
    observer.observe(section);
  } else {
    initialize();
  }
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
  let displayedCase = null;
  let syncingCamera = false;

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
    grid.setAttribute("aria-busy", "true");
    caseStatus.textContent = `Loading ${currentGroup === "smpl-h" ? "SMPL-H" : "non-SMPL"} Case ${number}…`;

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
        applyModelMaterial(gltf.scene, columns[i].dataset.method === "input" ? "before" : "after");
      });
    } catch {
      results.forEach((gltf) => { if (gltf) disposeModel(gltf.scene); });
      caseStatus.textContent = `Unable to load Case ${number}. ${displayedCase ? "Previous case retained. " : ""}Select a case to retry.`;
      if (displayedCase) {
        currentGroup = displayedCase.group;
        currentIndex = displayedCase.index;
        progress.max = comparisonCases[currentGroup].length - 1;
        progress.value = currentIndex;
        progress.setAttribute("aria-valuetext", `Case ${currentIndex + 1} of ${comparisonCases[currentGroup].length}`);
      }
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
    displayedCase = { group: currentGroup, index: currentIndex };
    groupButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.caseGroup === currentGroup)));
    count.textContent = `${number} / ${String(cases.length).padStart(2, "0")}`;
    caption.textContent = `Case ${number} · ${entry.title}`;
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
  if (!singleModel) {
    const beforePlaceholder = createPlaceholderModel(index, "before");
    const afterPlaceholder = createPlaceholderModel(index, "after");
    normalizeModel(beforePlaceholder);
    normalizeModel(afterPlaceholder);
    beforeRoot.add(beforePlaceholder);
    afterRoot.add(afterPlaceholder);
  }
  scene.add(beforeRoot, afterRoot);

  const mixers = [];
  const beforePath = (container.dataset.beforeModel || "").trim();
  const afterPath = (container.dataset.afterModel || "").trim();

  loadModel(beforePath, beforeRoot, mixers, clock, "before");
  loadModel(afterPath, afterRoot, mixers, clock, "after");

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
    handle.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      controls.enabled = false;
      handle.setPointerCapture(event.pointerId);
      pointerToSplitPosition(event);
    });

    handle.addEventListener("pointermove", (event) => {
      if (handle.hasPointerCapture(event.pointerId)) {
        pointerToSplitPosition(event);
      }
    });

    handle.addEventListener("pointerup", (event) => {
      controls.enabled = true;
      handle.releasePointerCapture(event.pointerId);
    });

    handle.addEventListener("pointercancel", () => {
      controls.enabled = true;
    });

    handle.addEventListener("keydown", (event) => {
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
    size.width = container.clientWidth;
    size.height = container.clientHeight;
    renderer.setSize(size.width, size.height, false);
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();
  };

  resize();
  setSplitPosition(50);

  if (window.ResizeObserver) {
    new ResizeObserver(resize).observe(container);
  } else {
    window.addEventListener("resize", resize);
  }

  return {
    camera,
    controls,
    setModel(gltf) {
      mixers.forEach((mixer) => {
        mixer.stopAllAction();
        mixer.uncacheRoot(mixer.getRoot());
      });
      mixers.length = 0;
      disposeModel(afterRoot);
      clearGroup(afterRoot);
      if (!gltf) return;
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
  root.traverse((object) => {
    if (object.geometry) object.geometry.dispose();
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    materials.forEach((material) => {
      if (!material) return;
      Object.values(material).forEach((value) => { if (value && value.isTexture) value.dispose(); });
      material.dispose();
    });
  });
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

function loadModel(modelPath, root, mixers, clock, variant) {
  if (!modelPath || !THREE.GLTFLoader) return;

  const loader = new THREE.GLTFLoader();
  loader.load(
    modelPath,
    (gltf) => {
      clearGroup(root);
      normalizeModel(gltf.scene, getSequenceBox(gltf.scene, gltf.animations));
      applyModelMaterial(gltf.scene, variant);
      root.add(gltf.scene);

      if (gltf.animations.length) {
        const mixer = new THREE.AnimationMixer(gltf.scene);
        mixer.duration = Math.max(...gltf.animations.map((clip) => clip.duration));
        gltf.animations.forEach((clip) => mixer.clipAction(clip).play());
        mixer.setTime(mixer.duration > 0 ? clock.getElapsedTime() % mixer.duration : 0);
        mixers.push(mixer);
      }
    },
    undefined,
    () => {},
  );
}

function createPlaceholderModel(index, variant) {
  const group = new THREE.Group();
  const geometry =
    index % 2 === 0
      ? new THREE.TorusKnotGeometry(0.58, 0.16, 80, 12)
      : new THREE.IcosahedronGeometry(0.82, 2);
  const material = new THREE.MeshStandardMaterial({
    color: variant === "before" ? 0x6f7885 : [0x3978c9, 0x6964cf, 0x986dc5][index % 3],
    roughness: 0.48,
    metalness: 0.06,
  });
  const mesh = new THREE.Mesh(geometry, material);
  const wire = new THREE.LineSegments(
    new THREE.WireframeGeometry(geometry),
    new THREE.LineBasicMaterial({
      color: variant === "before" ? 0xc85d4d : 0xffffff,
      transparent: true,
      opacity: variant === "before" ? 0.46 : 0.24,
    }),
  );

  group.add(mesh, wire);
  return group;
}

function clearGroup(group) {
  while (group.children.length) {
    group.remove(group.children[0]);
  }
}

function applyModelMaterial(model, variant) {
  const fallbackMaterial = new THREE.MeshStandardMaterial({
    color: variant === "before" ? 0x65707d : 0x4169E1,
    roughness: 0.94,
    metalness: 0,
    side: THREE.DoubleSide,
  });
  fallbackMaterial.skinning = true;

  model.traverse((object) => {
    if (!object.isMesh) return;

    if (Array.isArray(object.material)) {
      object.material = object.material.map((material) =>
        materialHasTexture(material) ? prepareSkinnedMaterial(material) : prepareSkinnedMaterial(fallbackMaterial.clone()),
      );
    } else {
      object.material = materialHasTexture(object.material)
        ? prepareSkinnedMaterial(object.material)
        : fallbackMaterial;
    }

    object.frustumCulled = false;
  });
}

function prepareSkinnedMaterial(material) {
  material.skinning = true;
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
