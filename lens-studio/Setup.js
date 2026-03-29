/**
 * Setup.js — One-time Gummi Bear lens setup script
 *
 * HOW TO USE:
 *   1. Make sure you have already:
 *      - Imported GummyBear_V2.fbx into this project
 *      - Added ColorUtils.js, BearConfig.js, BobAnimation.js,
 *        TapJiggle.js, CandySparkles.js to Resources (via + → Script)
 *   2. Add THIS script as a component on any SceneObject (e.g. Camera)
 *   3. Hit Play once
 *   4. Check the Logger panel — it will print step-by-step what it did
 *   5. Remove this script component when done (it only needs to run once)
 *
 * What it does automatically:
 *   - Finds the bear root object (looks for the FBX import root)
 *   - Renames it to BearRoot
 *   - Finds the Mesh child, renames it if needed
 *   - Creates SparkleEmitter child with a Particles component
 *   - Adds BearConfig, BobAnimation, TapJiggle, CandySparkles scripts
 *   - Wires all script inputs together
 */

var startEvent = script.createEvent("OnStartEvent");
startEvent.bind(function () {

  print("=== Gummi Bear Setup Starting ===");

  // ─── Step 1: Find the bear root ─────────────────────────────────────────────
  // The FBX import creates a root SceneObject — find it by looking for one
  // that has a child named "Mesh" (the FBX mesh object name from GummyBear_V2.fbx)

  var bearRoot = null;
  var meshObject = null;

  var rootCount = global.scene.getRootObjectsCount();
  for (var i = 0; i < rootCount; i++) {
    var rootObj = global.scene.getRootObject(i);
    var result = findMeshChild(rootObj);
    if (result) {
      bearRoot = result.parent;
      meshObject = result.mesh;
      break;
    }
  }

  if (!bearRoot) {
    print("ERROR: Could not find the bear mesh. Make sure GummyBear_V2.fbx is imported and has a child named 'Mesh'.");
    print("Root objects in scene:");
    for (var j = 0; j < rootCount; j++) {
      print("  - " + global.scene.getRootObject(j).name);
    }
    return;
  }

  print("Found bear root: " + bearRoot.name);
  print("Found mesh: " + meshObject.name);

  // Rename to expected names
  bearRoot.name = "BearRoot";
  meshObject.name = "Mesh";
  print("Renamed root to 'BearRoot', mesh to 'Mesh'");

  // ─── Step 2: Create SparkleEmitter child ────────────────────────────────────

  var sparkleEmitter = global.scene.createSceneObject("SparkleEmitter");
  sparkleEmitter.setParent(bearRoot);
  // Position it at the center of the bear
  var sparkleTransform = sparkleEmitter.getTransform();
  sparkleTransform.setLocalPosition(new vec3(0, 0, 0));

  // Add a VFX/Particles component
  // In LS 5.x the component type name is "Component.VFXComponent" or "Component.ParticleSystem"
  var particlesComp = null;
  try {
    particlesComp = sparkleEmitter.createComponent("Component.VFXComponent");
    print("Created VFXComponent on SparkleEmitter");
  } catch(e) {
    try {
      particlesComp = sparkleEmitter.createComponent("Component.ParticleSystem");
      print("Created ParticleSystem on SparkleEmitter");
    } catch(e2) {
      print("WARNING: Could not create particle component (" + e2 + "). You will need to add one manually to SparkleEmitter.");
    }
  }

  // ─── Step 3: Load scripts from Resources ────────────────────────────────────

  var bearConfigAsset   = safeRequireAsset("BearConfig");
  var bobAnimAsset      = safeRequireAsset("BobAnimation");
  var tapJiggleAsset    = safeRequireAsset("TapJiggle");
  var candySparklesAsset= safeRequireAsset("CandySparkles");

  // ─── Step 4: Add BearConfig to BearRoot ─────────────────────────────────────

  var bearConfigComp = null;
  if (bearConfigAsset) {
    bearConfigComp = bearRoot.createComponent("Component.ScriptComponent");
    bearConfigComp.scriptAsset = bearConfigAsset;
    // Wire inputs: bearBody → meshObject
    // Script inputs are accessed via the component after the script loads
    // They are set via direct property assignment matching the @input names
    safeSetInput(bearConfigComp, "bearBody", meshObject);
    print("Added BearConfig to BearRoot, wired bearBody → Mesh");
  } else {
    print("WARNING: BearConfig script not found in Resources. Add it manually.");
  }

  // ─── Step 5: Add BobAnimation to BearRoot ───────────────────────────────────

  var bobAnimComp = null;
  if (bobAnimAsset) {
    bobAnimComp = bearRoot.createComponent("Component.ScriptComponent");
    bobAnimComp.scriptAsset = bobAnimAsset;
    print("Added BobAnimation to BearRoot");
  } else {
    print("WARNING: BobAnimation script not found in Resources.");
  }

  // ─── Step 6: Add CandySparkles to SparkleEmitter ────────────────────────────

  var candySparklesComp = null;
  if (candySparklesAsset) {
    candySparklesComp = sparkleEmitter.createComponent("Component.ScriptComponent");
    candySparklesComp.scriptAsset = candySparklesAsset;
    if (particlesComp) {
      safeSetInput(candySparklesComp, "particles", particlesComp);
      print("Added CandySparkles to SparkleEmitter, wired particles component");
    }
  } else {
    print("WARNING: CandySparkles script not found in Resources.");
  }

  // ─── Step 7: Add TapJiggle to BearRoot ──────────────────────────────────────

  var tapJiggleComp = null;
  if (tapJiggleAsset) {
    tapJiggleComp = bearRoot.createComponent("Component.ScriptComponent");
    tapJiggleComp.scriptAsset = tapJiggleAsset;
    if (candySparklesComp) {
      safeSetInput(tapJiggleComp, "sparklesScript", candySparklesComp);
      print("Added TapJiggle to BearRoot, wired sparklesScript → CandySparkles");
    }
  } else {
    print("WARNING: TapJiggle script not found in Resources.");
  }

  // ─── Done ────────────────────────────────────────────────────────────────────

  print("");
  print("=== Setup Complete ===");
  print("Scene hierarchy:");
  print("  BearRoot");
  print("    ├── Mesh  (bear body)");
  print("    └── SparkleEmitter  (particles)");
  print("");
  print("Scripts on BearRoot: BearConfig, BobAnimation, TapJiggle");
  print("Scripts on SparkleEmitter: CandySparkles");
  print("");
  print("Next steps:");
  print("  1. In Inspector, verify BearConfig's 'bearBody' input shows 'Mesh'");
  print("  2. Hit Stop, then Play again to test the bob animation");
  print("  3. Remove this Setup script component when satisfied");
  print("  4. Publish the lens and copy the Lens ID + Group ID to .env.local");

});

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Recursively search for a child named "Mesh" (or "mesh" or "GummyBear").
 * Returns { parent, mesh } or null.
 */
