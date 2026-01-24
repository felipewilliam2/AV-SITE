<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Anhangá Viagens - Site Institucional

O site institucional da **Anhangá Viagens** é uma plataforma moderna e interativa desenvolvida para oferecer aos clientes uma experiência completa, desde a exploração de destinos até o planejamento de viagens com o auxílio de inteligência artificial.

## ✨ Features

- **🤖 Chat com IA Gemini:** Assistente de viagens integrado que responde dúvidas, sugere roteiros e oferece informações personalizadas em tempo real.
- **✈️ Vitrine de Destinos:** Seção visualmente atraente para apresentar os principais destinos oferecidos pela agência.
- **⭐ Depoimentos de Clientes:** Área dedicada a exibir a satisfação e as experiências de outros viajantes.
- **❓ FAQ Interativo:** Respostas rápidas para as dúvidas mais comuns dos clientes.
- **📝 Blog de Viagens:** Conteúdo atualizado com dicas, roteiros e novidades do mundo do turismo.
- **📱 Design Responsivo:** Experiência de usuário otimizada para desktops, tablets e smartphones.
- **📈 SEO Otimizado:** Estruturado para obter o melhor posicionamento em mecanismos de busca.
- **🗺️ Mapas Interativos:** Visualização de localidades e rotas com Leaflet.

## 🛠️ Tecnologias Utilizadas

- **React 19:** Biblioteca para construção da interface de usuário.
- **Vite:** Ferramenta de build e servidor de desenvolvimento de alta performance.
- **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
- **Tailwind CSS:** Framework CSS utility-first para estilização rápida e customizável.
- **React Router:** Para gerenciamento de rotas na aplicação.
- **Google Gemini AI:** Modelo de IA que alimenta o chatbot.
- **Lucide React:** Biblioteca de ícones open-source.
- **Leaflet:** Para a criação de mapas interativos.

## 🚀 Pré-requisitos

- Node.js 18+
- Chave da API do Google Gemini

## 📦 Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/anhanga-viagens.git
   cd anhanga-viagens
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   
   Copie o arquivo de exemplo `.env.example` para um novo arquivo `.env`:
   ```bash
   cp .env.example .env
   ```
   
   Em seguida, adicione sua chave da API do Gemini ao arquivo `.env`:
   ```env
   GEMINI_API_KEY=sua_chave_api_aqui
   ```
   > 💡 Obtenha sua chave em: [Google AI Studio](https://aistudio.google.com/apikey)

4. **Execute o projeto:**
   ```bash
   npm run dev
   ```
   O site estará disponível em `http://localhost:5173` (ou outra porta indicada no terminal).

## 📝 Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Gera a versão de produção do site na pasta `dist/`.
- `npm run preview`: Inicia um servidor local para visualizar a versão de produção.
- `npm run deploy`: Executa o build e faz o deploy para o GitHub Pages.

## 🚢 Deploy

O projeto está pré-configurado para deploy simplificado em plataformas como Vercel e Netlify.

### Vercel

1. Faça o fork do repositório.
2. Conecte sua conta do GitHub ao Vercel.
3. Importe o repositório e configure a variável de ambiente `GEMINI_API_KEY` no painel do projeto.
4. O deploy será feito automaticamente a cada push para a branch principal.

### Netlify

1. Siga os mesmos passos da Vercel.
2. O arquivo `netlify.toml` já contém as configurações de build (`npm run build`) e o diretório de publicação (`dist`).

## 📁 Estrutura do Código

A estrutura do projeto foi organizada para facilitar a manutenção e escalabilidade:

- **`/src`**: Contém todo o código-fonte da aplicação.
  - **`/components`**: Componentes React reutilizáveis (Header, Footer, etc.).
    - **`/ui`**: Componentes de UI genéricos (botões, inputs).
    - **`/schemas`**: Componentes para dados estruturados (SEO).
  - **`/pages`**: Componentes que representam as páginas da aplicação (Home, Blog, etc.).
  - **`/services`**: Módulos para comunicação com APIs externas (ex: Gemini).
  - **`/data`**: Mock de dados e informações estáticas.
  - **`/utils`**: Funções utilitárias.
- **`/public`**: Arquivos estáticos que não passam pelo processo de build (imagens, favicon).
- **`/api`**: Funções serverless (neste caso, para a comunicação segura com a API do Gemini).

## 📄 Licença

Este projeto é de propriedade privada da Anhangá Viagens.

---

<p align="center">
  Desenvolvido com ❤️ por <a href="https://anhanga.tech" target="_blank">anhangá.tech</a>
</p>
