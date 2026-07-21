## Design Direction

XINSHENGAN is a cinematic industrial traffic-safety site built as a new isolated digital asset. The experience uses asphalt black, warning red, reflective yellow, fog white, and steel gray; oversized outlined type and road-line motifs organize verified traffic bollard families into a technical product narrative. It borrows only the cinematic chapter logic of the referenced editorial system; no XISHANG content, imagery, model, palette, or page composition is reused.

## Reference Sources

- User source: 1688 store `chenxiaoping168.1688.com` and offer `1044010345653`, inspected through public metadata, raw HTML, visible product images, and connected 1688 product evidence.
- Verified supplier/product identity: product embed identifies `天台县广富交通设施厂` and seller login `鑫盛安塑业`; export legal name remains subject to supplier confirmation.
- `vendor/open-design/adapter/STATIC_POLICY.md` — static resource boundary.
- `vendor/open-design/upstream/design-systems/Industrial-Brutalist-Utility/DESIGN.md` and matching `tokens.css` — industrial hierarchy and technical metadata rhythm.
- `vendor/open-design/upstream/design-systems/Cinematic-Noir-Folio/DESIGN.md` — cinematic dark chapter logic.
- `vendor/open-design/upstream/design-systems/Industrial-Brutalist-Utility/components.html` — utility bars, technical cards, and segmented controls.
- `vendor/open-design/upstream/craft/anti-ai-slop.md`, `animation-discipline.md`, and `rtl-and-bidi.md`.

## Design Tokens

- Asphalt `#0B0D0E`; charcoal `#181B1D`; safety red `#D71920`; reflective yellow `#D7FF35`; fog white `#F4F6F5`; steel gray `#8B9499`.
- System sans stack only; condensed display effect through font-stretch/fallback and tight tracking. No external font CDN.
- Sharp 0–4px corners, 1px steel dividers, technical monospace for specifications.
- Motion: road-line intro, restrained reveal, reflective sweep, product rail, GLB auto-rotation; reduced-motion fallback.

## Product Taxonomy

1. Plastic 70 cm bollard — white or fluorescent yellow reflective bands.
2. Plastic 75 cm bollard — 7 cm top, 18 cm base.
3. Soft-plastic 73 cm bollard — 6.5 cm top, 18 cm base.
4. PU 70 cm flexible bollard — fluorescent reflective bands, 18 cm base.
5. Thickened plastic 70 cm bollard.
6. Chain-ready 75 cm bollard with top loop.
7. EVA foam 75 cm bollard — black/red/orange color directions, 20 cm base.
8. Extended-height family — verified listing options include 45–110 cm; exact SKU combination must be confirmed.

Do not display live domestic price, stock, export MOQ, lead time, certification, UV/impact percentages, or unsupported durability claims.

## Page Structure

1. CSS cinematic entry gate with animated road line and Enter Site control.
2. Sticky utility navigation, six-language selector, internal anchors.
3. Hero spotlight: PU 70 cm bollard, headline `ENGINEERED TO BE SEEN.` and internal CTAs.
4. Eight-family product matrix with material/height/structure filters and detail drawer.
5. Material lab comparing verified Plastic / Soft Plastic / PU / EVA categories without performance percentages.
6. Real GLB showroom for PU 70 cm bollard.
7. Use-context chapter: parking guidance, road diversion, construction separation, and warehouse aisle marking as intended applications, not customer cases.
8. Product comparison, maximum three models.
9. Specification configurator: material, height, reflective band, chain option, screw preference, quantity.
10. Six-language copyable inquiry summary.
11. Corporate/disclosure footer with supplier identity confirmation note.

## Component Plan

`CinematicIntro`, `UtilityNav`, `LanguageSelector`, `HeroSpotlight`, `ProductMatrix`, `ProductCard`, `ProductDrawer`, `MaterialLab`, `Bollard3DViewer`, `UseContexts`, `CompareTray`, `ComparisonModal`, `InquiryProvider`, `SpecConfigurator`, `InquirySummary`, `CorporateFooter`, `Reveal`.

## 3D Plan

- Local asset: `public/assets/models/pu-bollard-70cm.glb`.
- Procedural real geometry: tapered PU post, round base, three reflective yellow bands, mounting holes, underside/base thickness.
- Three.js + GLTFLoader + OrbitControls; rotate, zoom, reset, auto-rotate, loading/error states, reduced motion, mobile gestures.
- Disclosure: visual presentation model only; hole placement, wall thickness, underside details, and exact dimensions are approximations and not CAD/manufacturing data.

## Image Manifest

All eight authorized marketplace images are downloaded into `public/assets/images/xinshengan/` before coding. No active marketplace hotlinks remain. One new cinematic hero scene may be generated from the verified PU product image while preserving product geometry/color/bands; no stock imagery is used.

## Copy Tone

Authoritative and technical, but evidence-bound. Prefer `70 cm PU flexible bollard`, `fluorescent reflective bands`, `18 cm base`, `chain-ready top loop`, and `configuration to be confirmed`. Avoid `100% recovery`, `anti-UV`, `best quality`, fake certifications, or invented export capacity.

## Responsive / RTL

- Desktop: asymmetric cinematic hero, 4-column product matrix, split 3D/spec layout.
- Tablet: 2-column matrix and stacked lab/viewer.
- Mobile 390px: single-column products, horizontal filter rail, compact intro, full-width drawer/modal, safe fixed compare tray.
- Arabic synchronizes `dir=rtl` across navigation, cards, drawers, compare, configuration, and summary.

## Motion and Control System Upgrade

- The cinematic entry gate remains structurally unchanged but becomes continuously alive: two perspective road-edge streams, a moving center line, low-frequency horizontal scan light, drifting film grain, two signal pulses, title luminance breathing, and a subtle status rail. All loops are seamless and remain active until the visitor enters.
- Primary actions use a reflective-yellow industrial signal control with a clipped corner, lower status rail, moving reflective sweep, icon shift, tactile press, and dual focus ring.
- Secondary, text, icon, segmented, quantity, comparison, language, and 3D controls inherit one state system rather than unrelated default button styles.
- Motion cycles stay between 2.4 and 12 seconds with no high-frequency flashing. `prefers-reduced-motion` freezes the stable final state and disables all loops and sweeps.
- RTL mirrors clipped corners, status rails, sweep direction, and directional icon motion.

## Risks / Open Questions

- The store homepage and embedded product data expose different company identities. Public site uses XINSHENGAN as a working brand; export legal entity must be confirmed by the supplier.
- Several heights appear in SKU evidence, but not every material/height combination is verified. Configurator selections are inquiry preferences, not promised availability.
- Product images contain Chinese promotional text; localized cards can crop or frame them but must not alter verified specifications without an approved edit.
