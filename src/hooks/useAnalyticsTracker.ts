import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const VISITOR_ID_KEY = "analytics_visitor_id";
const SESSION_ID_KEY = "analytics_session_id";
const SESSION_TIMEOUT = 30 * 60 * 1000;

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function getVisitorId(): string {
  let id = localStorage.getItem(VISITOR_ID_KEY);
  if (!id) {
    id = generateId();
    localStorage.setItem(VISITOR_ID_KEY, id);
  }
  return id;
}

function getSessionId(): string {
  const stored = sessionStorage.getItem(SESSION_ID_KEY);
  const lastActivity = sessionStorage.getItem("analytics_last_activity");
  const now = Date.now();

  if (stored && lastActivity && now - parseInt(lastActivity) < SESSION_TIMEOUT) {
    sessionStorage.setItem("analytics_last_activity", now.toString());
    return stored;
  }

  const newId = generateId();
  sessionStorage.setItem(SESSION_ID_KEY, newId);
  sessionStorage.setItem("analytics_last_activity", now.toString());
  sessionStorage.setItem("analytics_is_new_session", "true");
  return newId;
}

function detectDevice(): "desktop" | "mobile" | "tablet" {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) return "mobile";
  return "desktop";
}

function detectBrowser(): string {
  const ua = navigator.userAgent;
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("SamsungBrowser")) return "Samsung";
  if (ua.includes("Opera") || ua.includes("OPR")) return "Opera";
  if (ua.includes("Edg")) return "Edge";
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Safari")) return "Safari";
  return "Other";
}

function detectTrafficSource(referrer: string): "direct" | "search" | "social" | "referral" | "internal" {
  if (!referrer) return "direct";
  const ref = referrer.toLowerCase();
  if (ref.includes("google") || ref.includes("bing") || ref.includes("yahoo") || ref.includes("yandex")) return "search";
  if (ref.includes("facebook") || ref.includes("instagram") || ref.includes("twitter") || ref.includes("linkedin") || ref.includes("telegram") || ref.includes("vk.com") || ref.includes("t.me")) return "social";
  if (ref.includes(window.location.hostname)) return "internal";
  return "referral";
}

// Track analytics via edge function (server-side validation + rate limiting)
async function trackAnalytics(action: string, data: Record<string, unknown>) {
  try {
    await supabase.functions.invoke("track-analytics", {
      body: { action, data }
    });
  } catch (error) {
    console.debug("Analytics tracking error:", error);
  }
}

export function useAnalyticsTracker() {
  const location = useLocation();
  const lastPath = useRef<string>("");

  useEffect(() => {
    if (location.pathname.startsWith("/admin")) return;
    if (location.pathname === lastPath.current) return;
    lastPath.current = location.pathname;

    const trackPageView = async () => {
      const visitorId = getVisitorId();
      const sessionId = getSessionId();
      const isNewSession = sessionStorage.getItem("analytics_is_new_session") === "true";
      const referrer = document.referrer;
      const device = detectDevice();
      const browser = detectBrowser();
      const trafficSource = detectTrafficSource(referrer);

      // Track page view via edge function
      await trackAnalytics("page_view", {
        page_path: location.pathname,
        page_title: document.title,
        referrer: referrer || null,
        device_type: device,
        browser: browser,
        session_id: sessionId,
        visitor_id: visitorId,
      });

      if (isNewSession) {
        sessionStorage.removeItem("analytics_is_new_session");
        
        // Create new session via edge function
        await trackAnalytics("session_start", {
          session_id: sessionId,
          visitor_id: visitorId,
          entry_page: location.pathname,
          referrer: referrer || null,
          traffic_source: trafficSource,
          device_type: device,
          browser: browser,
          is_active: true,
        });
      } else {
        // Update existing session via edge function
        await trackAnalytics("session_update", {
          session_id: sessionId,
          exit_page: location.pathname,
        });
      }
    };

    trackPageView();
  }, [location.pathname]);

  useEffect(() => {
    const updateActivity = () => {
      const sessionId = sessionStorage.getItem(SESSION_ID_KEY);
      if (sessionId) {
        sessionStorage.setItem("analytics_last_activity", Date.now().toString());
        trackAnalytics("session_update", {
          session_id: sessionId,
        });
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        const sessionId = sessionStorage.getItem(SESSION_ID_KEY);
        const startTime = sessionStorage.getItem("analytics_session_start");
        if (sessionId && startTime) {
          const duration = Math.floor((Date.now() - parseInt(startTime)) / 1000);
          trackAnalytics("session_update", {
            session_id: sessionId,
            is_active: false,
            duration_seconds: duration,
          });
        }
      } else {
        updateActivity();
      }
    };

    const handleBeforeUnload = () => {
      const sessionId = sessionStorage.getItem(SESSION_ID_KEY);
      const startTime = sessionStorage.getItem("analytics_session_start");
      if (sessionId) {
        const duration = startTime ? Math.floor((Date.now() - parseInt(startTime)) / 1000) : 0;
        // Use sendBeacon for reliable tracking on page unload
        const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/track-analytics`;
        navigator.sendBeacon(
          url,
          JSON.stringify({
            action: "session_update",
            data: { session_id: sessionId, is_active: false, duration_seconds: duration }
          })
        );
      }
    };

    sessionStorage.setItem("analytics_session_start", Date.now().toString());

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    const interval = setInterval(updateActivity, 60000);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      clearInterval(interval);
    };
  }, []);
}
