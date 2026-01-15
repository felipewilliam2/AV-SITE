
const TRACKING_PARAMS = ['gclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
const COOKIE_NAME = 'tracking_data';
const WHATSAPP_NUMBER = '551152833309';

// Helper to set cookie
const setCookie = (name: string, value: string, days: number) => {
    if (typeof document === 'undefined') return;
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
};

// Helper to get cookie
const getCookie = (name: string): string | null => {
    if (typeof document === 'undefined') return null;
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
};

/**
 * Retrieves tracking reference string (e.g. "utm_source=google&gclid=123")
 * Checks URL parameters first, then falls back to 'tracking_data' cookie.
 * Persists found URL parameters to cookie.
 */
export const getTrackingRef = (): string | null => {
    if (typeof window === 'undefined') return null;

    const urlParams = new URLSearchParams(window.location.search);
    let trackingData: Record<string, string> = {};
    let foundInUrl = false;

    // 1. Try URL parameters first
    TRACKING_PARAMS.forEach(param => {
        const value = urlParams.get(param);
        if (value) {
            trackingData[param] = value;
            foundInUrl = true;
        }
    });

    if (foundInUrl) {
        // Construct string
        const dataString = Object.keys(trackingData)
            .map(key => `${key}=${trackingData[key]}`)
            .join('&');

        // Save to cookie for future persistence (30 days)
        setCookie(COOKIE_NAME, dataString, 30);
        return dataString;
    }

    // 2. Fallback to Cookie
    return getCookie(COOKIE_NAME);
};

/**
 * Generates a WhatsApp URL with the tracking reference appended to the message.
 * @param message The message to be sent to the user.
 * @returns The full WhatsApp URL.
 */
export const getWhatsAppLink = (message: string): string => {
    const ref = getTrackingRef();
    // Ensure we don't double append if message already has a ref (sanity check)
    // Although consumers should pass clean messages.
    let finalMessage = message;

    if (ref && !finalMessage.includes('[ref:')) {
        finalMessage += ` [ref:${ref}]`;
    }

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(finalMessage)}`;
};
