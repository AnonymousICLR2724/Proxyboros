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
- For comparison sliders, set per-card background images directly:

```html
<div
  class="comparison"
  data-compare
  style="
    --position: 50%;
    --before-bg: url('assets/examples/case-01-before.png') center / cover no-repeat;
    --after-bg: url('assets/examples/case-01-after.png') center / cover no-repeat;
  "
>
```

Keep individual media files below GitHub's 100 MiB hard file limit.
