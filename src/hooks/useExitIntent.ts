import { useState, useEffect, useCallback } from "react";

interface UseExitIntentOptions {
  threshold?: number;
  delayMs?: number;
  cookieExpireDays?: number;
}

const STORAGE_KEY = "exit_intent_shown";

export function useExitIntent(options: UseExitIntentOptions = {}) {
  const { delayMs = 30000, cookieExpireDays = 7 } = options;
  const [showPopup, setShowPopup] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  const checkCookie = useCallback(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const expiry = parseInt(stored, 10);
      if (Date.now() < expiry) {
        return true;
      }
      localStorage.removeItem(STORAGE_KEY);
    }
    return false;
  }, []);

  const setCookie = useCallback(() => {
    const expiry = Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000;
    localStorage.setItem(STORAGE_KEY, expiry.toString());
  }, [cookieExpireDays]);

  const closePopup = useCallback(() => {
    setShowPopup(false);
    setCookie();
  }, [setCookie]);

  useEffect(() => {
    if (checkCookie()) {
      setHasTriggered(true);
      return;
    }

    // Show popup after timer (works on both desktop and mobile)
    const timer = setTimeout(() => {
      if (!hasTriggered) {
        setShowPopup(true);
        setHasTriggered(true);
      }
    }, delayMs);

    return () => clearTimeout(timer);
  }, [delayMs, hasTriggered, checkCookie]);

  return { showPopup, closePopup };
}
