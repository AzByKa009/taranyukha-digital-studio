import { useState, useEffect } from "react";

type Variant = "A" | "B";

interface ABTestResult {
  variant: Variant;
  trackConversion: () => void;
}

const STORAGE_PREFIX = "ab_test_";

export function useABTest(testId: string): ABTestResult {
  const [variant, setVariant] = useState<Variant>("A");

  useEffect(() => {
    const storageKey = `${STORAGE_PREFIX}${testId}`;
    const stored = localStorage.getItem(storageKey);
    
    if (stored === "A" || stored === "B") {
      setVariant(stored);
    } else {
      const newVariant: Variant = Math.random() < 0.5 ? "A" : "B";
      localStorage.setItem(storageKey, newVariant);
      setVariant(newVariant);
    }
  }, [testId]);

  const trackConversion = () => {
    const conversionKey = `${STORAGE_PREFIX}${testId}_conversion`;
    const conversions = JSON.parse(localStorage.getItem(conversionKey) || "{}");
    conversions[variant] = (conversions[variant] || 0) + 1;
    localStorage.setItem(conversionKey, JSON.stringify(conversions));
  };

  return { variant, trackConversion };
}
