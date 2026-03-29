/**
 * BobAnimation.js — Idle float + squish/stretch animation for the Gummi Bear
 *
 * Creates a continuous gentle bobbing motion so the bear feels alive when idle.
 * Also adds a satisfying squish on the landing part of each bob cycle.
 *
 * Behavior:
 *   - Sinusoidal vertical position oscillation (±4 cm over ~1.8 sec)
 *   - Scale squish: slightly wide+short at bottom, slightly tall+narrow at top
 *   - Optional rotation sway: ±3° side-to-side, offset phase from bob
 *
 * Attach to BearRoot (or a child wrapper above the mesh).
 * The transform is modified additively — other scripts can still move the bear.
 *
 * Tuning @inputs are exposed in Inspector so non-coders can tweak feel without
 * editing code.
 */

// @input float bobHeight {"default": 4.0, "hint": "Vertical travel in cm (peak to peak)"}
// @input float bobSpeed  {"default": 1.8, "hint": "Seconds per full bob cycle"}
// @input float swayAngle {"default": 3.0, "hint": "Max side-to-side rotation in degrees"}
// @input float squishAmount {"default": 0.07, "hint": "Max scale squish factor (0 = none)"}
// @input bool  enableSway {"default": true, "hint": "Enable side-to-side rotation sway"}

var ColorUtils = require("./ColorUtils");

// Runtime state
var time = 0;
var basePosition = null;   // set on first frame so we bob RELATIVE to spawn position
var baseScale    = null;

var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(function(eventData) {
  var dt = eventData.getDeltaTime();
  time += dt;

  var transform = script.getSceneObject().getTransform();

  // Capture base state once
  if (!basePosition) {
    basePosition = transform.getLocalPosition();
    baseScale    = transform.getLocalScale();
  }

  // ── Vertical bob ──────────────────────────────────────────────────────
  // sin oscillates -1 to +1; we want 0 at rest and peak at top
  var bobPhase   = (time / script.bobSpeed) * Math.PI * 2;
  var bobOffset  = Math.sin(bobPhase) * (script.bobHeight * 0.5);  // cm

  var newPos = new vec3(
    basePosition.x,
    basePosition.y + bobOffset,
    basePosition.z
  );
  transform.setLocalPosition(newPos);

  // ── Squish / stretch ──────────────────────────────────────────────────
  // At top of bob (sin=1): slightly tall and narrow
  // At bottom (sin=-1):   slightly wide and short
  var sinVal  = Math.sin(bobPhase);
  var scaleY  = 1.0 + sinVal * script.squishAmount;
  var scaleXZ = 1.0 - sinVal * (script.squishAmount * 0.5); // compensate volume

  transform.setLocalScale(new vec3(
    baseScale.x * scaleXZ,
    baseScale.y * scaleY,
    baseScale.z * scaleXZ
  ));

  // ── Side sway rotation ────────────────────────────────────────────────
  if (script.enableSway) {
    // Sway phase is offset by π/2 so it peaks as the bear crosses center going up
    var swayPhase = bobPhase + Math.PI * 0.5;
    var swayDeg   = Math.sin(swayPhase) * script.swayAngle;
    var swayRad   = swayDeg * (Math.PI / 180);

    // Rotate around Z axis (side tilt)
    var currentRot = transform.getLocalRotation();
    var swayQuat   = quat.fromEulerAngles(0, 0, swayRad);
    transform.setLocalRotation(swayQuat);
  }
});
