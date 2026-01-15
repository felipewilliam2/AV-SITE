import React from 'react';

export const BreadcrumbSchema = () => (
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
            __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://www.anhanga.tur.br"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Destinos",
                        "item": "https://www.anhanga.tur.br#destinos"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": "Blog",
                        "item": "https://www.anhanga.tur.br/blog"
                    },
                    {
                        "@type": "ListItem",
                        "position": 4,
                        "name": "Contato",
                        "item": "https://www.anhanga.tur.br#contato"
                    }
                ]
            })
        }}
    />
);
