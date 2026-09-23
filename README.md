# MeshRepair Anonymous Visual Supplement

This is a lightweight static visual supplement page for anonymous ICLR review.
It does not require Astro, React, or a build step.

For GLB preview, start a local static server from this folder:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Then open `http://127.0.0.1:8000/`.

## Anonymity Checklist

- Do not include author names, affiliations, lab names, acknowledgements, or
  repository links before review ends.
- Use neutral media filenames such as `case-01-before.png`.
- Check image/video metadata if the files came from a local render pipeline.

## Replace Media

- Put MP4 files in `assets/videos/` and update the `<source>` paths in
  `index.html`.
- Put animated GLB files in `assets/models/`, then update each model comparison
  viewer:

```html
<div
  class="model-viewer"
  data-viewer
  data-before-model="assets/models/motion-01-original.glb"
  data-after-model="assets/models/motion-01-repaired.glb"
  style="--position: 50%;"
>
```

Use a local static server or GitHub Pages to preview real GLB loading; browsers
often block local model fetches when opening `index.html` directly.
- For the five-column Qualitative Comparisons carousel, edit `comparisonCases`
  at the top of `script.js`. The `"smpl-h"` and `"non-smpl"` lists contain
  separate cases, selected by the two buttons. Each entry has these GLB paths:

```javascript
{
  title: "Description of the motion",
  input: "assets/models/case-01-input.glb",
  isir: "assets/models/case-01-isir.glb",
  meshUtg: "assets/models/case-01-mesh-utg.glb",
  poseShield: "assets/models/case-01-pose-shield.glb",
  ours: "assets/models/case-01-ours.glb",
}
```

The 15 SMPL-H cases use compressed GLBs under
`assets/models/SMPLH-comparison/motionfix_<sequence>/`: `input.glb`, `isir.glb`,
`mesh-utg.glb`, `poseshield.glb`, and `ours.glb`. Keep all five paths explicit in
`comparisonCases`; export logs are not webpage assets. The JavaScript key stays
`meshUtg` although its filename is `mesh-utg.glb`.

Empty paths display "GLB to be added". The non-SMPL cases remain placeholders. PoseShield always
displays "Unavailable" for non-SMPL, and its path is ignored in that group.
Switching groups returns to the first case in the selected group.
Arrows wrap through the cases; the progress slider loads a case on committed
change instead of every drag event. While loading, the previous comparison and
its caption remain visible. All five views change together only after preparation
succeeds; failures retain the previous case and display an error.

All five views share a camera and animation clock. Animated bounds are computed
once from Input, with a shared margin of 10% of its largest extent on each side.
The same center and scale are applied to every method.
Export each method in matching coordinates, units, and timing. Check framing
when replacing assets, particularly for motions with large excursions.

The first comparison case loads on page open. Standalone Motion Model Viewers
initialize once when their section approaches within 300 CSS pixels of the
viewport. Off-screen viewers and hidden browser tabs skip animation/render
updates, preserving their scenes for reuse. Browsers without IntersectionObserver
initialize immediately. No adjacent cases are prefetched or parsed scenes cached.

Run `node --test tests/carousel.test.cjs` to check all 75 asset paths, case
navigation, atomic loading/failure handling, Input bounds, lazy initialization,
and visibility-aware rendering.

Keep individual media files below GitHub's 100 MiB hard file limit.
