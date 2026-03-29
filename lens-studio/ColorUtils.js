/**
 * ColorUtils.js — Shared HSV/RGB color math for Gummi Bear lens
 *
 * Attach to any SceneObject as a script component.
 * Other scripts import via: var ColorUtils = require("./ColorUtils");
 *
 * Gummi hue values (0–360) map to these bear colors:
 *   0   → Cherry Red (default, no shift)
 *   30  → Tangerine Orange
 *   60  → Lemon Yellow
 *   120 → Lime Green
 *   180 → Mint Teal
 *   200 → Ocean Blue
 *   260 → Grape Purple
 *   300 → Bubblegum Pink
 *   330 → Watermelon
 */

// @input float hue {"hint":"Hue shift in degrees (0-360)"}

/**
 * Convert RGB (0-1 each) to HSV (H: 0-360, S: 0-1, V: 0-1)
 */
function rgbToHsv(r, g, b) {
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var delta = max - min;

  var h = 0;
  var s = max === 0 ? 0 : delta / max;
  var v = max;

  if (delta !== 0) {
    if (max === r) {
      h = ((g - b) / delta) % 6;
    } else if (max === g) {
      h = (b - r) / delta + 2;
    } else {
      h = (r - g) / delta + 4;
    }
    h = h * 60;
    if (h < 0) h += 360;
  }

  return { h: h, s: s, v: v };
}

/**
 * Convert HSV (H: 0-360, S: 0-1, V: 0-1) to RGB (0-1 each)
 */
function hsvToRgb(h, s, v) {
  if (s === 0) {
    return { r: v, g: v, b: v };
  }

  h = h % 360;
  if (h < 0) h += 360;

  var sector = Math.floor(h / 60);
  var f = h / 60 - sector;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);

  switch (sector) {
    case 0: return { r: v, g: t, b: p };
    case 1: return { r: q, g: v, b: p };
    case 2: return { r: p, g: v, b: t };
    case 3: return { r: p, g: q, b: v };
    case 4: return { r: t, g: p, b: v };
    case 5: return { r: v, g: p, b: q };
    default: return { r: v, g: t, b: p };
  }
}

/**
 * Shift the hue of an RGB color by `shiftDegrees`.
 * r, g, b are in 0-1 range. Returns new { r, g, b }.
 */
function shiftHue(r, g, b, shiftDegrees) {
  var hsv = rgbToHsv(r, g, b);
  hsv.h = (hsv.h + shiftDegrees) % 360;
  if (hsv.h < 0) hsv.h += 360;
  return hsvToRgb(hsv.h, hsv.s, hsv.v);
}

/**
 * Apply a hue shift to a Lens Studio material's base color.
 * `material` — a RenderMeshVisual's mainPass or getMaterial(0).mainPass
 * `originalColor` — vec4 stored before any shift (the "source of truth" red)
 * `hueDegrees`  — final absolute hue shift (0 = no shift = cherry red)
 */
function applyHueToMaterial(material, originalColor, hueDegrees) {
  var shifted = shiftHue(
    originalColor.r,
    originalColor.g,
    originalColor.b,
    hueDegrees
  );
  material.baseColor = new vec4(shifted.r, shifted.g, shifted.b, originalColor.a);
}

/**
 * Linear interpolation between two numbers.
 */
function lerp(a, b, t) {
  return a + (b - a) * t;
}

/**
 * Spring physics step — call each frame.
 * Returns { value, velocity } for the next frame.
 * stiffness: ~100-300  damping: ~10-25
 */
function springStep(current, target, velocity, stiffness, damping, dt) {
  var force = (target - current) * stiffness;
  var dampingForce = velocity * damping;
  var acceleration = force - dampingForce;
  var newVelocity = velocity + acceleration * dt;
  var newValue = current + newVelocity * dt;
  return { value: newValue, velocity: newVelocity };
}

// Lens Studio 5.x uses plain global functions — no module.exports needed.
// Other scripts access these functions directly since they share the same global scope.
// (require() in LS5 does not use CommonJS module.exports)
