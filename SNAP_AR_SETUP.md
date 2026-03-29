# Snap AR Setup Guide for Gummi

This guide covers everything needed: credentials, the 2D lens (quickest path), and the full **3D interactable bear** lens (the showstopper).

---

## Overview

| Part | What it does |
|------|--------------|
| **Lens Studio** | Build the AR lens — 3D bear + hue-shift + outfit toggles + animations |
| **Camera Kit / Creative Kit** | Embed the lens in the Gummi web app + pass user's bear config |
| **`lens-studio/` scripts** | Drop-in JS files ready to paste into Lens Studio |

---

## Part 1 — Account Setup (Do This First, Has Wait Times)

### Step 1: Snap Developer Account
1. Go to [developers.snap.com](https://developers.snap.com)
2. Sign in with your Snapchat account
3. Create an Organization (free, instant)

### Step 2: My Lenses Account
1. Go to [my-lenses.snapchat.com](https://my-lenses.snapchat.com)
2. Sign in — this is where you publish lenses and get IDs

### Step 3: Camera Kit App Registration
1. Go to [kit.snapchat.com](https://kit.snapchat.com) → Create App
2. Enable **Camera Kit**
3. Under API Tokens: copy the **Staging Token** (works immediately, watermark visible)

### Step 4: Creative Kit Registration (for share-to-Snapchat)
1. Same portal → enable **Creative Kit** on your app
2. Note the **Client ID**

---

## Part 2 — Build the 3D Interactable Bear Lens

This is the full showstopper build. Budget ~4 hours.

### Step 1: Get a 3D Gummi Bear Model

**Fastest path (AI-generated, ~10 min):**
1. Go to [meshy.ai](https://meshy.ai) — free tier works
2. Text-to-3D prompt: `"cute cartoon gummy bear, round body, stubby arms and legs, shiny translucent candy material, no accessories, T-pose"`
3. Download as `.glb` (GLTF binary)

**Free download alternative:**
- Search [sketchfab.com/models?features=downloadable&q=gummy+bear](https://sketchfab.com/models?features=downloadable&q=gummy+bear) — filter by free + downloadable + GLB

**Model requirements:**
- Single mesh body (or body + separate outfit attachment points)
- Base color: cherry red `#C45D3E` — this is the "source of truth" color we hue-shift from
- Poly count: under 10k for mobile AR performance

### Step 2: Create Lens Studio Project

1. Download [Lens Studio](https://ar.snap.com/download) (~2GB)
2. Open Lens Studio → **New Project**
3. Choose template:
   - **Face Lens**: use "Face Image" template → good for selfie bear beside face
   - **World Lens**: use "World Tracking Planes" template → bear placed on table/floor
4. Name the project `GummiBear`

### Step 3: Import the 3D Bear

1. Drag the `.glb` file into the **Resources** panel
2. Lens Studio auto-creates a mesh, material, and render component
3. In the **Scene Hierarchy**, rename the root object to `BearRoot`
4. Create this child structure under `BearRoot`:
   ```
   BearRoot
   ├── BearBody          ← the bear mesh (RenderMeshVisual)
   ├── Clothing          ← empty parent for all clothing meshes
   │   ├── Clothing_TShirt    (hidden by default)
   │   ├── Clothing_Hoodie    (hidden by default)
   │   ├── Clothing_Dress     (hidden by default)
   │   ├── Clothing_Blazer    (hidden by default)
   │   ├── Clothing_Overalls  (hidden by default)
   │   ├── Clothing_Sweater   (hidden by default)
   │   ├── Clothing_Tuxedo    (hidden by default)
   │   └── Clothing_Cape      (hidden by default)
   ├── Accessories       ← empty parent for accessories
   │   ├── Acc_Glasses        (hidden by default)
   │   ├── Acc_Sunglasses     (hidden by default)
   │   ├── Acc_Scarf          (hidden by default)
   │   ├── Acc_Bowtie         (hidden by default)
   │   ├── Acc_Headphones     (hidden by default)
   │   └── Acc_Wings          (hidden by default)
   └── Headwear          ← empty parent for headwear
       ├── Hat_Beanie         (hidden by default)
       ├── Hat_Crown          (hidden by default)
       ├── Hat_FlowerCrown    (hidden by default)
       ├── Hat_Beret          (hidden by default)
       ├── Hat_TopHat         (hidden by default)
       ├── Hat_Cap            (hidden by default)
       └── Hat_Halo           (hidden by default)
   ```
5. Uncheck "enabled" on every outfit child in Inspector (they start hidden)

### Step 4: Add Outfit 3D Meshes

For each outfit item you want to demo, you need a mesh placed on the bear.

**Fast approach for hackathon (2D billboards on 3D bear):**
1. Export each SVG outfit from the React components as transparent PNG:
   - Render `<GummiBearClothing />` in a browser at 400×640, screenshot with transparency
   - Or open `public/gummi-icon.png` as reference and overlay items
2. Import each PNG into Resources
3. For each outfit child object: Add Component → **Image** → assign the PNG
4. Scale and position to match the bear body. Reference positions (in bear-local coords):
   - Clothing: Y = 0, Z = 0.1 (in front of body center)
   - Headwear: Y = 0.45 (above head)
   - Accessories (glasses): Y = 0.2 (eye level)
   - Wings: scale ×2, Z = -0.1 (behind body)

**Better approach (actual 3D meshes):**
- Model simple accessories in Blender (crown = cylinder array, glasses = two tori)
- Export as GLB, import into Resources, assign to the child SceneObjects above

### Step 5: Add Scripts

All scripts are in `lens-studio/` in this repo. Copy each into Lens Studio:

**Add ColorUtils first (shared math library):**
1. Resources → `+` → **Script** → name it `ColorUtils`
2. Paste the full contents of `lens-studio/ColorUtils.js`

**Add BearConfig (reads launchParams from Gummi app):**
1. Resources → `+` → **Script** → name it `BearConfig`
2. Paste `lens-studio/BearConfig.js`
3. Add script component to `BearRoot`
4. In Inspector, wire the 4 inputs:
   - `bearBody` → BearRoot/BearBody
   - `clothingRoot` → BearRoot/Clothing
   - `accessoryRoot` → BearRoot/Accessories
   - `headwearRoot` → BearRoot/Headwear

**Add BobAnimation (idle float + squish):**
1. Resources → `+` → **Script** → name it `BobAnimation`
2. Paste `lens-studio/BobAnimation.js`
3. Add script component to `BearRoot`
4. Tuning defaults: bobHeight=4, bobSpeed=1.8, swayAngle=3, squishAmount=0.07

**Add CandySparkles (particle burst controller):**
1. Scene Hierarchy → `+` → **Particles** → name it `SparkleEmitter`, parent under BearRoot
2. Configure the Particles component in Inspector:
   - Max Particles: 60
   - Emission Rate: 0 (script controls this)
   - Lifetime: 0.5 – 0.9
   - Start Speed: 20 – 60
   - Start Color gradient: `#C45D3E` → `#F9CA24` → `#6C5CE7` → `#FD79A8` (candy colors)
   - Color Over Lifetime: fade alpha 1→0
   - Shape: Sphere, Radius: 5
   - Gravity Scale: -20 (arc up and fall)
3. Resources → `+` → **Script** → `CandySparkles`
4. Paste `lens-studio/CandySparkles.js`
5. Add script component to `SparkleEmitter`
6. Wire `particles` input → the Particles component on SparkleEmitter

**Add TapJiggle (spring physics on tap):**
1. Resources → `+` → **Script** → `TapJiggle`
2. Paste `lens-studio/TapJiggle.js`
3. Add script component to `BearRoot`
4. Wire `sparklesScript` → CandySparkles script component

**Add FaceReactions (smile/mouth/blink → reactions) — Face Lens only:**
1. Make sure there's a FaceTracking component in the scene (it's in the Face template by default)
2. Resources → `+` → **Script** → `FaceReactions`
3. Paste `lens-studio/FaceReactions.js`
4. Add script component to `BearRoot`
5. Wire all 3 inputs: `faceTracking`, `tapJiggle`, `candySparkles`

**Add WorldPlacement (tap to place) — World Lens only:**
1. Create a new empty SceneObject: `PlacementController`
2. Resources → `+` → **Script** → `WorldPlacement`
3. Paste `lens-studio/WorldPlacement.js`
4. Add script component to `PlacementController`
5. Wire inputs:
   - `bearRoot` → BearRoot
   - `worldTracker` → the DeviceTracking component
   - `scanningHint` → a 2D Text or Image showing "Point at a flat surface"
   - `tapHint` → a 2D Text showing "Tap to place your bear"
   - `tapJiggle` and `candySparkles` → respective script components

### Step 6: Script Execution Order

In Lens Studio's **Scene panel** → right-click each script → **Set Priority**.
Order from first to last:
1. `ColorUtils` (1 — must load before others require it)
2. `BearConfig` (2 — applies hue+outfit on start)
3. `CandySparkles` (3)
4. `BobAnimation` (4)
5. `TapJiggle` (5 — runs after BobAnimation so scale is multiplicative)
6. `FaceReactions` (6)
7. `WorldPlacement` (7 — if world lens)

### Step 7: Bear Material Hue Shift (Advanced — For Smooth Real-time Color)

For the best result, set up the hue shift in the **Material Editor** rather than in JS:

1. In Resources, select BearBody's material (auto-named after the GLB)
2. Double-click to open **Material Editor**
3. Build this node graph:
   ```
   [Texture: bear_diffuse]
       ↓ RGB
   [RGB to HSV]       (built-in node)
       ↓ H    S    V
   [Add node]  ←── [Script Input: "hue" float 0-1]
       ↓
   [HSV to RGB]
       ↓
   [Surface: Base Color]
   ```
4. Right-click the script input node → "Link to Script" → link to `BearConfig.js` property `hue`
5. In `BearConfig.js`, change the hue assignment line to:
   ```javascript
   mat.mainPass.hue = hueDegrees / 360.0;  // 0-1 range for shader
   ```

This approach uses the GPU for hue shift (smoother, no per-frame JS math needed).

### Step 8: Preview and Test

1. Click **Play** in Lens Studio
2. Use the Face Simulation slider to test expressions (FaceReactions)
3. Test tap interaction with the mouse (TapJiggle)
4. Verify the bear matches the expected colors for these hue values:
   - hue=0 → cherry red
   - hue=120 → lime green
   - hue=200 → ocean blue
   - hue=300 → bubblegum pink

### Step 9: Publish

1. **File → Publish Lens**
2. Set visibility to **Unlisted** (no Snap review required for hackathon)
3. Add a name, icon, preview image (screenshot of the bear)
4. Click Publish — takes ~2 minutes
5. Go to [my-lenses.snapchat.com](https://my-lenses.snapchat.com) → your lens → **Details**
6. Copy:
   - **Lens ID** → `NEXT_PUBLIC_SNAP_LENS_ID` in `.env.local`
   - **Group ID** → `NEXT_PUBLIC_SNAP_LENS_GROUP_ID` in `.env.local`

---

## Part 3 — Connect to Gummi Web App

### Add credentials to .env.local
```bash
NEXT_PUBLIC_SNAP_API_TOKEN=your_staging_token_here
NEXT_PUBLIC_SNAP_LENS_ID=your_lens_uuid_here
NEXT_PUBLIC_SNAP_LENS_GROUP_ID=your_group_id_here
NEXT_PUBLIC_SNAP_CREATIVE_CLIENT_ID=your_creative_kit_client_id
```

### Restart the dev server
```bash
npx next dev --port 54980
```

### Test the integration
1. Open [localhost:54980](http://localhost:54980)
2. Open the bear customizer → set a color and outfit
3. Click **"Try in AR"** (compact yellow button in customizer header)
4. Camera opens → bear appears with your exact color and outfit
5. Smile → candy sparkles burst
6. Tap bear → spring bounce
7. Double-tap (world lens) → 360° celebration spin

---

## Part 4 — lens-studio/ Script Reference

All scripts are in `lens-studio/` at the project root.

| File | Purpose | Attach To |
|------|---------|-----------|
| `ColorUtils.js` | Shared HSV/RGB math + spring physics. Required by other scripts. | Any SceneObject |
| `BearConfig.js` | Reads `launchParams` (hue, clothing, accessory, headwear) from Gummi app. Applies hue to material, toggles outfit meshes. | BearRoot |
| `BobAnimation.js` | Idle sinusoidal float + squish/stretch scale animation. Tunable via Inspector inputs. | BearRoot |
| `TapJiggle.js` | Spring physics scale bounce on touch. Triggers sparkles. Exposes `api.jiggle(intensity)` for other scripts. | BearRoot |
| `FaceReactions.js` | Reads FaceTracking blend shapes (smile, jaw open, blink, brow). Triggers sparkles/bounce at configurable thresholds. Face Lens only. | BearRoot |
| `CandySparkles.js` | Controls a Particles component. `api.burst()` for normal, `api.bigBurst()` for purchase celebration. | SparkleEmitter |
| `WorldPlacement.js` | HitTest-based tap-to-place on real surfaces. Smooth lerp movement. Double-tap = celebration spin. World Lens only. | PlacementController |

### Script Dependencies (require graph)
```
BobAnimation   → ColorUtils
TapJiggle      → ColorUtils → (CandySparkles via @input)
FaceReactions  → (TapJiggle via @input) → (CandySparkles via @input)
BearConfig     → ColorUtils
WorldPlacement → (TapJiggle via @input) → (CandySparkles via @input)
```

### Item ID → Scene Object Name Mapping

These exact names must match between the app and Lens Studio scene hierarchy:

**Clothing** (children of `Clothing` SceneObject):
| App Item ID | Scene Object Name |
|-------------|------------------|
| `clothing-tshirt` | `Clothing_TShirt` |
| `clothing-hoodie` | `Clothing_Hoodie` |
| `clothing-dress` | `Clothing_Dress` |
| `clothing-blazer` | `Clothing_Blazer` |
| `clothing-overalls` | `Clothing_Overalls` |
| `clothing-sweater` | `Clothing_Sweater` |
| `clothing-tuxedo` | `Clothing_Tuxedo` |
| `clothing-cape` | `Clothing_Cape` |

**Accessories** (children of `Accessories` SceneObject):
| App Item ID | Scene Object Name |
|-------------|------------------|
| `acc-glasses` | `Acc_Glasses` |
| `acc-sunglasses` | `Acc_Sunglasses` |
| `acc-scarf` | `Acc_Scarf` |
| `acc-bowtie` | `Acc_Bowtie` |
| `acc-headphones` | `Acc_Headphones` |
| `acc-wings` | `Acc_Wings` |

**Headwear** (children of `Headwear` SceneObject):
| App Item ID | Scene Object Name |
|-------------|------------------|
| `hat-beanie` | `Hat_Beanie` |
| `hat-crown` | `Hat_Crown` |
| `hat-flower` | `Hat_FlowerCrown` |
| `hat-beret` | `Hat_Beret` |
| `hat-tophat` | `Hat_TopHat` |
| `hat-cap` | `Hat_Cap` |
| `hat-halo` | `Hat_Halo` |

---

## Part 5 — Demo Script for Judges

**Talking point:** *"Every user's bear is unique. When they customize it in the app — color, outfit, accessories — those exact choices transfer seamlessly into AR. Your bear literally follows you into the real world."*

**Live demo flow:**
1. Open Gummi → show the product feed
2. Open profile → show your customized bear
3. Open customizer → set color to Emerald (`hue=120`), add Crown + Sunglasses
4. Click **"Try in AR"** (compact button in customizer header)
5. Camera opens → emerald bear with crown and sunglasses appears
6. **Smile at camera** → candy sparkles burst from the bear
7. **Tap the bear** → spring bounce
8. Close AR → switch to world lens demo
9. Point camera at table → bear appears on the surface
10. **Double-tap** → 360° celebration spin with big sparkle burst

---

## Part 6 — Troubleshooting

| Error | Fix |
|-------|-----|
| `Camera access denied` | Browser needs camera permission — click Allow |
| `Invalid API token` | Check `NEXT_PUBLIC_SNAP_API_TOKEN` — use staging token |
| `Lens not found` | Verify `SNAP_LENS_ID` and `SNAP_LENS_GROUP_ID` in `.env.local` |
| Watermark visible | Normal for staging token |
| Bear appears but wrong color | `BearConfig.js` input: `bearBody` must point to the mesh with the hue-shiftable material |
| Outfit not showing | Scene object names are case-sensitive — must match the table above exactly |
| `require("./ColorUtils") failed` | ColorUtils script must be in Resources AND have script priority = 1 |
| FaceReactions not firing | Check FaceTracking component is in scene; blend shape names vary by Lens Studio version |
| WorldPlacement bear not appearing | Ensure `bearRoot.enabled = true` in STATE_READY — check `scanningHint` is wired |
| Black canvas in browser | Camera Kit needs HTTPS or localhost — don't use raw IP |

---

## File Reference

| File | Purpose |
|------|---------|
| `lib/snap-ar.ts` | buildSnapLaunchData, startCameraKitSession, Creative Kit share |
| `components/SnapAR/ARLensModal.tsx` | In-app AR modal with Camera Kit canvas |
| `components/SnapAR/SnapARButton.tsx` | "See My Bear in AR" button with strategy waterfall |
| `app/ar/page.tsx` | Standalone full-screen AR page at `/ar` |
| `lens-studio/ColorUtils.js` | Shared math: HSV shift, spring physics |
| `lens-studio/BearConfig.js` | launchParams reader + outfit toggle |
| `lens-studio/BobAnimation.js` | Idle float + squish animation |
| `lens-studio/TapJiggle.js` | Spring bounce on tap |
| `lens-studio/FaceReactions.js` | Face expression → reactions |
| `lens-studio/CandySparkles.js` | Particle burst controller |
| `lens-studio/WorldPlacement.js` | Tap-to-place on real surface |
| `.env.local` | Snap credentials (never commit this file) |
