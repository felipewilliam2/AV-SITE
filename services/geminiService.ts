
import { getWhatsAppLink } from "../utils/whatsapp";

interface ChatResponse {
  text?: string;
  budgetLink?: {
    destination: string;
    dates: string;
    travelers: string;
    interests: string;
    url: string;
  };
}

export const getTravelAdvice = async (history: { role: 'user' | 'model', text: string }[]): Promise<ChatResponse> => {
  try {
    // Converter histórico simples para o formato da API
    const contents = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    // In local development you might want to point this to localhost:3000/api/generate
    // In production (Vercel), '/api/generate' is automatically routed to the serverless function.
    const apiEndpoint = '/api/generate';

    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contents }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      // Handle rate limiting specifically
      if (response.status === 429) {
        const retryAfter = errorData.retryAfter || 60;
        return {
          text: `⏳ Você enviou muitas mensagens. Por favor, aguarde ${retryAfter} segundos e tente novamente.\n\nEnquanto isso, você pode falar diretamente conosco pelo WhatsApp!`
        };
      }

      throw new Error(errorData.error || `Server responded with ${response.status}`);
    }

    const data = await response.json();
    const result: ChatResponse = {};

    // 1. Texto da resposta
    if (data.text) {
      result.text = data.text;
    }

    // 2. Function Call (Orçamento)
    if (data.functionCall && data.functionCall.name === 'generate_budget_link') {
      const args = data.functionCall.args;

      // Formatar texto de viajantes
      const adultsCount = args.adults || 2;
      const childAges = Array.isArray(args.child_ages) ? args.child_ages : [];

      let travelersText = `${adultsCount} Adulto${adultsCount !== 1 ? 's' : ''}`;

      if (childAges.length > 0) {
        const agesString = childAges.map((age: number) => `${age} anos`).join(', ');
        travelersText += `, ${childAges.length} Criança${childAges.length !== 1 ? 's' : ''} (${agesString})`;
      }

      // Construir link do WhatsApp
      const text = `Olá! Vim pelo Chatbot da Anhangá. Gostaria de um orçamento:\n\n📍 Destino: ${args.destination}\n📅 Data: ${args.dates || 'A definir'}\n👥 Viajantes: ${travelersText}\n✨ Interesses: ${args.interests || 'Geral'}`;

      result.budgetLink = {
        destination: args.destination,
        dates: args.dates || 'A definir',
        travelers: travelersText,
        interests: args.interests || '',
        url: getWhatsAppLink(text)
      };

      // Fallback: se não veio texto, adicionar um padrão
      if (!result.text) {
        result.text = "Prontinho! ✨ Preparei seu link direto para falar com nossos especialistas. É só clicar abaixo 👇";
      }
    }

    return result;

  } catch (error: any) {
    console.error("Erro ao consultar Gemini via Server:", error);

    // Mensagens de erro amigáveis
    if (error?.message?.includes('API key missing')) {
      return { text: "⚠️ Erro de configuração no servidor. A chave da API não foi encontrada." };
    }

    return { text: `Desculpe, tive um problema técnico momentâneo. Poderia tentar novamente?` };
  }
};
