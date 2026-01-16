import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://taranukha.dev";

export function useCanonicalUrl() {
  const location = useLocation();

  useEffect(() => {
    const canonicalUrl = `${BASE_URL}${location.pathname}`;
    
    // Update or create canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    
    if (canonicalLink) {
      canonicalLink.href = canonicalUrl;
    } else {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      canonicalLink.href = canonicalUrl;
      document.head.appendChild(canonicalLink);
    }

    // Update OG URL
    let ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement;
    if (ogUrl) {
      ogUrl.content = canonicalUrl;
    }
  }, [location.pathname]);
}
