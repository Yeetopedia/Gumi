/**
 * WorldPlacement.js — Tap to place the Gummi Bear on a real-world surface
 *
 * Uses Lens Studio's DeviceTracking (World AR) + HitTestSession to detect
 * floor/table surfaces and place the bear at the tap location.
 *
 * Flow:
 *   1. On launch: show a "scanning" indicator, request surface detection
 *   2. Once a surface is found: show tap-to-place hint overlay
 *   3. On first tap: move bear to tapped world position, hide hint
 *   4. On subsequent taps: slide bear to new position (smooth lerp)
 *   5. Double-tap: spin 360° celebration
 *
 * Scene hierarchy expected:
 *   WorldTracker         ← DeviceTracking component (World preset)
 *   └── BearRoot         ← This script's SceneObject (set to @input)
 *   ScanningHint         ← 2D "Point camera at flat surface" UI
 *   TapHint              ← 2D "Tap to place your bear" UI
 *
 * Attach to a controller SceneObject (not BearRoot).
 * Set the bearRoot input to BearRoot so we can move it.
 */

// @input SceneObject bearRoot       {"hint": "The BearRoot SceneObject to place"}
// @input SceneObject scanningHint   {"hint": "UI shown while scanning for surfaces"}
// @input SceneObject tapHint        {"hint": "UI shown when surface found, before first tap"}
// @input Component.DeviceTracking worldTracker {"hint": "DeviceTracking component with World preset"}
// @input Component.ScriptComponent tapJiggle   {"hint": "TapJiggle script (optional, for bounce on place)"}
// @input Component.ScriptComponent candySparkles {"hint": "CandySparkles script (optional)"}

// State machine
var STATE_SCANNING    = "scanning";
var STATE_READY       = "ready";
var STATE_PLACED      = "placed";

var currentState      = STATE_SCANNING;
var isPlaced          = false;

// Movement smoothing
var targetPosition    = null;
var lerpSpeed         = 8.0;   // higher = snappier movement to new position

// Double-tap detection
var lastTapTime       = -999;
var DOUBLE_TAP_WINDOW = 0.35;  // seconds

// Celebration spin state
var isCelebrating     = false;
var celebrationAngle  = 0;
var celebrationSpeed  = 720;  // degrees per second

// HitTest session
var hitTestSession    = null;

// ─── Initialization ──────────────────────────────────────────────────────────

var startEvent = script.createEvent("OnStartEvent");
startEvent.bind(function() {
  // Start with scanning hint visible
  setState(STATE_SCANNING);

  // Initialize HitTest for surface detection
  if (global.deviceInfoSystem) {
    try {
      hitTestSession = global.scene.createHitTestSessionOptions
        ? global.scene.createHitTestSession(global.scene.createHitTestSessionOptions())
        : null;
    } catch (e) {
      print("[WorldPlacement] HitTest not available: " + e);
    }
  }

  // The world tracker will fire OnStartEvent when it locks onto a surface
  // We poll tracking state in UpdateEvent as a fallback
});

// ─── State management ────────────────────────────────────────────────────────

function setState(newState) {
  currentState = newState;

  if (script.scanningHint) {
    script.scanningHint.enabled = (newState === STATE_SCANNING);
  }
  if (script.tapHint) {
    script.tapHint.enabled = (newState === STATE_READY);
  }
  if (script.bearRoot) {
    // Bear is visible once placed (or in ready state so user can see preview)
    script.bearRoot.enabled = (newState !== STATE_SCANNING);
  }

  print("[WorldPlacement] State → " + newState);
}

// ─── Touch handling ───────────────────────────────────────────────────────────

