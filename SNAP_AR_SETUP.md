# Snap AR Setup Guide for Gummi

This guide walks through everything needed to get the Gummi AR bear working — from Lens Studio build to Camera Kit credentials to web integration.

---

## Overview

The integration has two parts:

| Part | What it does |
|------|--------------|
| **Lens Studio** | Build the AR lens (bear PNG + hue shift + outfit overlays + animation) |
| **Camera Kit / Creative Kit** | Embed the lens in Gummi web app + pass user's bear config |

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
4. Note the **App ID**

### Step 4: Creative Kit Registration (for share-to-Snapchat)
1. Same portal → enable **Creative Kit** on your app
2. Note the **Client ID**

---

## Part 2 — Build the Lens in Lens Studio

### Download Lens Studio
[ar.snap.com/download](https://ar.snap.com/download) — ~2GB, install in advance.

### Step 1: Create a new lens from the Face Image template
1. Open Lens Studio → New Project → **2D Objects** template
2. This gives you a face-tracked 2D plane out of the box

### Step 2: Import the gummi-icon.png
1. Drag `public/gummi-icon.png` into the **Resources** panel
2. In the Scene Hierarchy, select the existing `2D Image` object
3. In the Inspector, set its **Texture** to `gummi-icon.png`
4. Scale it to ~0.8 and offset it so the bear floats beside (not on) the face:
   - Position: `X = 0.4, Y = 0.1, Z = 0`

### Step 3: Build the hue-shift material
This is the critical step that makes the bear match the user's color.

1. In Resources → `+` → **Material** → name it `BearMat`
2. Open the **Material Editor** (double-click BearMat)
3. Add nodes:
   ```
   [Texture 2D: gummi-icon.png]
       ↓ RGBA
   [Split]
       ↓ RGB
   [RGB to HSV]
       ↓ H  S  V
   [Add: hue_shift / 360]  ← This is our hue param
       ↓
   [HSV to RGB]
       ↓
   [Combine with original Alpha]
       ↓
   [Color Output]
   ```
4. Right-click the `hue_shift` Add node → **Export as Script Input** → name it `hue`
5. Apply `BearMat` to the 2D Image object

### Step 4: Read hue from launch params in a script
1. In Resources → `+` → **Script** → name it `BearConfig`
2. Paste:
   ```javascript
   // @input Component.MaterialMeshVisual bearVisual

   // Read bear config from Gummi web app via Camera Kit launchData
   function onLensStarted() {
     var hue = 0;
     var clothing = "";
     var accessory = "";
     var headwear = "";

     // Try to read from launchParams (sent by Camera Kit applyLens)
     try {
       hue = parseFloat(global.launchParams.getString("bear_hue") || "0");
       clothing = global.launchParams.getString("clothing") || "";
       accessory = global.launchParams.getString("accessory") || "";
       headwear = global.launchParams.getString("headwear") || "";
     } catch(e) {
       // launchParams not available in Snapchat preview — use defaults
     }

     // Apply hue shift to bear material (0-360 → 0-1 for shader)
     if (script.bearVisual) {
       script.bearVisual.mainMaterial.mainPass.hue = hue / 360.0;
     }

     // Show/hide outfit overlays based on IDs
     toggleOutfit(clothing, accessory, headwear);
   }

   function toggleOutfit(clothing, accessory, headwear) {
     // Find scene objects by name and toggle visibility
     var allOutfitObjects = [
       "hoodie", "tshirt", "blazer", "cape", "tuxedo", "dress", "sweater", "overalls",
       "glasses", "sunglasses", "scarf", "bowtie", "headphones", "wings",
       "beanie", "crown", "flower-crown", "beret", "tophat", "cap", "halo"
     ];

     allOutfitObjects.forEach(function(name) {
       var obj = scene.getRootObject().findFirst(name);
       if (obj) obj.enabled = false;
     });

     // Enable equipped items
     var clothingMap = {
       "clothing-hoodie": "hoodie", "clothing-tshirt": "tshirt",
       "clothing-blazer": "blazer", "clothing-cape": "cape",
       "clothing-tuxedo": "tuxedo", "clothing-dress": "dress",
       "clothing-sweater": "sweater", "clothing-overalls": "overalls"
     };
     var accessoryMap = {
       "acc-glasses": "glasses", "acc-sunglasses": "sunglasses",
       "acc-scarf": "scarf", "acc-bowtie": "bowtie",
       "acc-headphones": "headphones", "acc-wings": "wings"
     };
     var headwearMap = {
       "hat-beanie": "beanie", "hat-crown": "crown",
       "hat-flower": "flower-crown", "hat-beret": "beret",
       "hat-tophat": "tophat", "hat-cap": "cap", "hat-halo": "halo"
     };

     if (clothingMap[clothing]) {
       var cObj = scene.getRootObject().findFirst(clothingMap[clothing]);
       if (cObj) cObj.enabled = true;
     }
     if (accessoryMap[accessory]) {
       var aObj = scene.getRootObject().findFirst(accessoryMap[accessory]);
       if (aObj) aObj.enabled = true;
     }
     if (headwearMap[headwear]) {
       var hObj = scene.getRootObject().findFirst(headwearMap[headwear]);
       if (hObj) hObj.enabled = true;
     }
   }

   script.createEvent("OnStartEvent").bind(onLensStarted);
   ```
3. Assign `bearVisual` in the Inspector to the 2D Image object

### Step 5: Add outfit overlay 2D images
For each clothing/accessory/headwear item:
1. Export the SVG from `GummiBearClothing.tsx`, `GummiBearAccessories.tsx`, `GummiBearHeadwear.tsx` as PNG (use browser: render the SVG at 400×640, screenshot, export transparent PNG)
2. Import each PNG into Lens Studio Resources
3. Create a 2D Image scene object for each, named exactly as in the script above (`hoodie`, `crown`, etc.)
4. Position over the bear — the bear is at `(0.4, 0.1, 0)` so offset from there:
   - Clothing items: `Y = -0.05` (torso area)
   - Headwear: `Y = 0.35` (top of head)
   - Accessories: `Y = 0.05` (face/neck area)
5. Set all outfit objects to `enabled = false` by default (script enables them on start)

### Step 6: Add idle bob animation
1. Resources → `+` → Script → name it `BobAnimation`
2. Paste:
   ```javascript
   // @input SceneObject bearObject
   var time = 0;
   var baseY;

   script.createEvent("OnStartEvent").bind(function() {
     baseY = script.bearObject.getTransform().getLocalPosition().y;
   });

   script.createEvent("UpdateEvent").bind(function() {
     time += getDeltaTime();
     var pos = script.bearObject.getTransform().getLocalPosition();
     pos.y = baseY + Math.sin(time * 2.2) * 0.03;
     script.bearObject.getTransform().setLocalPosition(pos);
   });
   ```
3. Assign `bearObject` to the 2D Image with the bear

### Step 7: Add candy sparkle particles on smile
1. In the Scene Hierarchy: `+` → **Particles** → name it `CandySparkles`
2. In Inspector, set:
   - Shape: Sphere, Radius: 0.15
   - Rate: 0 (we'll trigger it)
   - Lifetime: 0.8s
   - Speed: 0.3–0.6
   - Color: gradient from `#FFFC00` → `#FF0099`
   - Size: 0.02–0.04
3. Add a Behavior Script (built-in template) → trigger: `Mouth Open` → action: Set Rate to 25
4. Second trigger: `Mouth Close` → Set Rate to 0
5. Position the particles at the bear's location

### Step 8: Preview in Lens Studio
- Click the play button — you should see the bear floating next to a face in the preview
- Use the face simulation slider to test expressions

### Step 9: Publish the lens
1. File → Publish Lens
2. Set visibility to **Unlisted** (for hackathon — no review required)
3. After publishing, go to [my-lenses.snapchat.com](https://my-lenses.snapchat.com)
4. Find your lens → **Details**
5. Copy:
   - **Lens ID** → `NEXT_PUBLIC_SNAP_LENS_ID` in `.env.local`
   - **Group ID** → `NEXT_PUBLIC_SNAP_LENS_GROUP_ID` in `.env.local`

---

## Part 3 — Connect to Gummi Web App

### Add credentials to .env.local
```
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
2. Click your profile avatar (bottom of sidebar)
3. The profile opens → you see **"See My Bear in AR"** button with Snap gradient
4. Click it → Camera Kit modal opens with live webcam + your bear floating next to your face
5. Your bear's color and outfit match exactly what you configured in the customizer

---

## Part 4 — Optional: World Lens (Bear on a Table)

To also build a world lens (tap to place bear on a surface):

1. Lens Studio → New Project → **World Tracking Planes** template
2. Replace the default spawn object with your bear 2D image + BearMat + BobAnimation
3. The "Tap to Spawn" script is already in the template
4. Publish as a second lens — add `NEXT_PUBLIC_SNAP_WORLD_LENS_ID` to `.env.local`
5. Add a second button in `ARLensModal.tsx` to switch between face and world lens

---

## Part 5 — Demo Script for Judges

1. **Open Gummi** → feed loads with product grid
2. **Open profile** (click bear avatar in sidebar) → show the customized bear
3. **Open customizer** → change color to Emerald, add Crown hat, Sunglasses
4. **Click "Try in AR"** (compact button in customizer header)
5. → Camera opens, emerald bear with crown and sunglasses appears beside your face
6. **Smile** → candy sparkles burst from the bear
7. **Close AR** → back to customizer
8. **Click "See My Bear in AR"** (full button on profile)
9. → Full-screen AR with outfit badges at the bottom

**Key talking point:** "Every user's bear is unique. When they customize it in the app — choosing their color, outfit, accessories — those exact choices transfer seamlessly into the AR experience. Your bear literally follows you into the real world."

---

## Troubleshooting

| Error | Fix |
|-------|-----|
| `Camera access denied` | Browser needs camera permission — click Allow |
| `Invalid API token` | Double-check `NEXT_PUBLIC_SNAP_API_TOKEN` — use the staging token, not production |
| `Lens not found` | Verify `NEXT_PUBLIC_SNAP_LENS_ID` and `NEXT_PUBLIC_SNAP_LENS_GROUP_ID` match the lens portal |
| Watermark visible | Normal for staging token — production token requires Snap review |
| Bear appears but wrong color | Check that `BearMat` hue input is named exactly `hue` in the Material Editor |
| Outfit not showing | Verify scene object names match exactly (case-sensitive) in the BearConfig script |
| Black canvas in browser | Camera Kit needs HTTPS or localhost — don't test on raw IP |

---

## File Reference

| File | Purpose |
|------|---------|
| `lib/snap-ar.ts` | Utility functions: buildSnapLaunchData, startCameraKitSession, Creative Kit share |
| `components/SnapAR/ARLensModal.tsx` | In-app AR modal with Camera Kit canvas |
| `components/SnapAR/SnapARButton.tsx` | "See My Bear in AR" button with strategy waterfall |
| `app/ar/page.tsx` | Standalone full-screen AR page at `/ar` |
| `.env.local` | Snap credentials (never commit this file) |
