<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Anhangá Viagens - Site Institucional

Site institucional da Anhangá Viagens com chat AI integrado para consultas de viagens.

## 🚀 Pré-requisitos

- Node.js 18+ instalado
- Chave da API do Google Gemini

## 📦 Instalação Local

1. **Clone o repositório e instale as dependências:**
   ```bash
   npm install
   ```

2. **Configure as variáveis de ambiente:**
   
   Crie um arquivo `.env.local` na raiz do projeto:
   ```env
   GEMINI_API_KEY=sua_chave_api_aqui
   ```
   
   > 💡 Obtenha sua chave em: https://aistudio.google.com/apikey

3. **Execute o projeto em modo desenvolvimento:**
   ```bash
   npm run dev
   ```
   
   O site estará disponível em `http://localhost:3000`

## 🏗️ Build para Produção

1. **Crie o arquivo `.env` ou `.env.production` com a chave da API:**
   ```env
   GEMINI_API_KEY=sua_chave_api_producao
   ```

2. **Gere o build de produção:**
   ```bash
   npm run build
   ```
   
   Os arquivos otimizados serão gerados na pasta `dist/`

3. **Visualize o build localmente:**
   ```bash
   npm run preview
   ```

## 🚢 Deploy

### Opções de Deploy

#### 1. **Vercel (Recomendado)**

1. Instale a CLI da Vercel:
   ```bash
   npm i -g vercel
   ```

2. Faça login:
   ```bash
   vercel login
   ```

3. Configure as variáveis de ambiente no painel da Vercel:
   - `GEMINI_API_KEY`: Sua chave da API Gemini

4. Faça o deploy:
   ```bash
   vercel --prod
   ```

#### 2. **Netlify**

1. Instale a CLI do Netlify:
   ```bash
   npm i -g netlify-cli
   ```

2. Faça login:
   ```bash
   netlify login
   ```

3. Configure o build:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Environment variables:** Adicione `GEMINI_API_KEY` no painel do Netlify

4. Faça o deploy:
   ```bash
   netlify deploy --prod
   ```

#### 3. **GitHub Pages**

1. Instale a dependência:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Adicione ao `package.json`:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

3. **Configure o base path** criando um arquivo `.env.production`:
   
   Se o repositório for `username.github.io/repo-name`:
   ```env
   VITE_BASE_PATH=/repo-name/
   GEMINI_API_KEY=sua_chave_aqui
   ```
   
   Se for `username.github.io` (sem subdiretório):
   ```env
   VITE_BASE_PATH=/
   GEMINI_API_KEY=sua_chave_aqui
   ```

4. Faça o deploy:
   ```bash
   npm run deploy
   ```
   
   > ⚠️ **Importante**: O `vite.config.ts` já está configurado para usar `VITE_BASE_PATH` automaticamente. Não é necessário editar o arquivo de configuração.

#### 4. **Servidor Próprio (Nginx/Apache)**

1. Gere o build:
   ```bash
   npm run build
   ```

2. Faça upload da pasta `dist/` para o servidor

3. Configure o servidor web para servir os arquivos estáticos

4. Configure as variáveis de ambiente no servidor (se necessário)

### ⚙️ Variáveis de Ambiente no Deploy

**IMPORTANTE:** Configure a variável `GEMINI_API_KEY` no painel de configuração da sua plataforma de deploy:

- **Vercel:** Settings → Environment Variables
- **Netlify:** Site settings → Environment variables
- **Outros:** Consulte a documentação da plataforma

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera o build de produção
- `npm run preview` - Visualiza o build de produção localmente

## 🛠️ Tecnologias Utilizadas

- **React 19** - Biblioteca UI
- **Vite** - Build tool e dev server
- **TypeScript** - Tipagem estática
- **React Router** - Roteamento
- **Google Gemini AI** - Chatbot de consultas
- **Tailwind CSS** - Estilização
- **Leaflet** - Mapas interativos

## 📄 Licença

Este projeto é privado e propriedade da Anhangá Viagens.

---

**Desenvolvido para Anhangá Viagens** ✈️
