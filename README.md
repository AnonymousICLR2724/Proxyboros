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

Empty paths display "GLB to be added". Only the first SMPL-H case currently has
Input and Ours assets; the remaining cases are placeholders. PoseShield always
displays "Unavailable" for non-SMPL, and its path is ignored in that group.
Switching groups returns to the first case in the selected group.
Arrows wrap through the cases; the progress slider selects a case directly.
All five views change together, share a camera and animation clock, and use the
same bounds. Export each method in matching coordinates, units, and timing.

Run `node --test tests/carousel.test.cjs` to check case navigation and stale-load handling.

Keep individual media files below GitHub's 100 MiB hard file limit.
