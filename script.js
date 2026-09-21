const comparisons = document.querySelectorAll("[data-compare]");

comparisons.forEach((comparison) => {
  const slider = comparison.querySelector('input[type="range"]');
  if (!slider) return;

  const updateSlider = () => {
    comparison.style.setProperty("--position", `${slider.value}%`);
    slider.setAttribute("aria-valuetext", `${slider.value}% repaired reveal`);
  };

  slider.addEventListener("input", updateSlider);
  updateSlider();
});

const viewerRoots = document.querySelectorAll("[data-viewer]");
const activeViewers = [];

if (window.THREE && viewerRoots.length) {
  viewerRoots.forEach((viewerRoot, index) => {
    const viewer = createModelComparisonViewer(viewerRoot, index);
    if (viewer) activeViewers.push(viewer);
  });

  const tick = () => {
    activeViewers.forEach((viewer) => viewer.update());
    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

function createModelComparisonViewer(container, index) {
  const canvas = container.querySelector("canvas");
  const handle = container.querySelector(".model-compare-handle");
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
  controls.enableDamping = true;
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
  const beforePlaceholder = createPlaceholderModel(index, "before");
  const afterPlaceholder = createPlaceholderModel(index, "after");
  normalizeModel(beforePlaceholder);
  normalizeModel(afterPlaceholder);
  beforeRoot.add(beforePlaceholder);
  afterRoot.add(afterPlaceholder);
  scene.add(beforeRoot, afterRoot);

  const mixers = [];
  const clock = new THREE.Clock();
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
    update() {
      const elapsed = clock.getElapsedTime();
      mixers.forEach((mixer) => {
        const duration = mixer.duration || 0;
        mixer.setTime(duration > 0 ? elapsed % duration : elapsed);
      });
      controls.target.set(0, 0, 0);
      controls.update();
      renderSplitView(renderer, scene, camera, beforeRoot, afterRoot, size, splitPosition);
    },
  };
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
    color: variant === "before" ? 0x6f7885 : [0x0b7f79, 0x19806f, 0xc99a2e][index % 3],
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
