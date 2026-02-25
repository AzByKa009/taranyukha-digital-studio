import { useState, useEffect, useCallback } from "react";

interface UseExitIntentOptions {
  delayMs?: number;
}

export function useExitIntent(options: UseExitIntentOptions = {}) {
  const { delayMs = 30000 } = options;
  const [showPopup, setShowPopup] = useState(false);

  const closePopup = useCallback(() => {
    setShowPopup(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [delayMs]);

  return { showPopup, closePopup };
}
