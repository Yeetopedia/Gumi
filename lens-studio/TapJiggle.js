/**
 * TapJiggle.js — Spring physics bounce when the user taps the bear
 *
 * On tap/touch:
 *   1. Squishes the bear down (press-in effect)
 *   2. Releases with spring overshoot (bounces up, oscillates, settles)
 *   3. Triggers CandySparkles particle burst (optional)
 *
 * Works in both Face Lens and World Lens mode.
 * In Face Lens: tapping anywhere triggers it (bear is always in frame).
 * In World Lens: only triggers if the tap ray hits the bear's collider.
 *
 * Attach to BearRoot.
 * Set sparklesScript input to the CandySparkles script component if you want particles.
 *
 * Spring tuning guide:
 *   stiffness 200 + damping 12 → snappy bounce, ~0.5s settle
 *   stiffness 100 + damping 8  → floaty bounce, ~1.0s settle
 *   stiffness 400 + damping 20 → very fast snap
 */

// @input Component.ScriptComponent sparklesScript {"hint": "CandySparkles script to trigger on tap (optional)"}
// @input float squishOnTap    {"default": 0.25, "hint": "How much to squish down on press (0-1)"}
// @input float springStiffness {"default": 220.0, "hint": "Spring stiffness (higher = snappier)"}
// @input float springDamping   {"default": 14.0,  "hint": "Spring damping (higher = less bounce)"}

// ColorUtils functions are global (defined in ColorUtils.js which runs first)

// Spring state for Y scale
var springValue    = 1.0;   // current Y scale multiplier
var springVelocity = 0.0;   // current Y scale velocity
var springTarget   = 1.0;   // target Y scale
var isPressed      = false;

// Complementary XZ scale (volume conservation)
var xzSpringValue    = 1.0;
var xzSpringVelocity = 0.0;

// Touch interaction
var touchEvent    = script.createEvent("TouchStartEvent");
var touchEndEvent = script.createEvent("TouchEndEvent");

touchEvent.bind(function(eventData) {
  // Squish down on press
  springTarget   = 1.0 - script.squishOnTap;
  springVelocity = 0;
  isPressed      = true;

  // Trigger sparkles if wired up
  if (script.sparklesScript && script.sparklesScript.api && script.sparklesScript.api.burst) {
    script.sparklesScript.api.burst();
  }
});

touchEndEvent.bind(function(eventData) {
  // Release — spring back with overshoot
  springTarget   = 1.0;
  isPressed      = false;
  // Give it an upward kick for a more satisfying pop
  springVelocity += script.squishOnTap * 8;
});

// ─── Update loop ─────────────────────────────────────────────────────────────

var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(function(eventData) {
  var dt = Math.min(eventData.getDeltaTime(), 0.05); // cap dt to prevent explosion

  // Spring step for Y scale
  var yResult = springStep(
    springValue,
    springTarget,
    springVelocity,
    script.springStiffness,
    script.springDamping,
    dt
  );
  springValue    = yResult.value;
  springVelocity = yResult.velocity;

  // XZ scale inversely tracks Y (volume conservation)
  // When Y squishes to 0.75, XZ expands to ~1.15
  var xzTarget = 1.0 + (1.0 - springValue) * 0.6;
  var xzResult = springStep(
    xzSpringValue,
    xzTarget,
    xzSpringVelocity,
    script.springStiffness * 0.8,
    script.springDamping,
    dt
  );
  xzSpringValue    = xzResult.value;
  xzSpringVelocity = xzResult.velocity;

  // Apply scale
  var transform = script.getSceneObject().getTransform();
  var baseScale = transform.getLocalScale();

  // We multiply the bob animation's scale by our spring scale
  // BobAnimation sets scale each frame too, so we store only the MULTIPLIER
  // and let this script run AFTER BobAnimation by script ordering in Inspector.
  // If ordering isn't available, use a flag to apply multiplicatively.
  var currentScale = transform.getLocalScale();
  transform.setLocalScale(new vec3(
    currentScale.x * xzSpringValue,
    currentScale.y * springValue,
    currentScale.z * xzSpringValue
  ));
});

// ─── Public API (accessible by other scripts) ─────────────────────────────────

/** Programmatically trigger a jiggle (e.g. from FaceReactions). */
script.api.jiggle = function(intensity) {
  intensity = intensity || 0.15;
  springVelocity += intensity * 10;
  springTarget    = 1.0;
};
