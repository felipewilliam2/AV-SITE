import React from 'react';

interface ArticleSchemaProps {
    title: string;
    description: string;
    image: string;
    datePublished: string;
    authorName: string;
    url: string;
}

export const ArticleSchema: React.FC<ArticleSchemaProps> = ({
    title,
    description,
    image,
    datePublished,
    authorName,
    url
}) => (
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
            __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": title,
                "image": image,
                "author": {
                    "@type": "Person",
                    "name": authorName
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "Anhangá Viagens",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://www.anhanga.tur.br/logo.png"
                    }
                },
                "datePublished": datePublished,
                "description": description,
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": url
                }
            })
        }}
    />
);
