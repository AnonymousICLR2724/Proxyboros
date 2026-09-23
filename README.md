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

The Video section and its navigation link are temporarily commented out in
`index.html`; the original markup and `assets/videos/` are retained.

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
change instead of every drag event. A requested case immediately clears all five
old models and updates the public `Motion Case XX` label. The new batch appears
together with a slide-in transition after preparation; a failure leaves that
requested case empty with an error. Internal sequence IDs stay in asset paths.

`Normal` is the default comparison display mode. `Texture` restores the original
textured appearance or the existing gray/blue fallback. Mode toggles reuse the
loaded scenes without restarting animation or changing cameras and persist
across case/group changes. Both material representations are released on disposal.
The pinned Three.js version uses a flat-shaded MeshNormalMaterial so normal colors
follow the deformed surface while retaining all eight position morph targets.

All five views share a camera and animation clock. Animated bounds are computed
once from Input, with a shared margin of 10% of its largest extent on each side.
The same center and scale are applied to every method.
Export each method in matching coordinates, units, and timing. Check framing
when replacing assets, particularly for motions with large excursions.

The first comparison case loads on page open. The **Interactive Animation
Gallery** derives all 15 Original/Repaired split cards from the same SMPL-H list;
there is no second asset-path list. Desktop/tablet/mobile show 3/2/1 cards, and
each arrow moves one card (clamped at the endpoints). After six seconds idle,
the gallery slowly advances one card and reverses direction at each endpoint.
Pointer dragging pauses advancement; wheel, keyboard, focus and arrow interaction
restart the idle interval. Reduced-motion preferences disable automatic advances
and the slide animation.

The gallery loads only its visible cards plus one neighbor on either side when
on-screen (at most five split viewers on desktop). More distant viewers are
disposed; revisits use normal browser HTTP caching. Off-screen cards/sections and
hidden tabs skip rendering, and off-screen/hidden galleries pause auto-advance.
Original/Repaired labels, split-handle keyboard controls and camera rotation/zoom
remain available. The film-strip rails are CSS decoration only.

Run `node --test tests/*.test.cjs` to check all asset paths, comparison labels and
modes, atomic loading/error behavior, shared Input bounds, material disposal,
gallery navigation/idle behavior and bounded viewer initialization.

Keep individual media files below GitHub's 100 MiB hard file limit.
