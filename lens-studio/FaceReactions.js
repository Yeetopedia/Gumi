/**
 * FaceReactions.js — Bear reacts to the user's face expressions
 *
 * Uses Lens Studio's FaceTracking component to detect:
 *   - Smile         → candy sparkles burst + gentle spin
 *   - Mouth open    → bear bounces excitedly (big jiggle)
 *   - Eyes closed   → bear tilts head and "winks" (rotation + sparkle)
 *   - Eyebrows up   → bear scales up slightly ("surprised!")
 *
 * Requires:
 *   - A FaceTracking component on any SceneObject in the scene
 *   - Script inputs wired to TapJiggle and CandySparkles components
 *   - BearRoot transform accessible via script.getSceneObject()
 *
 * Thresholds are tunable in Inspector so you can dial in sensitivity.
 *
 * Attach to BearRoot (same object as TapJiggle and BobAnimation).
 *
 * IMPORTANT: FaceTracking only works in Face Lens mode.
 * For World Lens mode, remove this script entirely.
 */

// @input Component.FaceTrackingComponent faceTracking {"hint": "FaceTracking component in scene"}
// @input Component.ScriptComponent tapJiggle   {"hint": "TapJiggle script for bounce reactions"}
// @input Component.ScriptComponent candySparkles {"hint": "CandySparkles script for particle bursts"}

// Thresholds — tweak in Inspector
// @input float smileThreshold      {"default": 0.7,  "hint": "Smile weight to trigger sparkles (0-1)"}
// @input float mouthOpenThreshold  {"default": 0.6,  "hint": "Mouth open weight to trigger bounce (0-1)"}
// @input float eyeClosedThreshold  {"default": 0.8,  "hint": "Eye closed weight to trigger wink (0-1)"}
// @input float browRaisedThreshold {"default": 0.7,  "hint": "Eyebrow raise weight to trigger surprise (0-1)"}
// @input float cooldownSeconds     {"default": 1.5,  "hint": "Minimum seconds between same reaction"}

// ─── State ────────────────────────────────────────────────────────────────────

var cooldowns = {
  smile:     0,
  mouthOpen: 0,
  eyeClosed: 0,
  browRaise: 0,
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function triggerSparkles() {
  if (script.candySparkles && script.candySparkles.api && script.candySparkles.api.burst) {
    script.candySparkles.api.burst();
  }
}

function triggerBounce(intensity) {
  if (script.tapJiggle && script.tapJiggle.api && script.tapJiggle.api.jiggle) {
    script.tapJiggle.api.jiggle(intensity || 0.2);
  }
}

function triggerWink() {
  // Tilt the bear slightly to the right for a wink effect
  var transform = script.getSceneObject().getTransform();
  var tiltRad   = 15 * (Math.PI / 180);
  // Animate via a quick lerp — we set a target tilt and let UpdateEvent resolve it
  winkTiltTarget   = tiltRad;
  winkTiltReturned = false;
  triggerSparkles();
}

// Wink tilt animation state
var winkTiltCurrent  = 0;
var winkTiltTarget   = 0;
var winkTiltReturned = true;
var winkReturnTimer  = 0;

// ─── Update loop ─────────────────────────────────────────────────────────────

var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(function(eventData) {
  var dt = eventData.getDeltaTime();

  // Cool down all timers
  for (var key in cooldowns) {
    if (cooldowns[key] > 0) cooldowns[key] -= dt;
  }

  // ── Get face data ──────────────────────────────────────────────────────
  if (!script.faceTracking || !script.faceTracking.isTracking()) return;

  var ft = script.faceTracking;

  // Blend shapes give us 0-1 weights for each expression
  var smileLeft    = ft.blendShapes ? ft.blendShapes.mouthSmileLeft  || 0 : 0;
  var smileRight   = ft.blendShapes ? ft.blendShapes.mouthSmileRight || 0 : 0;
  var smile        = (smileLeft + smileRight) * 0.5;

  var jawOpen      = ft.blendShapes ? ft.blendShapes.jawOpen || 0 : 0;

  var eyeClosedL   = ft.blendShapes ? ft.blendShapes.eyeBlinkLeft  || 0 : 0;
  var eyeClosedR   = ft.blendShapes ? ft.blendShapes.eyeBlinkRight || 0 : 0;
  var eyeClosed    = Math.max(eyeClosedL, eyeClosedR);

  var browUpL      = ft.blendShapes ? ft.blendShapes.browOuterUpLeft  || 0 : 0;
  var browUpR      = ft.blendShapes ? ft.blendShapes.browOuterUpRight || 0 : 0;
  var browRaised   = (browUpL + browUpR) * 0.5;

  // ── Smile → sparkles ──────────────────────────────────────────────────
  if (smile >= script.smileThreshold && cooldowns.smile <= 0) {
    cooldowns.smile = script.cooldownSeconds;
    triggerSparkles();
    triggerBounce(0.1); // gentle happy bounce
    print("[FaceReactions] Smile detected → sparkles!");
  }

  // ── Mouth open → big bounce ───────────────────────────────────────────
  if (jawOpen >= script.mouthOpenThreshold && cooldowns.mouthOpen <= 0) {
    cooldowns.mouthOpen = script.cooldownSeconds;
    triggerBounce(0.3);
    print("[FaceReactions] Mouth open → bounce!");
  }

  // ── Eye closed (wink) → tilt + sparkle ───────────────────────────────
  if (eyeClosed >= script.eyeClosedThreshold && cooldowns.eyeClosed <= 0) {
    cooldowns.eyeClosed = script.cooldownSeconds;
    triggerWink();
    print("[FaceReactions] Eye closed → wink!");
  }

  // ── Brow raised (surprised) → scale pop ──────────────────────────────
  if (browRaised >= script.browRaisedThreshold && cooldowns.browRaise <= 0) {
    cooldowns.browRaise = script.cooldownSeconds;
    triggerBounce(0.25);
    triggerSparkles();
    print("[FaceReactions] Brow raised → surprise!");
  }

  // ── Animate wink tilt return ──────────────────────────────────────────
  if (!winkTiltReturned) {
    winkReturnTimer += dt;
    if (winkReturnTimer > 0.4) {
      winkTiltTarget   = 0;
      winkTiltReturned = true;
      winkReturnTimer  = 0;
    }
  }

  if (Math.abs(winkTiltCurrent - winkTiltTarget) > 0.001) {
    winkTiltCurrent += (winkTiltTarget - winkTiltCurrent) * Math.min(dt * 10, 1);
    var transform = script.getSceneObject().getTransform();
    transform.setLocalRotation(quat.fromEulerAngles(0, 0, winkTiltCurrent));
  }
});
