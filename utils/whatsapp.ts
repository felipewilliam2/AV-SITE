/**
 * WhatsApp Tracking Utility - React Version
 * Captures UTMs, Click IDs (gclid, fbclid, ttclid, wbraid, gbraid), GA4 Client ID and Session ID
 */

const TRACKING_PARAMS = [
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
    'gclid', 'fbclid', 'ttclid', 'wbraid', 'gbraid'
];
const COOKIE_NAME = 'tracking_data';
const WHATSAPP_NUMBER = '551152833309';
const GA4_MEASUREMENT_ID = 'G-QDBT5PM4KP';
// Cookie name for GA4 session (dynamic based on measurement ID suffix)
const GA4_SESSION_COOKIE = '_ga_QDBT5PM4KP';

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
 * Gets the GA4 Client ID from the _ga cookie
 */
const getGA4ClientId = (): string | null => {
    if (typeof document === 'undefined') return null;
    const match = document.cookie.match(/_ga=GA1\.\d+\.(\d+\.\d+)/);
    return match ? match[1] : null;
};

/**
 * Gets the GA4 Session ID from the _ga_QDBT5PM4KP cookie
 * Cookie format: "GS1.1.SESSION_ID.COUNT.ENGAGEMENT.TIMESTAMP.0.0.0"
 * The session_id is the third segment (index 2) after splitting by "."
 */
const getGA4SessionId = (): string | null => {
    if (typeof document === 'undefined') return null;

    const cookieValue = getCookie(GA4_SESSION_COOKIE);
    if (!cookieValue) return null;

    // Split the cookie value by "."
    // Format: GS1.1.1700000000.1.1.1700000000.0.0.0
    const parts = cookieValue.split('.');

    // The session ID is typically at index 2 (third segment)
    // Validate that it looks like a timestamp (10+ digits)
    if (parts.length >= 3) {
        const sessionId = parts[2];
        // Verify it's a valid timestamp-like number (10 digits for Unix timestamp)
        if (/^\d{10,}$/.test(sessionId)) {
            return sessionId;
        }
    }

    return null;
};

/**
 * Retrieves tracking reference string with all parameters
 * Format: "utm_source=google, gclid=123, cid=456.789, sid=1700000000"
 */
export const getTrackingRef = (): string | null => {
    if (typeof window === 'undefined') return null;

    const urlParams = new URLSearchParams(window.location.search);
    const trackingData: Record<string, string> = {};
    let foundInUrl = false;

    // 1. Try URL parameters first
    TRACKING_PARAMS.forEach(param => {
        const value = urlParams.get(param);
        if (value) {
            trackingData[param] = value;
            foundInUrl = true;
        }
    });

    // 2. Add GA4 Client ID
    const cid = getGA4ClientId();
    if (cid) {
        trackingData['cid'] = cid;
    }

    // 3. Add GA4 Session ID
    const sid = getGA4SessionId();
    if (sid) {
        trackingData['sid'] = sid;
    }

    if (foundInUrl || cid || sid) {
        // Construct string with comma separator for readability
        const dataString = Object.keys(trackingData)
            .map(key => `${key}=${trackingData[key]}`)
            .join(', ');

        // Save to cookie for future persistence (30 days)
        setCookie(COOKIE_NAME, dataString, 30);
        return dataString;
    }

    // 4. Fallback to Cookie
    return getCookie(COOKIE_NAME);
};

/**
 * Generates a WhatsApp URL with the tracking reference appended to the message.
 * Uses " || Dados: " separator for better readability.
 * @param message The message to be sent.
 * @returns The full WhatsApp URL.
 */
export const getWhatsAppLink = (message: string): string => {
    const ref = getTrackingRef();
    let finalMessage = message;

    // Remove any old tracking suffixes to avoid duplication
    finalMessage = finalMessage.split(' || Dados:')[0].split(' [ref:')[0].trim();

    if (ref) {
        finalMessage += ` || Dados: ${ref}`;
    }

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(finalMessage)}`;
};