var touchEvent = script.createEvent("TouchStartEvent");
touchEvent.bind(function(eventData) {
  var pos2D = eventData.getTouchPosition();

  // ── Double-tap detection ──────────────────────────────────────────────
  var now = getTime();
  var isDoubleTap = (now - lastTapTime) < DOUBLE_TAP_WINDOW;
  lastTapTime = now;

  if (isDoubleTap && currentState === STATE_PLACED) {
    triggerCelebration();
    return;
  }

  // ── Surface hit test ──────────────────────────────────────────────────
  if (hitTestSession) {
    hitTestSession.hitTest(pos2D, function(results) {
      if (results && results.length > 0) {
        var hit = results[0];
        placeBearAt(hit.position, hit.rotation);
      }
    });
  } else {
    // Fallback: if no hit test, just use a fixed distance in front of camera
    placeBearAtScreenPosition(pos2D);
  }
});

// ─── Bear placement ───────────────────────────────────────────────────────────

function placeBearAt(worldPosition, worldRotation) {
  if (!script.bearRoot) return;

  targetPosition = worldPosition;

  if (currentState !== STATE_PLACED) {
    // First placement: snap immediately + bounce
    script.bearRoot.getTransform().setWorldPosition(worldPosition);

    if (worldRotation) {
      // Align bear to surface normal (keep upright, just yaw to match surface)
      var euler = worldRotation.toEulerAngles();
      script.bearRoot.getTransform().setWorldRotation(
        quat.fromEulerAngles(0, euler.y, 0)
      );
    }

    setState(STATE_PLACED);
    isPlaced = true;

    // Bounce and sparkle on first place
    if (script.tapJiggle && script.tapJiggle.api) {
      script.tapJiggle.api.jiggle(0.3);
    }
    if (script.candySparkles && script.candySparkles.api) {
      script.candySparkles.api.burst();
    }
  }
  // Subsequent taps: targetPosition is set, UpdateEvent will lerp to it
}

function placeBearAtScreenPosition(pos2D) {
  // Fallback placement 80cm in front of camera on floor plane
  var camera = global.scene.getCameraByIndex(0);
  if (!camera || !script.bearRoot) return;

  var camTransform = camera.getSceneObject().getTransform();
  var forward = camTransform.forward;
  var camPos  = camTransform.getWorldPosition();

  var placeDist = 80; // cm
  var placePos  = new vec3(
    camPos.x + forward.x * placeDist,
    0,  // floor level
    camPos.z + forward.z * placeDist
  );

  targetPosition = placePos;
  setState(STATE_PLACED);
  isPlaced = true;

  if (script.candySparkles && script.candySparkles.api) {
    script.candySparkles.api.burst();
  }
}

// ─── Celebration spin ────────────────────────────────────────────────────────

function triggerCelebration() {
  if (isCelebrating) return;
  isCelebrating    = true;
  celebrationAngle = 0;

  if (script.candySparkles && script.candySparkles.api) {
    script.candySparkles.api.bigBurst();
  }
  print("[WorldPlacement] Celebration spin!");
}

// ─── Update: smooth movement + celebration spin ───────────────────────────────

var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(function(eventData) {
  var dt = eventData.getDeltaTime();

  // ── Check if world tracking acquired a surface ────────────────────────
  if (currentState === STATE_SCANNING && script.worldTracker) {
    if (script.worldTracker.isTracking && script.worldTracker.isTracking()) {
      setState(STATE_READY);
    }
  }

  if (!script.bearRoot || !isPlaced) return;

  var transform = script.bearRoot.getTransform();

  // ── Smooth slide to new tap position ─────────────────────────────────
  if (targetPosition) {
    var current = transform.getWorldPosition();
    var next    = vec3.lerp(current, targetPosition, Math.min(lerpSpeed * dt, 1));
    transform.setWorldPosition(next);

    // Stop lerping when close enough
    if (vec3.distance(next, targetPosition) < 0.5) {
      targetPosition = null;
    }
  }

  // ── Celebration 360° spin ─────────────────────────────────────────────
  if (isCelebrating) {
    celebrationAngle += celebrationSpeed * dt;
    var spinRad = (celebrationAngle % 360) * (Math.PI / 180);
    transform.setLocalRotation(quat.fromEulerAngles(0, spinRad, 0));

    if (celebrationAngle >= 360) {
      isCelebrating = false;
      // Snap back to 0 rotation
      transform.setLocalRotation(quat.fromEulerAngles(0, 0, 0));
    }
  }
});
