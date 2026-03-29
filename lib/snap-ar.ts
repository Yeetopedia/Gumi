/**
 * Snap AR utilities for Gummi
 *
 * Integration layers (in order of complexity):
 *   1. Lens Deep Link  — opens Snapchat directly, no config passthrough
 *   2. Creative Kit    — opens Snapchat with bear config as launchData (recommended)
 *   3. Camera Kit      — embeds AR live in the browser via WebAssembly
 *
 * ─── SETUP REQUIRED ──────────────────────────────────────────────────────────
 * Before any of this works you need credentials from Snap:
 *   1. developers.snap.com → create org + app
 *   2. my-lenses.snapchat.com → publish your lens → get LENS_ID + GROUP_ID
 *   3. Snap Kit Portal → register Camera Kit app → get API_TOKEN (staging works immediately)
 *   4. Put credentials in .env.local (see .env.local.example)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { GummiBearConfig } from "@/types/gummi-bear";
import { GUMI_BEAR_ITEMS } from "./gummi-bear-items";

// ─── ENV-BACKED CONSTANTS ────────────────────────────────────────────────────

export const SNAP_LENS_ID =
  process.env.NEXT_PUBLIC_SNAP_LENS_ID ?? "";

export const SNAP_LENS_GROUP_ID =
  process.env.NEXT_PUBLIC_SNAP_LENS_GROUP_ID ?? "";

export const SNAP_API_TOKEN =
  process.env.NEXT_PUBLIC_SNAP_API_TOKEN ?? "";

/** Whether the Snap AR integration is configured (env vars present). */
export function isSnapConfigured(): boolean {
  return !!(SNAP_LENS_ID && SNAP_LENS_GROUP_ID && SNAP_API_TOKEN);
}

// ─── LAUNCH DATA ─────────────────────────────────────────────────────────────

export type SnapBearLaunchData = {
  /** Hue shift 0-360 matching Gummi's canvas hue-shift engine */
  bear_hue: string;
  /** Item IDs — empty string means "none equipped" */
  clothing: string;
  accessory: string;
  headwear: string;
  /** Human-readable color name for display in lens (e.g. "Emerald") */
  color_name: string;
};

/**
 * Build the launchData object sent to the Snap lens.
 * The lens reads these via global.launchParams in Lens Studio.
 * All values are strings (Snap's launchData only supports string values).
 */
export function buildSnapLaunchData(config: GummiBearConfig): SnapBearLaunchData {
  const colorItem = GUMI_BEAR_ITEMS.find(
    (i) => i.category === "color" && i.hue === config.hue
  );
  return {
    bear_hue: String(config.hue),
    clothing: config.clothing ?? "",
    accessory: config.accessory ?? "",
    headwear: config.headwear ?? "",
    color_name: colorItem?.name ?? "Cherry",
  };
}

// ─── DEEP LINK ───────────────────────────────────────────────────────────────

/**
 * Returns the Snapchat Lens Link URL for this lens.
 * Works on mobile (opens Snapchat) and desktop (shows Snapcode to scan).
 * NOTE: Cannot pass bear config via deep link. Opens lens with defaults.
 */
export function buildLensDeepLink(): string {
  if (!SNAP_LENS_ID) return "https://www.snapchat.com";
  return `https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=${SNAP_LENS_ID}&metadata=01`;
}

// ─── CREATIVE KIT ────────────────────────────────────────────────────────────

/**
 * Open Snapchat with the Gummi AR lens pre-applied AND the user's bear config
 * loaded via launchData. Uses Creative Kit JS SDK.
 *
 * Requirements:
 *   - Add Creative Kit app in Snap Kit Portal → get CLIENT_ID
 *   - NEXT_PUBLIC_SNAP_CREATIVE_CLIENT_ID in .env.local
 *   - The Creative Kit <script> tag is already loaded (see SnapARButton)
 *
 * The lens reads the config via:
 *   var hue = parseInt(global.launchParams.getString("bear_hue"));
 *   var clothing = global.launchParams.getString("clothing");
 *   etc.
 */
export function shareToSnapWithBear(config: GummiBearConfig): Promise<void> {
  return new Promise((resolve, reject) => {
    const win = window as Window & {
      snap?: {
        creativekit?: {
          shareLens: (opts: {
            lensUUID: string;
            launchData?: Record<string, string>;
          }) => void;
        };
      };
    };

    if (!win.snap?.creativekit?.shareLens) {
      reject(new Error("Creative Kit SDK not loaded"));
      return;
    }
    if (!SNAP_LENS_ID) {
      reject(new Error("SNAP_LENS_ID not configured"));
      return;
    }

    try {
      win.snap.creativekit.shareLens({
        lensUUID: SNAP_LENS_ID,
        launchData: buildSnapLaunchData(config),
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}

// ─── CAMERA KIT (in-browser) ─────────────────────────────────────────────────

/**
 * Dynamically import Camera Kit (heavy — ~3MB WASM).
 * Returns the bootstrapCameraKit + helpers needed to start a session.
 * Called lazily so the SDK is not in the initial JS bundle.
 */
export async function loadCameraKit() {
  const mod = await import("@snap/camera-kit");
  return mod;
}

/**
 * Start a full Camera Kit session on the given canvas element.
 * Attaches the user's webcam as the video source, loads the Gummi bear lens,
 * and passes the bear config as LensLaunchData.
 *
 * Returns a cleanup function — call it to stop the session.
 */
export async function startCameraKitSession(
  canvas: HTMLCanvasElement,
  config: GummiBearConfig,
  onError?: (err: Error) => void
): Promise<() => void> {
  const { bootstrapCameraKit, createMediaStreamSource, Transform2D } =
    await loadCameraKit();

  let stream: MediaStream | null = null;

  try {
    const cameraKit = await bootstrapCameraKit({ apiToken: SNAP_API_TOKEN });

    const session = await cameraKit.createSession({ liveRenderTarget: canvas });

    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
      audio: false,
    });

    const source = createMediaStreamSource(stream, {
      transform: Transform2D.MirrorX,
      cameraType: "user",
    });

    await session.setSource(source);

    // Load and apply the Gummi bear lens with the user's config
    const lens = await cameraKit.lensRepository.loadLens(
      SNAP_LENS_ID,
      SNAP_LENS_GROUP_ID
    );

    // LensLaunchData.launchParams is the correct field for arbitrary key-value data
    await session.applyLens(lens, {
      launchParams: buildSnapLaunchData(config),
    });

    await session.play();

    return () => {
      session.pause();
      stream?.getTracks().forEach((t) => t.stop());
    };
  } catch (err) {
    stream?.getTracks().forEach((t) => t.stop());
    onError?.(err instanceof Error ? err : new Error(String(err)));
    return () => {};
  }
}
