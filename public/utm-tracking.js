/**
 * UTM & GA4 Client ID Tracking Script for WhatsApp Buttons
 * Captures marketing parameters and GA4 Client ID, then appends them to WhatsApp links.
 */
(function () {
    function initWhatsAppTracking() {
        const BUTTON_CLASS = '.btn-whatsapp'; // Seleciona múltiplos botões se necessário
        const GA4_MEASUREMENT_ID = 'G-QDBT5PM4KP'; // Seu ID do GA4

        const buttons = document.querySelectorAll(BUTTON_CLASS);

        if (buttons.length === 0) {
            // Tenta também pelo ID se a classe não retornar nada
            const mainBtn = document.getElementById('btn-whatsapp');
            if (!mainBtn) return;
        }

        // 1. Capturar Parâmetros da URL
        const urlParams = new URLSearchParams(window.location.search);
        const tracking = {
            utm_source: urlParams.get('utm_source'),
            utm_medium: urlParams.get('utm_medium'),
            utm_campaign: urlParams.get('utm_campaign'),
            utm_term: urlParams.get('utm_term'),
            utm_content: urlParams.get('utm_content'),
            gclid: urlParams.get('gclid'),
            fbclid: urlParams.get('fbclid'),
            ttclid: urlParams.get('ttclid'),
            wbraid: urlParams.get('wbraid'),
            gbraid: urlParams.get('gbraid')
        };

        // 2. Capturar Client ID do GA4
        function getGACid(callback) {
            if (typeof gtag === 'function') {
                gtag('get', GA4_MEASUREMENT_ID, 'client_id', (cid) => {
                    callback(cid || getCookieCid());
                });
            } else {
                callback(getCookieCid());
            }
        }

        function getCookieCid() {
            const match = document.cookie.match(/_ga=GA1\.\d+\.(\d+\.\d+)/);
            return match ? match[1] : null;
        }

        // 3. Atualizar os Botões
        getGACid((cid) => {
            if (cid) tracking.cid = cid;

            const dataString = Object.entries(tracking)
                .filter(([_, value]) => value !== null && value !== '')
                .map(([key, value]) => key + "=" + value)
                .join(', ');

            if (!dataString) return;

            const allButtons = document.querySelectorAll(BUTTON_CLASS + ', #btn-whatsapp');
            allButtons.forEach(btn => {
                let currentHref = btn.getAttribute('href');
                if (!currentHref) return;

                try {
                    // Normalização do Link
                    let cleanHref = currentHref;
                    if (cleanHref.includes('wa.me/')) {
                        cleanHref = 'https://' + cleanHref.replace(/^https?:\/\//, '');
                    }

                    const url = new URL(cleanHref);
                    let text = url.searchParams.get('text') || '';

                    if (!text.includes('|| Dados:')) {
                        const separator = text.length > 0 ? " || Dados: " : "Dados: ";
                        text += separator + dataString;
                        url.searchParams.set('text', text);
                        btn.setAttribute('href', url.toString());
                    }
                } catch (e) {
                    console.error("Tracking: Erro ao processar link", e);
                }
            });
        });
    }

    // Inicialização
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(initWhatsAppTracking, 1500));
    } else {
        setTimeout(initWhatsAppTracking, 1500);
    }
})();

