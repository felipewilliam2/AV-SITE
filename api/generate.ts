import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";

export const config = {
    runtime: 'edge',
};

// Definição da ferramenta para gerar o link (Movemos para o servidor para consistência)
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

const SYSTEM_INSTRUCTION = `
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
`;

export default async function handler(request: Request) {
    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.error('SERVER: GEMINI_API_KEY not found in environment variables');
            return new Response(JSON.stringify({
                error: 'Server configuration error: API key missing'
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const { contents } = await request.json();

        if (!contents) {
            return new Response(JSON.stringify({ error: 'Contents are required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const ai = new GoogleGenAI({ apiKey });
        const modelName = process.env.GEMINI_MODEL || 'gemini-2.0-flash';

        // Correct usage based on SDK documentation/patterns
        const response = await ai.models.generateContent({
            model: modelName,
            contents,
            config: {
                tools: [{ functionDeclarations: [budgetTool] }],
                systemInstruction: SYSTEM_INSTRUCTION,
                temperature: 0.7,
            }
        });

        // Serializar a resposta de forma segura para o cliente
        const candidate = response.candidates?.[0];
        const textPart = candidate?.content?.parts?.find(p => p.text);
        const functionCallPart = candidate?.content?.parts?.find(p => p.functionCall);

        return new Response(JSON.stringify({
            text: textPart?.text,
            functionCall: functionCallPart?.functionCall
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error: any) {
        console.error('SERVER: Error proxying to Gemini:', error);
        return new Response(JSON.stringify({
            error: 'Error processing request',
            details: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
