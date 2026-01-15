(function() {
    /**
     * UTM & GCLID Tracking Script for WhatsApp Buttons
     * Persists marketing data in cookies and appends it to WhatsApp links.
     */

    const TRACKING_PARAMS = ['gclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    const COOKIE_NAME = 'tracking_data';
    const COOKIE_EXPIRY_DAYS = 30;

    /**
     * Utils for handling cookies
     */
    const setCookie = (name, value, days) => {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
    };

    const getCookie = (name) => {
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
     * Parse tracking parameters from URL or Cookie
     */
    const getTrackingData = () => {
        const urlParams = new URLSearchParams(window.location.search);
        let trackingData = {};
        let foundInUrl = false;

        // Try getting from URL
        TRACKING_PARAMS.forEach(param => {
            const value = urlParams.get(param);
            if (value) {
                trackingData[param] = value;
                foundInUrl = true;
            }
        });

        if (foundInUrl) {
            // Save to cookie if found in URL
            const dataString = Object.keys(trackingData)
                .map(key => `${key}=${trackingData[key]}`)
                .join('&');
            setCookie(COOKIE_NAME, dataString, COOKIE_EXPIRY_DAYS);
            return dataString;
        } else {
            // Try getting from Cookie
            return getCookie(COOKIE_NAME);
        }
    };

    /**
     * Update WhatsApp links with tracking suffix
     */
    const updateLinks = (dataString) => {
        if (!dataString) return;

        const suffix = ` [ref:${dataString}]`;
        const buttons = document.querySelectorAll('.btn-whatsapp');

        buttons.forEach(button => {
            let href = button.getAttribute('href');
            if (!href || !href.includes('wa.me')) return;

            try {
                const url = new URL(href);
                let text = url.searchParams.get('text') || '';
                
                // Avoid double appending
                if (!text.includes('[ref:')) {
                    text += suffix;
                    url.searchParams.set('text', text);
                    button.setAttribute('href', url.toString());
                }
            } catch (e) {
                // Fail silently for malformed URLs
                console.error('Tracking Script: Error parsing WhatsApp link', e);
            }
        });
    };

    /**
     * Initialize tracking
     */
    const init = () => {
        const data = getTrackingData();
        if (data) {
            updateLinks(data);
        }
    };

    // Run on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
