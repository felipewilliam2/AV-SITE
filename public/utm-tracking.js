/**
 * UTM & GA4 Client ID Tracking Script for WhatsApp Buttons
 * Captures marketing parameters and GA4 Client ID, then appends them to WhatsApp links.
 * v2.1 - Mobile-friendly version using manual encoding
 */
(function () {
    const GA4_MEASUREMENT_ID = 'G-QDBT5PM4KP';

    // Captura o Client ID do GA4 de forma robusta
    function getGACid(callback) {
        let done = false;
        const finish = (cid) => { if (!done) { done = true; callback(cid); } };

        const timeout = setTimeout(() => finish(getCookieCid()), 2000);

        if (typeof gtag === 'function') {
            try {
                gtag('get', GA4_MEASUREMENT_ID, 'client_id', (cid) => {
                    clearTimeout(timeout);
                    finish(cid || getCookieCid());
                });
            } catch { clearTimeout(timeout); finish(getCookieCid()); }
        } else {
            clearTimeout(timeout);
            finish(getCookieCid());
        }
    }

    function getCookieCid() {
        const m = document.cookie.match(/_ga=GA1\.\d+\.(\d+\.\d+)/);
        return m ? m[1] : null;
    }

    function initWhatsAppTracking() {
        // 1. Capturar Parâmetros da URL
        const urlParams = new URLSearchParams(window.location.search);
        const params = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid', 'ttclid', 'wbraid', 'gbraid'];
        const tracking = {};
        params.forEach(p => { const v = urlParams.get(p); if (v) tracking[p] = v; });

        // 2. Buscar CID e atualizar links
        getGACid((cid) => {
            if (cid) tracking.cid = cid;

            const dataArr = Object.entries(tracking);
            if (dataArr.length === 0) return;

            const dataSuffix = ' || Dados: ' + dataArr.map(([k, v]) => k + '=' + v).join(', ');

            // Seleciona todos os botões de WhatsApp
            const allButtons = document.querySelectorAll('.btn-whatsapp, #btn-whatsapp, a[href*="wa.me"]');

            allButtons.forEach(btn => {
                const href = btn.getAttribute('href');
                if (!href || !href.includes('wa.me')) return;

                // Evita duplicação
                if (href.includes('Dados:') || href.includes('%7C%7C')) return;

                // Extrai o texto atual manualmente (mais robusto que URL API em mobile)
                const textMatch = href.match(/[?&]text=([^&]*)/);
                let currentText = textMatch ? decodeURIComponent(textMatch[1]) : '';

                // Limpa sufixos antigos se existirem
                currentText = currentText.split(' || Dados:')[0].split(' [ref:')[0];

                // Monta a nova mensagem
                const newText = currentText + dataSuffix;
                const encodedText = encodeURIComponent(newText);

                // Reconstrói o href de forma simples
                let newHref;
                if (textMatch) {
                    // Substitui o text existente
                    newHref = href.replace(/([?&]text=)[^&]*/, '$1' + encodedText);
                } else {
                    // Adiciona o parâmetro text
                    const separator = href.includes('?') ? '&' : '?';
                    newHref = href + separator + 'text=' + encodedText;
                }

                btn.setAttribute('href', newHref);


            }); // End of allButtons.forEach

            // --- NEW EVENT DELEGATION LOGIC ---
            document.body.addEventListener('click', (event) => {
                const target = event.target;
                // Check if the clicked element or any of its parents is a WhatsApp button
                const whatsappButton = target.closest('.btn-whatsapp, #btn-whatsapp, a[href*="wa.me"]');

                if (whatsappButton) {
                    if (typeof window !== 'undefined' && window.dataLayer) {
                        window.dataLayer.push({
                            event: 'whatsapp_cta_click',
                            event_category: 'engagement',
                            event_label: whatsappButton.getAttribute('href') || 'unknown_whatsapp_link',
                            button_text: whatsappButton.innerText || 'WhatsApp Button',
                            page_location: window.location.href
                        });
                        console.log('[UTM Tracking] Pushed whatsapp_cta_click to dataLayer'); // Temporary log
                    } else {
                        console.log('[UTM Tracking] dataLayer not available when whatsapp_cta_click fired'); // Temporary log
                    }
                }
            });
            // --- END NEW EVENT DELEGATION LOGIC ---
        });
    }

    // Inicialização: espera a página carregar + delay para GA4
    const init = () => setTimeout(initWhatsAppTracking, 1500);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

