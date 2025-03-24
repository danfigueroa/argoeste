// Instagram Feed Integration using a public feed approach
document.addEventListener('DOMContentLoaded', function () {
    // Instagram Configuration
    const instagramGrid = document.querySelector('.instagram-grid')
    const instagramUsername = 'argoeste' // Nome de usuário do Instagram

    // Função para carregar o feed do Instagram usando um serviço público
    function loadInstagramFeed() {
        // Limpar o grid existente
        instagramGrid.innerHTML = ''

        // Como a API oficial do Instagram requer autenticação complexa,
        // vamos usar uma abordagem alternativa para demonstração
        // Nota: Em produção, é recomendado usar a API oficial do Instagram com autenticação adequada

        // Para fins de demonstração, vamos criar uma visualização simulada
        // que mostra como as imagens apareceriam quando integradas

        // Criar 6 itens de demonstração com imagens de placeholder
        for (let i = 0; i < 6; i++) {
            // Criar elemento para a foto
            const postElement = document.createElement('div')
            postElement.className = 'instagram-item'

            // Criar link para o perfil do Instagram
            const linkElement = document.createElement('a')
            linkElement.href = `https://www.instagram.com/${instagramUsername}/`
            linkElement.target = '_blank'

            // Criar elemento de imagem com placeholder colorido
            // Em produção, isso seria substituído por imagens reais do Instagram
            const imgElement = document.createElement('img')

            // Usar placeholders coloridos diferentes para cada item
            const colors = [
                '#E1306C', // Rosa Instagram
                '#833AB4', // Roxo Instagram
                '#405DE6', // Azul Instagram
                '#FD1D1D', // Vermelho Instagram
                '#F77737', // Laranja Instagram
                '#FCAF45', // Amarelo Instagram
            ]

            // Criar um canvas para gerar uma imagem de placeholder
            const canvas = document.createElement('canvas')
            canvas.width = 300
            canvas.height = 300
            const ctx = canvas.getContext('2d')

            // Preencher com a cor do Instagram
            ctx.fillStyle = colors[i]
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Adicionar o logo do Instagram
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
            ctx.font = 'bold 40px Arial'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText('Instagram', canvas.width / 2, canvas.height / 2 - 20)

            // Adicionar o nome do usuário
            ctx.font = 'normal 24px Arial'
            ctx.fillText(
                '@' + instagramUsername,
                canvas.width / 2,
                canvas.height / 2 + 20
            )

            // Converter o canvas para uma URL de dados
            imgElement.src = canvas.toDataURL('image/png')
            imgElement.alt = `Post do Instagram da ${instagramUsername}`
            imgElement.loading = 'lazy'

            // Montar a estrutura do elemento
            linkElement.appendChild(imgElement)
            postElement.appendChild(linkElement)
            instagramGrid.appendChild(postElement)

            // Remover os placeholders originais
            const placeholders = document.querySelectorAll(
                '.instagram-placeholder'
            )
            placeholders.forEach((placeholder) => {
                placeholder.style.display = 'none'
            })
        }

        // Adicionar uma mensagem informativa no console
        console.info('Demonstração de feed do Instagram carregada.')
        console.info(
            'Para implementar o feed real do Instagram, você precisará:'
        )
        console.info('1. Criar uma conta de desenvolvedor no Facebook')
        console.info('2. Configurar o Instagram Basic Display API')
        console.info(
            '3. Obter um token de acesso e implementar a autenticação adequada'
        )
    }

    // Carregar a demonstração do feed
    loadInstagramFeed()

    // Adicionar instruções para implementação real
    console.info('Instruções para implementação real do feed do Instagram:')
    console.info(
        '1. Acesse https://developers.facebook.com/ e crie uma conta de desenvolvedor'
    )
    console.info(
        '2. Crie um aplicativo e configure o Instagram Basic Display API'
    )
    console.info(
        '3. Siga a documentação oficial para obter um token de acesso: https://developers.facebook.com/docs/instagram-basic-display-api/getting-started'
    )
})
