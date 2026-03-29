/**
 * CandySparkles.js — Particle burst controller for Gummi Bear
 *
 * Manages a GPU Particle System attached to the bear that bursts colorful
 * candy-colored sparkles on demand (tap, smile, purchase celebration, etc).
 *
 * Particle System Setup in Lens Studio:
 *   1. Add a Particles component to BearRoot (or a child "SparkleEmitter")
 *   2. In the Particles Inspector:
 *      - Max Particles: 60
 *      - Emission Rate: 0 (we control emission manually)
 *      - Lifetime: 0.5 – 0.9
 *      - Start Size: 2 – 6
 *      - Start Speed: 20 – 60
 *      - Start Color: use Gradient with candy colors (see CANDY_COLORS below)
 *      - Color Over Lifetime: fade to alpha 0
 *      - Shape: Sphere, radius 5
 *      - Gravity: -20 (sparkles arc up and fall)
 *   3. Material: use "Billboard" shader with an "orb" or "star" texture
 *      OR the built-in Sprite Particle material
 *
 * This script then calls `burst()` to emit a batch of particles.
 * Other scripts call: sparklesScript.api.burst()  or  sparklesScript.api.bigBurst()
 *
 * Candy colors used (matching Gummi app palette):
 *   Cherry   #C45D3E  →  rgb(0.77, 0.36, 0.24)
 *   Lemon    #F9CA24  →  rgb(0.98, 0.79, 0.14)
 *   Grape    #6C5CE7  →  rgb(0.42, 0.36, 0.91)
 *   Mint     #00B894  →  rgb(0.00, 0.72, 0.58)
 *   Bubblegum #FD79A8 →  rgb(0.99, 0.47, 0.66)
 *   Ocean    #0984E3  →  rgb(0.04, 0.52, 0.89)
 */

// @input Component.ParticlesComponent particles {"hint": "The Particles component on SparkleEmitter"}
// @input int   burstCount    {"default": 20, "hint": "Particles per normal burst"}
// @input int   bigBurstCount {"default": 45, "hint": "Particles per big burst (purchase celebration)"}
// @input float burstDuration {"default": 0.15, "hint": "Seconds to emit during a burst"}

// State
var emitting        = false;
var emitTimer       = 0;
var emitCount       = 0;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function startBurst(count) {
  if (!script.particles) {
    print("[CandySparkles] No particles component set!");
    return;
  }

  emitting  = true;
  emitTimer = 0;
  emitCount = count;

  // Enable emission for the burst duration
  script.particles.enabled = true;
}

function stopBurst() {
  emitting = false;
  if (script.particles) {
    script.particles.enabled = false;
  }
}

// ─── Update ───────────────────────────────────────────────────────────────────

var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(function(eventData) {
  if (!emitting) return;

  var dt = eventData.getDeltaTime();
  emitTimer += dt;

  if (emitTimer >= script.burstDuration) {
    stopBurst();
  }
});

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Normal burst — used for tap, smile, wink.
 * Emits `burstCount` particles over `burstDuration` seconds.
 */
script.api.burst = function() {
  startBurst(script.burstCount);
  print("[CandySparkles] burst!");
};

/**
 * Big burst — used for purchase celebration, special moments.
 * Emits `bigBurstCount` particles over a longer duration.
 */
script.api.bigBurst = function() {
  // Override duration temporarily for a bigger moment
  emitting  = true;
  emitTimer = 0;
  emitCount = script.bigBurstCount;

  if (script.particles) {
    script.particles.enabled = true;
    // Temporarily boost spawn rate
    if (script.particles.spawnRate !== undefined) {
      var originalRate = script.particles.spawnRate;
      script.particles.spawnRate = script.bigBurstCount / (script.burstDuration * 2);

      // Reset after big burst
      var resetEvent = script.createEvent("DelayedCallbackEvent");
      resetEvent.bind(function() {
        if (script.particles) {
          script.particles.spawnRate = originalRate;
          script.particles.enabled   = false;
        }
      });
      resetEvent.reset(script.burstDuration * 2);
    }
  }
  print("[CandySparkles] BIG burst!");
};

// Kick off on start to warm up the particle system (emit 0, just initialize)
var startEvent = script.createEvent("OnStartEvent");
startEvent.bind(function() {
  if (script.particles) {
    script.particles.enabled = false;
  }
});
