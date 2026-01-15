import React from 'react';

export const OrganizationSchema = () => (
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
            __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Anhangá Viagens",
                "url": "https://www.anhanga.tur.br",
                "logo": "https://www.anhanga.tur.br/logo.png",
                "description": "Agência de viagens especializada em roteiros personalizados e experiências transformadoras.",
                "telephone": "+551152833309",
                "email": "contato@anhanga.tur.br",
                "sameAs": [
                    "https://www.instagram.com/anhangaviagens",
                    "https://www.facebook.com/anhangaviagens"
                ],
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Av. Dom Pedro I, 773",
                    "addressLocality": "São Paulo",
                    "addressRegion": "SP",
                    "postalCode": "05050-100",
                    "addressCountry": "BR"
                },
                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+551152833309",
                    "contactType": "Customer Support",
                    "availableLanguage": "pt-BR",
                    "areaServed": "BR"
                }
            })
        }}
    />
);
