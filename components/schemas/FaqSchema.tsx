import React from 'react';

export const FaqSchema = () => (
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
            __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "Como funciona o atendimento?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Simples! Conversamos para entender seu estilo, montamos uma proposta visual e, aprovado, cuidamos de todas as reservas."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Quanto tempo antes devo planejar?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Idealmente 3-6 meses para internacional. Mas somos experts em 'milagres de última hora' também! 😉"
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "É 100% personalizado mesmo?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Sim! Nada de pacotão pronto. Se você ama café, seu roteiro terá as melhores cafeterias. Se ama aventura, terá trilhas."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "E se der problema na viagem?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Temos um 'botão de pânico' no WhatsApp 24h. A gente resolve perrengue enquanto você pede outro drink."
                        }
                    }
                ]
            })
        }}
    />
);
