---
name: security-audit
description: Analisa técnicas e recursos de segurança em projetos web, identificando boas práticas implementadas e oportunidades de melhoria. Use para auditorias de segurança, revisões de código ou avaliação de infraestrutura.
---

# Security Audit Skill

Quando realizar uma auditoria de segurança, siga estas etapas:

## Checklist de análise

### 1. **Autenticação e Autorização**
- Mecanismos de autenticação implementados (JWT, OAuth, sessões)
- Políticas de senha (complexidade, expiração, histórico)
- Autenticação multifator (MFA/2FA)
- Controle de acesso baseado em funções (RBAC)
- Proteção contra enumeração de usuários

### 2. **Proteção de Dados**
- Criptografia de dados em trânsito (TLS/SSL, versões, cipher suites)
- Criptografia de dados em repouso (banco de dados, arquivos)
- Gestão segura de secrets e variáveis de ambiente
- Sanitização de logs (sem exposição de dados sensíveis)
- Compliance com LGPD/GDPR (quando aplicável)

### 3. **Segurança de Aplicação**
- Proteção contra injeção (SQL, NoSQL, comandos, LDAP)
- Proteção XSS (Cross-Site Scripting)
- Proteção CSRF (Cross-Site Request Forgery)
- Validação de entrada (client-side e server-side)
- Sanitização de output
- Content Security Policy (CSP)
- Controle de CORS adequado

### 4. **Segurança de API**
- Rate limiting e throttling
- Validação de esquemas de requisição
- Versionamento de API
- Documentação de endpoints sensíveis
- Uso adequado de verbos HTTP
- Proteção contra mass assignment

### 5. **Gestão de Sessão**
- Tokens seguros (geração, armazenamento, expiração)
- Logout adequado (invalidação de sessão)
- Proteção contra session fixation
- Cookies com flags adequadas (HttpOnly, Secure, SameSite)

### 6. **Infraestrutura e Configuração**
- Headers de segurança (HSTS, X-Frame-Options, X-Content-Type-Options)
- Configuração de servidor web segura
- Permissões de arquivo adequadas
- Desabilitação de funcionalidades desnecessárias
- Ocultação de informações do servidor
- Proteção de arquivos sensíveis (.env, .git, backups)

### 7. **Dependências e Atualizações**
- Auditoria de dependências (npm audit, OWASP Dependency-Check)
- Versões atualizadas de frameworks e bibliotecas
- Remoção de dependências não utilizadas
- Política de atualização de segurança

### 8. **Monitoramento e Logging**
- Logs de eventos de segurança
- Detecção de atividades suspeitas
- Alertas de segurança configurados
- Backup e retenção de logs
- Auditoria de acessos privilegiados

### 9. **Proteção contra Ataques Comuns**
- Proteção DDoS
- Proteção contra brute force
- Proteção contra clickjacking
- Validação de uploads de arquivo
- Proteção contra path traversal

### 10. **Compliance e Documentação**
- Política de privacidade atualizada
- Termos de uso claros
- Documentação de arquitetura de segurança
- Plano de resposta a incidentes
- Testes de penetração recentes

## Como estruturar o relatório

### Formato de saída

**1. Resumo Executivo**
- Score geral de segurança (0-100)
- Número de vulnerabilidades críticas/altas/médias/baixas
- Principais riscos identificados

**2. Pontos Fortes**
- Boas práticas já implementadas
- Recursos de segurança funcionando adequadamente

**3. Vulnerabilidades Identificadas**
Para cada item:
- **Severidade**: Crítica | Alta | Média | Baixa
- **Descrição**: O que foi encontrado
- **Impacto**: Consequências potenciais
- **Localização**: Onde está o problema
- **Evidência**: Exemplo de código ou configuração

**4. Recomendações Priorizadas**
Para cada recomendação:
- **Prioridade**: Urgente | Alta | Média | Baixa
- **Ação**: O que fazer
- **Justificativa**: Por que é importante
- **Implementação**: Como corrigir (com exemplo de código quando possível)
- **Esforço estimado**: Horas/dias necessários

**5. Plano de Ação**
- Roadmap de implementação
- Quick wins (melhorias rápidas)
- Melhorias de médio prazo
- Melhorias de longo prazo

**6. Recursos e Referências**
- Links para documentação relevante
- Ferramentas sugeridas
- Padrões e frameworks (OWASP, NIST, CIS)

## Princípios da análise

- Seja específico sobre onde e como o problema ocorre
- Classifique sempre a severidade com base no impacto real
- Forneça exemplos práticos de correção
- Considere o contexto do projeto (tamanho, público, dados manipulados)
- Priorize vulnerabilidades exploráveis sobre teóricas
- Inclua tanto aspectos técnicos quanto de processo

## Quando escalar

Se encontrar:
- Credenciais expostas em código
- Vulnerabilidades críticas em produção
- Violações graves de compliance
- Backdoors ou código malicioso

→ Reporte imediatamente e recomende ação urgente.
