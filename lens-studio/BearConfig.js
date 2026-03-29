/**
 * BearConfig.js — Gummi Bear 3D Lens Configuration
 *
 * Reads launchParams sent from the Gummi app and applies them to the 3D bear:
 *   - bear_hue   (string "0"-"360")  → hue-shifts the bear's body material
 *   - clothing   (string item ID)    → shows/hides clothing mesh children
 *   - accessory  (string item ID)    → shows/hides accessory mesh children
 *   - headwear   (string item ID)    → shows/hides headwear mesh children
 *   - color_name (string)            → used by UI label if present
 *
 * ─── GummyBear_V2.fbx notes ──────────────────────────────────────────────────
 * The FBX contains:
 *   - Single mesh object named "Mesh" (one-piece body, rigged with "Armature")
 *   - Two materials: "Material" (body) and "Material.001" (eyes/details)
 *   - Base diffuse color: #F90000 (R=0.978, G=0.0, B=0.0) — pure red
 *   - Skeleton: Armature + Bone hierarchy for posing/animation
 *
 * In Lens Studio after import:
 *   - Rename the root SceneObject to "BearRoot"
 *   - The mesh child will be named "Mesh" — set that as the @input bearBody
 *   - "Material" is the one to hue-shift (body color)
 *   - "Material.001" controls eye color — leave it alone or tint separately
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Scene hierarchy expected:
 *   BearRoot
 *   ├── Mesh              ← the imported FBX mesh (RenderMeshVisual, material = "Material")
 *   ├── Clothing
 *   │   ├── Clothing_TShirt
 *   │   ├── Clothing_Hoodie
 *   │   ├── Clothing_Dress
 *   │   ├── Clothing_Blazer
 *   │   ├── Clothing_Overalls
 *   │   ├── Clothing_Sweater
 *   │   ├── Clothing_Tuxedo
 *   │   └── Clothing_Cape
 *   ├── Accessories
 *   │   ├── Acc_Glasses
 *   │   ├── Acc_Sunglasses
 *   │   ├── Acc_Scarf
 *   │   ├── Acc_Bowtie
 *   │   ├── Acc_Headphones
 *   │   └── Acc_Wings
 *   └── Headwear
 *       ├── Hat_Beanie
 *       ├── Hat_Crown
 *       ├── Hat_FlowerCrown
 *       ├── Hat_Beret
 *       ├── Hat_TopHat
 *       ├── Hat_Cap
 *       └── Hat_Halo
 *
 * Attach this script to BearRoot.
 * In the Inspector, bind each @input to the matching SceneObject.
 */

// @input SceneObject bearBody {"hint":"The 'Mesh' SceneObject from GummyBear_V2.fbx import"}
// @input SceneObject clothingRoot {"hint":"Parent of all clothing meshes"}
// @input SceneObject accessoryRoot {"hint":"Parent of all accessory meshes"}
// @input SceneObject headwearRoot {"hint":"Parent of all headwear meshes"}

// ColorUtils functions are global (defined in ColorUtils.js which runs first)

// ─── Item ID → scene child name mapping ──────────────────────────────────────

/** Maps Gummi app item IDs to scene object child names under each root. */
var CLOTHING_MAP = {
  "clothing-tshirt":    "Clothing_TShirt",
  "clothing-hoodie":    "Clothing_Hoodie",
  "clothing-dress":     "Clothing_Dress",
  "clothing-blazer":    "Clothing_Blazer",
  "clothing-overalls":  "Clothing_Overalls",
  "clothing-sweater":   "Clothing_Sweater",
  "clothing-tuxedo":    "Clothing_Tuxedo",
  "clothing-cape":      "Clothing_Cape",
};

var ACCESSORY_MAP = {
  "acc-glasses":     "Acc_Glasses",
  "acc-sunglasses":  "Acc_Sunglasses",
  "acc-scarf":       "Acc_Scarf",
  "acc-bowtie":      "Acc_Bowtie",
  "acc-headphones":  "Acc_Headphones",
  "acc-wings":       "Acc_Wings",
};

var HEADWEAR_MAP = {
  "hat-beanie":   "Hat_Beanie",
  "hat-crown":    "Hat_Crown",
  "hat-flower":   "Hat_FlowerCrown",
  "hat-beret":    "Hat_Beret",
  "hat-tophat":   "Hat_TopHat",
  "hat-cap":      "Hat_Cap",
  "hat-halo":     "Hat_Halo",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Show only the child SceneObject matching `activeChildName`.
 * All other children of `root` are hidden.
 * If `activeChildName` is "" or null, all children are hidden.
 */
function setActiveChild(root, activeChildName) {
  if (!root) return;
  var count = root.getChildrenCount();
  for (var i = 0; i < count; i++) {
    var child = root.getChild(i);
    child.enabled = (activeChildName && child.name === activeChildName);
  }
}

/**
 * Base color extracted from GummyBear_V2.fbx DiffuseColor property.
 * R=0.978, G=0.000, B=0.000 (#F90000) — nearly pure red.
 * All hue shifts are relative to this color.
 */
var BASE_BEAR_COLOR = new vec4(0.978, 0.0, 0.0, 1.0);

// ─── Main configuration function ─────────────────────────────────────────────

function applyBearConfig() {
  // Read launchParams (sent from Gummi app via Camera Kit or Creative Kit)
  var hueStr     = global.launchParams ? global.launchParams.getString("bear_hue")  : "0";
  var clothingId = global.launchParams ? global.launchParams.getString("clothing")   : "";
  var accessoryId= global.launchParams ? global.launchParams.getString("accessory")  : "";
  var headwearId = global.launchParams ? global.launchParams.getString("headwear")   : "";

  var hueDegrees = parseFloat(hueStr) || 0;

  // ── 1. Apply hue shift to bear body material ────────────────────────────
  if (script.bearBody) {
    var meshVisual = script.bearBody.getComponent("Component.RenderMeshVisual");
    if (meshVisual) {
      var mat = meshVisual.getMaterial(0);
      if (mat) {
        applyHueToMaterial(mat.mainPass, BASE_BEAR_COLOR, hueDegrees);
      }
    }
  }

  // ── 2. Toggle outfit layers ─────────────────────────────────────────────
  setActiveChild(script.clothingRoot,  CLOTHING_MAP[clothingId]  || null);
  setActiveChild(script.accessoryRoot, ACCESSORY_MAP[accessoryId] || null);
  setActiveChild(script.headwearRoot,  HEADWEAR_MAP[headwearId]   || null);

  print("[BearConfig] hue=" + hueDegrees + " clothing=" + clothingId +
        " accessory=" + accessoryId + " headwear=" + headwearId);
}

// ─── Entry point ──────────────────────────────────────────────────────────────

var startEvent = script.createEvent("OnStartEvent");
startEvent.bind(function() {
  applyBearConfig();
});
