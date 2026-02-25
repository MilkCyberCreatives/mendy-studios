export type MarketingEventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    lintrk?: (...args: unknown[]) => void;
    ttq?: { track?: (...args: unknown[]) => void };
    clarity?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params: MarketingEventParams = {}) {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer?.push({ event: name, ...params });
  window.gtag?.("event", name, params);
}

export function trackLead(channel: string, context: string) {
  if (typeof window === "undefined") {
    return;
  }

  const params = {
    channel,
    context,
  };

  trackEvent("generate_lead", params);
  window.fbq?.("track", "Lead", params);
  window.lintrk?.("track", { conversion_id: 1 });
  window.ttq?.track?.("Contact", params);
}

export function captureAttributionParams() {
  if (typeof window === "undefined") {
    return;
  }

  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid", "msclkid"];
  const search = new URLSearchParams(window.location.search);
  const payload: Record<string, string> = {};

  keys.forEach((key) => {
    const value = search.get(key);
    if (value) {
      payload[key] = value;
    }
  });

  if (Object.keys(payload).length > 0) {
    window.localStorage.setItem("mendy_attribution", JSON.stringify(payload));
  }
}
