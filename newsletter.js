// Newsletter System - Argoeste
// Sistema completo de captura e gerenciamento de emails para newsletter

class NewsletterManager {
    constructor() {
        this.storageKey = 'argoeste_newsletter_emails';
        this.rateLimitKey = 'argoeste_newsletter_rate_limit';
        this.maxEmailsPerHour = 5; // Prevenção básica de spam
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupForm();
            this.setupAdminPanel();
            this.updateSubscriberCount();
        });
    }

    // Configurar formulário de newsletter
    setupForm() {
        const form = document.getElementById('newsletter-form');
        if (!form) {
            console.warn('Formulário de newsletter não encontrado');
            return;
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit(form);
        });
    }

    // Processar envio do formulário
    async handleFormSubmit(form) {
        const emailInput = form.querySelector('input[type="email"]');
        const submitBtn = form.querySelector('button[type="submit"]');
        
        if (!emailInput || !submitBtn) return;

        const email = emailInput.value.trim().toLowerCase();
        
        // Desabilitar botão durante processamento
        submitBtn.disabled = true;
        submitBtn.textContent = 'Processando...';

        try {
            // Validações
            if (!this.validateEmail(email)) {
                throw new Error('Por favor, insira um email válido');
            }

            if (!this.checkRateLimit()) {
                throw new Error('Muitas tentativas. Tente novamente em 1 hora');
            }

            if (this.emailExists(email)) {
                throw new Error('Este email já está cadastrado em nossa newsletter');
            }

            // Salvar email
            this.saveEmail(email);
            this.updateRateLimit();
            
            // Enviar notificação por email para a empresa
            await this.sendEmailNotification(email);
            
            // Feedback de sucesso
            this.showNotification('Email cadastrado com sucesso! Obrigado por se inscrever.', 'success');
            emailInput.value = '';
            this.updateSubscriberCount();

        } catch (error) {
            this.showNotification(error.message, 'error');
        } finally {
            // Reabilitar botão
            submitBtn.disabled = false;
            submitBtn.textContent = 'Inscrever';
        }
    }

    // Validar formato do email - versão simplificada com debug
    validateEmail(email) {
        console.log('=== DEBUG VALIDAÇÃO EMAIL ===');
        console.log('Email recebido:', email);
        console.log('Tipo do email:', typeof email);
        console.log('Comprimento:', email.length);
        console.log('Caracteres (array):', email.split(''));
        
        // Regex básico e simples para validação de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        console.log('Regex usado:', emailRegex);
        
        const result = emailRegex.test(email);
        console.log('Resultado do regex:', result);
        
        // Verificações adicionais para debug
        console.log('Contém @:', email.includes('@'));
        console.log('Contém .:', email.includes('.'));
        console.log('Posição do @:', email.indexOf('@'));
        console.log('Posição do último .:', email.lastIndexOf('.'));
        
        console.log('=== FIM DEBUG ===');
        
        // Apenas validação básica - deve ter @ e pelo menos um ponto após o @
        return result;
    }

    // Verificar rate limiting
    checkRateLimit() {
        const now = Date.now();
        const rateLimitData = JSON.parse(localStorage.getItem(this.rateLimitKey) || '{}');
        
        // Limpar dados antigos (mais de 1 hora)
        const oneHourAgo = now - (60 * 60 * 1000);
        const recentAttempts = (rateLimitData.attempts || []).filter(time => time > oneHourAgo);
        
        return recentAttempts.length < this.maxEmailsPerHour;
    }

    // Atualizar rate limiting
    updateRateLimit() {
        const now = Date.now();
        const rateLimitData = JSON.parse(localStorage.getItem(this.rateLimitKey) || '{}');
        const oneHourAgo = now - (60 * 60 * 1000);
        
        // Manter apenas tentativas da última hora
        const recentAttempts = (rateLimitData.attempts || []).filter(time => time > oneHourAgo);
        recentAttempts.push(now);
        
        localStorage.setItem(this.rateLimitKey, JSON.stringify({
            attempts: recentAttempts
        }));
    }

    // Verificar se email já existe
    emailExists(email) {
        const emails = this.getEmails();
        return emails.some(item => item.email === email);
    }

    // Salvar email no localStorage
    saveEmail(email) {
        const emails = this.getEmails();
        const newEntry = {
            email: email,
            timestamp: new Date().toISOString(),
            id: this.generateId()
        };
        
        emails.push(newEntry);
        localStorage.setItem(this.storageKey, JSON.stringify(emails));
    }

    // Obter lista de emails
    getEmails() {
        try {
            return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
        } catch (error) {
            console.error('Erro ao carregar emails:', error);
            return [];
        }
    }

    // Gerar ID único
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Mostrar notificação
    showNotification(message, type = 'info') {
        // Remover notificação existente
        const existingNotification = document.querySelector('.newsletter-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Criar nova notificação
        const notification = document.createElement('div');
        notification.className = `newsletter-notification newsletter-notification--${type}`;
        notification.innerHTML = `
            <div class="newsletter-notification__content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
                <span>${message}</span>
                <button class="newsletter-notification__close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // Adicionar ao DOM
        document.body.appendChild(notification);

        // Auto-remover após 5 segundos
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);

        // Animar entrada
        setTimeout(() => {
            notification.classList.add('newsletter-notification--show');
        }, 100);
    }

    // Configurar painel administrativo
    setupAdminPanel() {
        // Criar botão de acesso ao admin (apenas para demonstração)
        this.createAdminButton();
    }

    // Criar botão de admin (escondido, apenas para demonstração)
    createAdminButton() {
        // Adicionar listener para combinação de teclas (Ctrl+Shift+N)
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'N') {
                this.showAdminModal();
            }
        });

        // Adicionar botão discreto no footer (apenas para demonstração)
        const footer = document.querySelector('footer');
        if (footer) {
            const adminBtn = document.createElement('button');
            adminBtn.innerHTML = '📧';
            adminBtn.className = 'newsletter-admin-btn';
            adminBtn.title = 'Gerenciar Newsletter (Admin)';
            adminBtn.onclick = () => this.showAdminModal();
            footer.appendChild(adminBtn);
        }
    }

    // Mostrar modal administrativo
    showAdminModal() {
        const emails = this.getEmails();
        
        const modal = document.createElement('div');
        modal.className = 'newsletter-modal';
        modal.innerHTML = `
            <div class="newsletter-modal__content">
                <div class="newsletter-modal__header">
                    <h3>Gerenciar Newsletter</h3>
                    <button class="newsletter-modal__close" onclick="this.closest('.newsletter-modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="newsletter-modal__body">
                    <div class="newsletter-stats">
                        <div class="newsletter-stat">
                            <span class="newsletter-stat__number">${emails.length}</span>
                            <span class="newsletter-stat__label">Inscritos</span>
                        </div>
                        <div class="newsletter-stat">
                            <span class="newsletter-stat__number">${this.getEmailsThisMonth()}</span>
                            <span class="newsletter-stat__label">Este mês</span>
                        </div>
                    </div>
                    
                    <div class="newsletter-actions">
                        <button class="btn btn-primary" onclick="newsletterManager.exportEmails('csv')">
                            <i class="fas fa-download"></i> Exportar CSV
                        </button>
                        <button class="btn btn-secondary" onclick="newsletterManager.exportEmails('json')">
                            <i class="fas fa-download"></i> Exportar JSON
                        </button>
                        <button class="btn btn-danger" onclick="newsletterManager.clearEmails()">
                            <i class="fas fa-trash"></i> Limpar Lista
                        </button>
                    </div>
                    
                    <div class="newsletter-list">
                        <h4>Emails Cadastrados:</h4>
                        <div class="newsletter-emails">
                            ${emails.length === 0 ? 
                                '<p class="newsletter-empty">Nenhum email cadastrado ainda.</p>' :
                                emails.map(item => `
                                    <div class="newsletter-email-item">
                                        <span class="newsletter-email">${item.email}</span>
                                        <span class="newsletter-date">${new Date(item.timestamp).toLocaleDateString('pt-BR')}</span>
                                        <button class="newsletter-remove" onclick="newsletterManager.removeEmail('${item.id}')" title="Remover">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                `).join('')
                            }
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        
        // Animar entrada
        setTimeout(() => {
            modal.classList.add('newsletter-modal--show');
        }, 100);
    }

    // Contar emails deste mês
    getEmailsThisMonth() {
        const emails = this.getEmails();
        const now = new Date();
        const thisMonth = now.getMonth();
        const thisYear = now.getFullYear();
        
        return emails.filter(item => {
            const date = new Date(item.timestamp);
            return date.getMonth() === thisMonth && date.getFullYear() === thisYear;
        }).length;
    }

    // Exportar emails
    exportEmails(format = 'csv') {
        const emails = this.getEmails();
        
        if (emails.length === 0) {
            this.showNotification('Nenhum email para exportar', 'error');
            return;
        }

        let content, filename, mimeType;

        if (format === 'csv') {
            content = 'Email,Data de Cadastro\n' + 
                     emails.map(item => `${item.email},${new Date(item.timestamp).toLocaleDateString('pt-BR')}`).join('\n');
            filename = `newsletter-argoeste-${new Date().toISOString().split('T')[0]}.csv`;
            mimeType = 'text/csv';
        } else {
            content = JSON.stringify(emails, null, 2);
            filename = `newsletter-argoeste-${new Date().toISOString().split('T')[0]}.json`;
            mimeType = 'application/json';
        }

        // Criar e baixar arquivo
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showNotification(`Lista exportada como ${format.toUpperCase()}`, 'success');
    }

    // Remover email específico
    removeEmail(id) {
        if (!confirm('Tem certeza que deseja remover este email?')) return;
        
        const emails = this.getEmails();
        const filteredEmails = emails.filter(item => item.id !== id);
        
        localStorage.setItem(this.storageKey, JSON.stringify(filteredEmails));
        this.updateSubscriberCount();
        
        // Recarregar modal
        document.querySelector('.newsletter-modal').remove();
        this.showAdminModal();
        
        this.showNotification('Email removido com sucesso', 'success');
    }

    // Limpar todos os emails
    clearEmails() {
        if (!confirm('Tem certeza que deseja limpar toda a lista de emails? Esta ação não pode ser desfeita.')) return;
        
        localStorage.removeItem(this.storageKey);
        localStorage.removeItem(this.rateLimitKey);
        this.updateSubscriberCount();
        
        // Recarregar modal
        document.querySelector('.newsletter-modal').remove();
        this.showAdminModal();
        
        this.showNotification('Lista de emails limpa com sucesso', 'success');
    }

    // Método removido - contador público não deve existir
    updateSubscriberCount() {
        // Contador público removido por questões de privacidade
        // Informações de inscritos são visíveis apenas no painel administrativo
    }

    // Enviar notificação por email usando mailto
    async sendEmailNotification(userEmail) {
        try {
            // Mostrar modal de confirmação antes de abrir o mailto
            const shouldSendEmail = await this.showEmailConfirmationModal(userEmail);
            
            if (shouldSendEmail) {
                this.openMailtoLink(userEmail);
            }
            
            console.log('Processo de notificação por email concluído');

        } catch (error) {
            console.error('Erro ao processar notificação por email:', error);
            // Não mostrar erro para o usuário, apenas logar
        }
    }

    // Mostrar modal de confirmação para envio de email
    showEmailConfirmationModal(userEmail) {
        return new Promise((resolve) => {
            const modal = document.createElement('div');
            modal.className = 'newsletter-email-modal';
            modal.innerHTML = `
                <div class="newsletter-email-modal__content">
                    <div class="newsletter-email-modal__header">
                        <h3>📧 Notificar Cadastro</h3>
                    </div>
                    <div class="newsletter-email-modal__body">
                        <p>Deseja abrir seu cliente de email para notificar sobre o novo cadastro?</p>
                        <p><strong>Email cadastrado:</strong> ${userEmail}</p>
                        <p><small>Isso abrirá seu cliente de email padrão com uma mensagem pré-formatada.</small></p>
                    </div>
                    <div class="newsletter-email-modal__actions">
                        <button class="btn btn-primary" onclick="this.closest('.newsletter-email-modal').dispatchEvent(new CustomEvent('confirm', {detail: true}))">
                            <i class="fas fa-envelope"></i> Abrir Email
                        </button>
                        <button class="btn btn-secondary" onclick="this.closest('.newsletter-email-modal').dispatchEvent(new CustomEvent('confirm', {detail: false}))">
                            <i class="fas fa-times"></i> Pular
                        </button>
                    </div>
                </div>
            `;

            // Adicionar estilos do modal
            if (!document.querySelector('#newsletter-email-modal-styles')) {
                const styles = document.createElement('style');
                styles.id = 'newsletter-email-modal-styles';
                styles.textContent = `
                    .newsletter-email-modal {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.5);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 10000;
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    }
                    
                    .newsletter-email-modal--show {
                        opacity: 1;
                    }
                    
                    .newsletter-email-modal__content {
                        background: white;
                        border-radius: 12px;
                        padding: 0;
                        max-width: 500px;
                        width: 90%;
                        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                        transform: translateY(-20px);
                        transition: transform 0.3s ease;
                    }
                    
                    .newsletter-email-modal--show .newsletter-email-modal__content {
                        transform: translateY(0);
                    }
                    
                    .newsletter-email-modal__header {
                        padding: 20px 24px 0;
                        border-bottom: none;
                    }
                    
                    .newsletter-email-modal__header h3 {
                        margin: 0;
                        color: var(--primary-color, #2563eb);
                        font-size: 1.25rem;
                        font-weight: 600;
                    }
                    
                    .newsletter-email-modal__body {
                        padding: 16px 24px;
                    }
                    
                    .newsletter-email-modal__body p {
                        margin: 0 0 12px 0;
                        color: #374151;
                        line-height: 1.5;
                    }
                    
                    .newsletter-email-modal__body small {
                        color: #6b7280;
                        font-size: 0.875rem;
                    }
                    
                    .newsletter-email-modal__actions {
                        padding: 16px 24px 24px;
                        display: flex;
                        gap: 12px;
                        justify-content: flex-end;
                    }
                    
                    .newsletter-email-modal .btn {
                        padding: 10px 20px;
                        border: none;
                        border-radius: 8px;
                        font-weight: 500;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        transition: all 0.2s ease;
                        font-size: 0.875rem;
                    }
                    
                    .newsletter-email-modal .btn-primary {
                        background: var(--primary-color, #2563eb);
                        color: white;
                    }
                    
                    .newsletter-email-modal .btn-primary:hover {
                        background: var(--primary-dark, #1d4ed8);
                        transform: translateY(-1px);
                    }
                    
                    .newsletter-email-modal .btn-secondary {
                        background: #f3f4f6;
                        color: #374151;
                    }
                    
                    .newsletter-email-modal .btn-secondary:hover {
                        background: #e5e7eb;
                    }
                `;
                document.head.appendChild(styles);
            }

            // Event listeners
            modal.addEventListener('confirm', (e) => {
                modal.classList.remove('newsletter-email-modal--show');
                setTimeout(() => {
                    modal.remove();
                    resolve(e.detail);
                }, 300);
            });

            // Fechar ao clicar fora
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.dispatchEvent(new CustomEvent('confirm', {detail: false}));
                }
            });

            document.body.appendChild(modal);
            
            // Animar entrada
            setTimeout(() => {
                modal.classList.add('newsletter-email-modal--show');
            }, 100);
        });
    }

    // Abrir link mailto com informações do cadastro
    openMailtoLink(userEmail) {
        const now = new Date();
        const date = now.toLocaleDateString('pt-BR');
        const time = now.toLocaleTimeString('pt-BR');
        const totalSubscribers = this.getEmails().length;
        
        const subject = encodeURIComponent('Novo cadastro na Newsletter - Argoeste');
        const body = encodeURIComponent(`Olá!

O email ${userEmail} se cadastrou para receber a newsletter da Argoeste!

📊 Detalhes do cadastro:
• Email: ${userEmail}
• Data: ${date}
• Horário: ${time}
• Total de inscritos: ${totalSubscribers}

Este email foi gerado automaticamente pelo sistema de newsletter do site da Argoeste.

Atenciosamente,
Sistema Newsletter Argoeste`);
        
        const mailtoLink = `mailto:contato@argoeste.com.br?subject=${subject}&body=${body}`;
        
        // Abrir cliente de email
        window.location.href = mailtoLink;
        
        console.log('Link mailto aberto:', mailtoLink);
    }

    // Método público para obter estatísticas
    getStats() {
        const emails = this.getEmails();
        return {
            total: emails.length,
            thisMonth: this.getEmailsThisMonth(),
            emails: emails
        };
    }
}

// Inicializar o gerenciador da newsletter quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    window.newsletterManager = new NewsletterManager();
    
    // Função de teste para debug no console
    window.testEmailValidation = function(email) {
        console.log('=== TESTE MANUAL DE EMAIL ===');
        console.log('Testando email:', email);
        console.log('Resultado:', window.newsletterManager.validateEmail(email));
        console.log('=== FIM TESTE MANUAL ===');
    };
    
    console.log('Newsletter Manager carregado. Use testEmailValidation("seu@email.com") para testar.');
});

console.info('Sistema de Newsletter da Argoeste carregado');
console.info('Para acessar o painel administrativo: Ctrl+Shift+N ou clique no ícone 📧 no footer');
console.info('Para debug: use window.newsletterManager no console');