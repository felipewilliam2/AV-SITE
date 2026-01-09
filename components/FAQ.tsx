
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Sparkles } from 'lucide-react';

const FAQItem: React.FC<{ question: string; answer: string; idx: number }> = ({ question, answer, idx }) => {
    const [isOpen, setIsOpen] = useState(false);
    const rotation = idx % 2 === 0 ? '-rotate-[0.5deg]' : 'rotate-[0.5deg]';

    return (
        <div className={`mb-4 bg-white border-2 border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:border-brand-cyan/20 ${isOpen ? 'shadow-[0_8px_30px_rgba(0,0,0,0.08)] border-brand-cyan/30 scale-[1.01] z-10' : 'shadow-sm'} ${rotation}`}>
            <button 
                className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none group"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={`font-black text-lg md:text-xl tracking-tight transition-all duration-300 ${
                    isOpen 
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-blue-600 drop-shadow-sm' 
                    : 'text-gray-800 group-hover:text-brand-cyan'
                }`}>
                    {question}
                </span>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 border-2 ${
                    isOpen 
                    ? 'bg-brand-cyan text-white border-brand-cyan rotate-180 shadow-md' 
                    : 'bg-gray-50 text-gray-400 border-gray-100 group-hover:border-brand-cyan/30 group-hover:text-brand-cyan'
                }`}>
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
            </button>
            <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="px-6 pb-8 pt-2 text-gray-600 font-medium leading-relaxed text-base border-t border-dashed border-gray-100">
                    {answer}
                </div>
            </div>
        </div>
    );
};

const FAQ: React.FC = () => {
  const faqs = [
    {
        question: "Como funciona o atendimento?",
        answer: "Simples! Conversamos para entender seu estilo, montamos uma proposta visual e, aprovado, cuidamos de todas as reservas."
    },
    {
        question: "Quanto tempo antes devo planejar?",
        answer: "Idealmente 3-6 meses para internacional. Mas somos experts em 'milagres de última hora' também! 😉"
    },
    {
        question: "É 100% personalizado mesmo?",
        answer: "Sim! Nada de pacotão pronto. Se você ama café, seu roteiro terá as melhores cafeterias. Se ama aventura, terá trilhas."
    },
    {
        question: "E se der problema na viagem?",
        answer: "Temos um 'botão de pânico' no WhatsApp 24h. A gente resolve perrengue enquanto você pede outro drink."
    }
  ];

  return (
    <section className="py-20 bg-[#fffdf5]">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-12">
            <div className="inline-block bg-brand-vibrant text-white px-3 py-1 rounded-lg font-black text-xs uppercase tracking-widest -rotate-2 mb-2 shadow-sm">
                FAQ
            </div>
            <h2 className="text-4xl font-black text-brand-dark">Dúvidas? <span className="text-gray-400 font-serif italic font-normal">Relaxa.</span></h2>
        </div>
        
        <div className="space-y-4">
            {faqs.map((faq, idx) => (
                <FAQItem key={idx} {...faq} idx={idx} />
            ))}
        </div>

        {/* Lembrete da IA */}
        <div className="mt-12 flex justify-center">
            <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 flex items-center gap-5 max-w-md transform rotate-1 hover:rotate-0 transition-transform duration-300 shadow-sm hover:shadow-md cursor-default">
                <div className="bg-white p-3 rounded-full shadow-md shrink-0 border border-blue-100">
                    <Sparkles className="w-6 h-6 text-brand-vibrant fill-brand-vibrant animate-pulse" />
                </div>
                <div>
                    <h4 className="font-bold text-brand-dark text-lg mb-1">Pergunta difícil?</h4>
                    <p className="text-gray-600 text-sm leading-snug">
                        Nossa <span className="font-bold text-brand-vibrant">IA Especialista</span> sabe (quase) tudo! Chame ela no chat aqui no canto 👉
                    </p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
