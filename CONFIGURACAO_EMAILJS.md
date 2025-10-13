JS# Configuração do EmailJS para Newsletter da Argoeste

## 📧 Sistema de Notificação por Email

O sistema de newsletter da Argoeste agora inclui notificação automática por email sempre que um usuário se cadastra. Quando alguém se inscreve na newsletter, um email é enviado automaticamente para `contato@argoeste.com.br` informando sobre o novo cadastro.

## 🚀 Como Configurar

### 1. Criar Conta no EmailJS

1. Acesse [https://www.emailjs.com/](https://www.emailjs.com/)
2. Clique em "Sign Up" e crie uma conta gratuita
3. Confirme seu email

### 2. Configurar Serviço de Email

1. No painel do EmailJS, vá em **"Email Services"**
2. Clique em **"Add New Service"**
3. Escolha seu provedor de email (Gmail, Outlook, etc.)
4. Configure com suas credenciais
5. Anote o **Service ID** gerado

### 3. Criar Template de Email

1. Vá em **"Email Templates"**
2. Clique em **"Create New Template"**
3. Configure o template com as seguintes informações:

**Configurações do Template:**
- **Template Name:** Newsletter Argoeste
- **Subject:** Novo cadastro na Newsletter - Argoeste
- **To Email:** {{to_email}}
- **From Name:** {{from_name}}

**Conteúdo do Email:**
```html
<h2>Novo Cadastro na Newsletter</h2>
<p>{{message}}</p>

<h3>Detalhes do Cadastro:</h3>
<ul>
    <li><strong>Email:</strong> {{user_email}}</li>
    <li><strong>Data:</strong> {{signup_date}}</li>
    <li><strong>Horário:</strong> {{signup_time}}</li>
    <li><strong>Total de Inscritos:</strong> {{total_subscribers}}</li>
</ul>

<hr>
<p><em>Este email foi enviado automaticamente pelo sistema de newsletter da Argoeste.</em></p>
```

4. Salve o template e anote o **Template ID**

### 4. Obter Public Key

1. Vá em **"Account"** → **"General"**
2. Copie sua **Public Key**

### 5. Configurar no Site

Abra o arquivo `newsletter.js` e substitua as seguintes linhas:

```javascript
// Linha ~393-395
const serviceID = 'YOUR_SERVICE_ID'; // Substituir pela sua Service ID
const templateID = 'YOUR_TEMPLATE_ID'; // Substituir pela sua Template ID  
const publicKey = 'YOUR_PUBLIC_KEY'; // Substituir pela sua Public Key
```

**Exemplo:**
```javascript
const serviceID = 'service_abc123';
const templateID = 'template_xyz789'; 
const publicKey = 'user_def456';
```

## 📋 Template de Email Recomendado

### Subject (Assunto):
```
Novo cadastro na Newsletter - Argoeste
```

### Body (Corpo do Email):
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background-color: #2563eb; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .info-box { background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0; }
        .footer { background-color: #6b7280; color: white; padding: 10px; text-align: center; font-size: 12px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🎉 Novo Cadastro na Newsletter</h1>
    </div>
    
    <div class="content">
        <p>Olá!</p>
        <p>{{message}}</p>
        
        <div class="info-box">
            <h3>📋 Detalhes do Cadastro:</h3>
            <ul>
                <li><strong>📧 Email:</strong> {{user_email}}</li>
                <li><strong>📅 Data:</strong> {{signup_date}}</li>
                <li><strong>🕐 Horário:</strong> {{signup_time}}</li>
                <li><strong>👥 Total de Inscritos:</strong> {{total_subscribers}}</li>
            </ul>
        </div>
        
        <p>Este usuário agora receberá todas as atualizações e novidades da Argoeste!</p>
    </div>
    
    <div class="footer">
        <p>Este email foi enviado automaticamente pelo sistema de newsletter da Argoeste.</p>
    </div>
</body>
</html>
```

## 🔧 Funcionalidades Implementadas

### ✅ Sistema Completo
- **Validação de email** com regex avançado
- **Prevenção de duplicatas** 
- **Rate limiting** (máximo 5 cadastros por hora)
- **Notificação por email automática** para a empresa
- **Contador de inscritos** visível no footer
- **Painel administrativo** para gerenciar emails
- **Exportação** em CSV e JSON
- **Backup local** no localStorage

### 📱 Responsivo
- Funciona perfeitamente em desktop, tablet e mobile
- Notificações adaptadas para cada dispositivo
- Interface otimizada para touch

### 🛡️ Segurança
- Validação rigorosa de emails
- Prevenção de spam com rate limiting
- Tratamento de erros sem expor informações sensíveis

## 🎯 Como Testar

1. Configure as chaves do EmailJS conforme instruções acima
2. Acesse o site e vá até o footer
3. Inscreva um email de teste na newsletter
4. Verifique se:
   - O email aparece no contador de inscritos
   - Uma notificação de sucesso é exibida
   - Um email é enviado para `contato@argoeste.com.br`

## 📊 Painel Administrativo

Para acessar o painel de gerenciamento:
- **Atalho:** `Ctrl + Shift + N`
- **Botão:** Clique no ícone 📧 no footer

### Funcionalidades do Painel:
- Ver total de inscritos
- Ver cadastros do mês
- Exportar lista em CSV/JSON
- Remover emails específicos
- Limpar toda a lista

## 🔍 Debug e Monitoramento

O sistema inclui logs detalhados no console do navegador:
- Status de envio de emails
- Erros de configuração
- Estatísticas de uso

Para debug avançado, use no console:
```javascript
window.newsletterManager.getStats()
```

## 💡 Dicas Importantes

1. **Teste primeiro:** Configure com um email de teste antes de usar o email da empresa
2. **Backup regular:** Exporte a lista de emails regularmente
3. **Monitoramento:** Verifique os logs do console para identificar problemas
4. **Limites do EmailJS:** A conta gratuita tem limite de 200 emails/mês

## 🆘 Solução de Problemas

### Email não está sendo enviado:
1. Verifique se as chaves estão corretas no `newsletter.js`
2. Confirme se o serviço EmailJS está ativo
3. Verifique o console do navegador para erros

### Template não funciona:
1. Certifique-se de que todas as variáveis estão corretas: `{{user_email}}`, `{{signup_date}}`, etc.
2. Teste o template no painel do EmailJS

### Contador não atualiza:
1. Verifique se o elemento `.newsletter-subscriber-count` existe no HTML
2. Confirme se o JavaScript está carregando corretamente

---

**📞 Suporte:** Se precisar de ajuda, verifique os logs do console ou entre em contato com o desenvolvedor.