function findMeshChild(obj) {
  var childCount = obj.getChildrenCount();
  for (var i = 0; i < childCount; i++) {
    var child = obj.getChild(i);
    var name = child.name.toLowerCase();
    if (name === "mesh" || name === "mesh1" || name.indexOf("gummy") !== -1 || name.indexOf("bear") !== -1) {
      return { parent: obj, mesh: child };
    }
    // Check if this obj itself has a RenderMeshVisual (it might be the mesh object)
    var rmv = child.getComponent("Component.RenderMeshVisual");
    if (rmv) {
      return { parent: obj, mesh: child };
    }
    // Recurse one level deeper
    var deeper = findMeshChild(child);
    if (deeper) return deeper;
  }
  return null;
}

/**
 * Try requireAsset by name, return null with a warning if not found.
 */
function safeRequireAsset(name) {
  try {
    var asset = requireAsset(name);
    if (asset) {
      print("Loaded script asset: " + name);
      return asset;
    }
  } catch(e) {
    // not found
  }
  print("WARNING: Could not find script asset '" + name + "' in Resources.");
  print("  → Resources panel → + → Script → name it '" + name + "' → paste from lens-studio/" + name + ".js");
  return null;
}

/**
 * Safely set a script input property by name.
 * In LS 5.x script inputs are accessible as direct properties after the script loads.
 */
function safeSetInput(scriptComp, inputName, value) {
  try {
    scriptComp[inputName] = value;
  } catch(e) {
    print("WARNING: Could not set input '" + inputName + "': " + e);
  }
}
