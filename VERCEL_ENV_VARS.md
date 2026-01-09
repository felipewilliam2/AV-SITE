# 🔑 Configurando Variáveis de Ambiente no Vercel

## ✅ Passo a Passo para Configurar GEMINI_API_KEY

### 1. Adicionar Variável no Dashboard do Vercel

1. Acesse seu projeto no Vercel: https://vercel.com/dashboard
2. Vá em **Settings** → **Environment Variables**
3. Adicione a variável:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: Sua chave da API do Gemini
   - **Environments**: Marque **Production**, **Preview** e **Development**

### 2. Verificar se a Variável Está Configurada

Após adicionar, você deve ver:
- ✅ `GEMINI_API_KEY` na lista de variáveis
- ✅ Ambientes marcados (Production, Preview, Development)

### 3. ⚠️ IMPORTANTE: Fazer um Novo Deploy

**A variável só será aplicada em um NOVO deploy!**

Após adicionar/alterar variáveis de ambiente:
1. Vá para a aba **Deployments**
2. Clique nos **3 pontos** (⋯) do último deploy
3. Selecione **Redeploy**
4. Ou faça um novo commit e push (isso trigger um novo deploy automaticamente)

### 4. Verificar se Funcionou

**Opção 1: Verificar Logs de Build**
1. Vá para o deploy
2. Clique em **View Build Logs**
3. Procure por: `🔧 GEMINI_API_KEY loaded: ✅ Sim`
   - Se aparecer `❌ Não`, a variável não foi carregada

**Opção 2: Testar no Site**
1. Abra o site em produção
2. Abra o DevTools (F12)
3. Vá para **Console**
4. Tente usar o chat AI
5. Se aparecer erro sobre API key, ela não está configurada

## 🐛 Problemas Comuns

### Problema: Variável não aparece nos logs

**Soluções:**
1. **Verifique o nome**: Deve ser exatamente `GEMINI_API_KEY` (maiúsculas)
2. **Verifique os ambientes**: Certifique-se que está marcado para **Production**
3. **Faça um novo deploy**: Variáveis só são aplicadas em novos deploys
4. **Limpe o cache**: No Vercel, vá em Settings → General → Clear Build Cache

### Problema: Variável aparece mas não funciona

**Soluções:**
1. **Verifique se não há espaços**: A chave não deve ter espaços no início/fim
2. **Verifique se a chave está completa**: Copie e cole novamente
3. **Verifique os logs**: Veja se há erros no console do navegador

### Problema: Funciona localmente mas não no Vercel

**Causa**: Variáveis locais (`.env.local`) não são enviadas para o Vercel

**Solução**: Configure a variável no dashboard do Vercel (não apenas localmente)

## 📋 Checklist

- [ ] Variável `GEMINI_API_KEY` adicionada no dashboard
- [ ] Ambientes marcados (Production, Preview, Development)
- [ ] Novo deploy feito após adicionar a variável
- [ ] Logs de build mostram `✅ Sim` para GEMINI_API_KEY
- [ ] Chat AI funciona no site em produção

## 🔄 Como Forçar um Novo Deploy

### Método 1: Via Dashboard
1. Deployments → 3 pontos (⋯) → Redeploy

### Método 2: Via Git
```bash
# Fazer um commit vazio (apenas para trigger deploy)
git commit --allow-empty -m "Trigger deploy para aplicar variáveis de ambiente"
git push origin main
```

### Método 3: Via CLI
```bash
vercel --prod
```

## 🔍 Debug Avançado

Se ainda não funcionar, adicione logs temporários no código:

1. No `vite.config.ts`, os logs já mostram se a variável foi carregada
2. Verifique os logs de build no Vercel
3. Se aparecer `❌ Não`, a variável não está sendo passada corretamente

## 📞 Suporte

Se após seguir todos os passos ainda não funcionar:
1. Verifique os logs de build completos
2. Verifique o console do navegador para erros
3. Certifique-se que a chave da API está válida
