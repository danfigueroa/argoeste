// Instagram Widget Manager
// Gerencia o widget do SnapWidget e fallback personalizado

document.addEventListener('DOMContentLoaded', function() {
    const widgetContainer = document.querySelector('.instagram-widget-container');
    const fallbackGrid = document.getElementById('instagram-fallback');
    const widget = document.querySelector('.snapwidget-widget');
    
    // Função para verificar se o widget carregou
    function checkWidgetLoad() {
        setTimeout(() => {
            // Se o widget não carregou ou não está visível, mostrar fallback
            if (!widget || widget.offsetHeight === 0) {
                console.log('Widget do Instagram não carregou, usando fallback');
                showFallback();
            } else {
                console.log('Widget do Instagram carregado com sucesso');
                // Adicionar responsividade ao widget
                makeWidgetResponsive();
            }
        }, 3000); // Aguarda 3 segundos para o widget carregar
    }
    
    // Função para mostrar o fallback
    function showFallback() {
        if (widgetContainer) {
            widgetContainer.style.display = 'none';
        }
        if (fallbackGrid) {
            fallbackGrid.style.display = 'grid';
        }
    }
    
    // Função para tornar o widget responsivo
    function makeWidgetResponsive() {
        function adjustWidgetHeight() {
            const screenWidth = window.innerWidth;
            let newHeight;
            
            if (screenWidth <= 480) {
                newHeight = '300px'; // Mobile
            } else if (screenWidth <= 768) {
                newHeight = '350px'; // Tablet
            } else {
                newHeight = '400px'; // Desktop
            }
            
            if (widget) {
                widget.style.height = newHeight;
            }
        }
        
        // Ajustar altura inicial
        adjustWidgetHeight();
        
        // Ajustar altura quando a janela for redimensionada
        window.addEventListener('resize', adjustWidgetHeight);
    }
    
    // Verificar carregamento do widget
    checkWidgetLoad();
    
    // Fallback adicional: se após 5 segundos ainda não carregou
    setTimeout(() => {
        if (widget && widget.offsetHeight === 0) {
            showFallback();
        }
    }, 5000);
});

// Configuração para criar um widget personalizado do SnapWidget
// Para usar um widget real, você precisa:
// 1. Ir para https://snapwidget.com/
// 2. Conectar sua conta do Instagram
// 3. Configurar o widget (6 fotos, layout grid)
// 4. Copiar o código embed e substituir o ID no iframe

console.info('Instagram Widget Manager carregado');
console.info('Para configurar um widget real do Instagram:');
console.info('1. Acesse https://snapwidget.com/');
console.info('2. Conecte sua conta do Instagram @argoeste');
console.info('3. Configure o widget para mostrar 6 fotos em grid');
console.info('4. Substitua o ID 1088847 no iframe pelo ID real do seu widget');