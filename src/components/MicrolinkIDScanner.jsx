import { useCallback, useEffect, useRef, useState } from "react";
import { createBlinkId } from "@microblink/blinkid";

// Hook: useBlinkIdScanner
// Encapsulates BlinkID setup, mounting to a container node via ref,
// result/error callbacks, and cleanup on unmount.
export default function useBlinkIdScanner(options = {}) {
  const containerRef = useRef(null);
  const [blinkid, setBlinkid] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const {
    licenseKey = import.meta.env.VITE_LICENSE_KEY,
    // Serve resources from your app's public folder (vite moves them to /public/resources)
    cameraManagerUiOptions,
    feedbackUiOptions,
    scanningSettings,
    scanningMode,
    microblinkProxyUrl,
    wasmVariant,
    useLightweightBuild,
    userId,
    onResult,
    onError,
  } = options;

  const initialize = useCallback(async () => {
    if (blinkid) return blinkid;

    const instance = await createBlinkId({
      licenseKey,
      cameraManagerUiOptions,
      feedbackUiOptions,
      microblinkProxyUrl,
      wasmVariant,
      useLightweightBuild,
      userId,
      targetNode: containerRef.current ?? undefined,
      scanningMode,

      scanningSettings: {
        returnInputImages: true,
        scanCroppedDocumentImage: true,
        croppedImageSettings: {
          returnDocumentImage: true,
          returnFaceImage: true,
          returnSignatureImage: true,
        },
      },
    });



    if (typeof onResult === "function") {
      instance.addOnResultCallback(onResult);
    }

    if (typeof onError === "function") {
      instance.addOnErrorCallback(onError);
    }

    setBlinkid(instance);
    setIsReady(true);
    return instance;
  }, [
    blinkid,
    licenseKey,
    cameraManagerUiOptions,
    feedbackUiOptions,
    scanningSettings,
    scanningMode,
    microblinkProxyUrl,
    wasmVariant,
    useLightweightBuild,
    userId,
    onResult,
    onError,
  ]);

  const destroy = useCallback(async () => {
    if (!blinkid) return;
    try {
      await blinkid.destroy();
    } finally {
      setBlinkid(null);
      setIsReady(false);
    }
  }, [blinkid]);

  const toggle = useCallback(async () => {
    if (isReady) {
      await destroy();
    } else {
      await initialize();
    }
  }, [isReady, initialize, destroy]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (blinkid) {
        void blinkid.destroy();
      }
    };
  }, [blinkid]);

  return {
    containerRef,
    initialize,
    destroy,
    toggle,
    isReady,
    blinkid,
  };
}