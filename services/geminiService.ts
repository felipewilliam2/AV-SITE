
import { GoogleGenAI, Type, FunctionDeclaration, Content } from "@google/genai";
import { getWhatsAppLink } from "../utils/whatsapp";

// Usar process.env.API_KEY que é definido no vite.config.ts via define
// Em produção, isso será substituído pelo valor da variável de ambiente GEMINI_API_KEY
const apiKey = (process.env as any).API_KEY || (process.env as any).GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Definição da ferramenta para gerar o link
const budgetTool: FunctionDeclaration = {
  name: "generate_budget_link",
  description: "Gera um link para o WhatsApp quando o usuário concorda em solicitar um orçamento e já forneceu as informações básicas.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      destination: { type: Type.STRING, description: "O destino desejado para a viagem." },
      dates: { type: Type.STRING, description: "Data aproximada da viagem ou mês/ano." },
      adults: { type: Type.INTEGER, description: "Quantidade de adultos viajando." },
      child_ages: {
        type: Type.ARRAY,
        items: { type: Type.INTEGER },
        description: "Lista com as idades das crianças. Se não houver crianças, envie um array vazio."
      },
      interests: { type: Type.STRING, description: "Interesses específicos (ex: luxo, aventura, família)." }
    },
    required: ["destination", "adults"]
  }
};

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
    const contents: Content[] = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    // Modelo: gemini-2.5-flash (conforme solicitado)
    // Se não estiver disponível, pode tentar: gemini-2.0-flash ou gemini-1.5-flash
    const modelName = (process.env as any).GEMINI_MODEL || 'gemini-2.5-flash';

    console.log(`🤖 Usando modelo: ${modelName}`);

    const response = await ai.models.generateContent({
      model: modelName,
      contents: contents,
      config: {
        tools: [{ functionDeclarations: [budgetTool] }],
        systemInstruction: `
          Você é o consultor virtual sênior da 'Anhangá Viagens'.
          
          SUA MISSÃO:
          1. Engajar o usuário para solicitar um orçamento de forma natural e empática.
          2. Coletar dados (Destino, Data, Adultos, Crianças) sem parecer um formulário robótico.
          3. Garantir a SEGURANÇA do viajante, filtrando destinos de risco.

          DADOS LEGAIS DA EMPRESA (Use para transmitir confiança se perguntado):
          - Razão Social: ANHANGA TURISMO LTDA
          - CNPJ e Cadastur: 37.036.732/0001-41
          - Endereço: Avenida Dom Pedro I, 773 - Vila Monumento, São Paulo-SP
          - Telefone: (11) 5283-3309

          DIRETRIZES DE SEGURANÇA E ZONAS DE RISCO (CRÍTICO - SAFETY FIRST):
          Se o usuário pedir cotação para qualquer país das listas abaixo, você deve RECUSAR educadamente e NÃO chamar a função 'generate_budget_link'. Explique o motivo e sugira a alternativa indicada.

          🔴 CATEGORIA 1: ZONA DE GUERRA & CONFLITO (Bloqueio Total)
          - Países: Israel, Líbano, Palestina, Síria, Iêmen, Ucrânia, Sudão, Afeganistão.
          - Resposta: "No momento, a Anhangá não opera roteiros para {País} devido aos alertas de segurança do Itamaraty e conflitos ativos. O seguro viagem não cobre sinistros nestas áreas. Nossa prioridade é sua integridade. Que tal considerarmos Jordânia, Turquia ou Egito?"

          🟠 CATEGORIA 2: SANÇÕES & COLAPSO (Risco Operacional)
          - Países: Rússia, Bielorrússia, Coreia do Norte, Irã, Venezuela, Cuba.
          - Resposta: "Não recomendamos {País} no momento. Há restrições bancárias severas (cartões não funcionam), risco de cancelamento de voos ou infraestrutura precária. (Para Cuba: alerte sobre risco de perder visto EUA/ESTA). Que tal o Leste Europeu ou Caribe Mexicano?"

          🟡 CATEGORIA 3: INSTABILIDADE CIVIL (Alerta de Segurança)
          - Países: Haiti, Mianmar, Líbia, Somália, Equador (Costa/Guayaquil).
          - Resposta: "Devido à instabilidade civil e violência local, recomendamos cautela extrema. Que tal considerarmos Tailândia ou Sri Lanka como alternativas incríveis?"
          - Obs: Se for Equador (Galápagos), é permitido, mas avise que a conexão no continente exige cuidado.

          COLETA DE DADOS (CRÍTICO):
          - **CRIANÇAS:** Se houver crianças, você PRECISA saber as idades. Pergunte de forma simpática (ex: "Para personalizarmos os mimos, qual a idade dos pequenos?").
          
          USO DA FERRAMENTA 'generate_budget_link':
          - Chame esta função APENAS quando tiver todos os dados E se o destino for SEGURO.
          - **IMPORTANTE SOBRE A RESPOSTA DE TEXTO (TEXT OUTPUT):**
            - Quando você decidir chamar a ferramenta, sua resposta de texto (content) NÃO deve repetir os dados técnicos (datas, qtd pessoas). O cartão já fará isso.
            - Sua resposta de texto deve ser um comentário curto e animador sobre o destino escolhido ou uma frase de transição.
            - Exemplo BOM: "Uau, {destino} é fantástico nessa época! 🤩 Preparei seu link exclusivo abaixo."
            - Exemplo RUIM: "Capturei seus dados: 2 adultos, dia 10..." (NÃO FAÇA ISSO).

          TOM DE VOZ:
          - Sofisticado, porém acessível. Use emojis pontuais ✈️✨.
          - Evite respostas longas.
        `,
        temperature: 0.7,
      }
    });

    const result: ChatResponse = {};
    const candidate = response.candidates?.[0];

    // Verificar texto normal primeiro (para capturar o comentário empático da IA ou o aviso de segurança)
    const textParts = candidate?.content?.parts?.filter(part => part.text);
    if (textParts && textParts.length > 0) {
      result.text = textParts.map(p => p.text).join(' ');
    }

    // Verificar se houve chamada de ferramenta (Function Call)
    const functionCalls = candidate?.content?.parts?.filter(part => part.functionCall);

    if (functionCalls && functionCalls.length > 0) {
      const call = functionCalls[0].functionCall;
      if (call && call.name === 'generate_budget_link') {
        const args = call.args as any;

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

        // Fallback inteligente: Se o modelo chamou a função mas não mandou texto (comum em function calling puro),
        // inserimos um texto genérico mas agradável. Se ele mandou texto (capturado acima), mantemos o texto dele.
        if (!result.text) {
          result.text = "Prontinho! ✨ Preparei seu link direto para falar com nossos especialistas. É só clicar abaixo 👇";
        }
      }
    }

    return result;

  } catch (error: any) {
    console.error("Erro ao consultar Gemini:", error);

    // Se não houver API key configurada
    if (!apiKey) {
      return { text: "⚠️ A chave da API não está configurada. Por favor, configure a variável GEMINI_API_KEY no ambiente de deploy." };
    }

    // Log detalhado do erro para debug
    if (error?.message) {
      console.error("Detalhes do erro:", error.message);
      console.error("Código do erro:", error.code);
      console.error("Status do erro:", error.status);
    }

    // Mensagens de erro mais específicas
    if (error?.message?.includes('model') || error?.message?.includes('Model') || error?.message?.includes('not found')) {
      const currentModel = (process.env as any).GEMINI_MODEL || 'gemini-2.5-flash';
      return { text: `⚠️ Erro com o modelo de IA '${currentModel}'. O modelo pode não estar disponível. Tente usar 'gemini-2.0-flash' ou 'gemini-1.5-flash' configurando a variável GEMINI_MODEL.` };
    }

    if (error?.message?.includes('API key') || error?.message?.includes('authentication')) {
      return { text: "⚠️ Erro de autenticação. Verifique se a chave da API está correta e válida." };
    }

    // Outros erros
    return { text: `Desculpe, tive um problema técnico: ${error?.message || 'Erro desconhecido'}. Poderia tentar novamente?` };
  }
};
