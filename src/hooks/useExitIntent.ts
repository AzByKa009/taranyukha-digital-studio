import { useState, useEffect, useCallback } from "react";

interface UseExitIntentOptions {
  threshold?: number;
  delayMs?: number;
  cookieExpireDays?: number;
}

const STORAGE_KEY = "exit_intent_shown";

export function useExitIntent(options: UseExitIntentOptions = {}) {
  const { threshold = 10, delayMs = 5000, cookieExpireDays = 7 } = options;
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

    const timer = setTimeout(() => {
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= threshold && !hasTriggered) {
          setShowPopup(true);
          setHasTriggered(true);
          document.removeEventListener("mouseleave", handleMouseLeave);
        }
      };

      document.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        document.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, delayMs);

    return () => clearTimeout(timer);
  }, [threshold, delayMs, hasTriggered, checkCookie]);

  return { showPopup, closePopup };
}
