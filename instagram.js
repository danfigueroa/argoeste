// Instagram Feed Integration
document.addEventListener('DOMContentLoaded', function () {
    // Instagram API Configuration
    const instagramSection = document.getElementById('instagram')
    const instagramGrid = document.querySelector('.instagram-grid')

    // Instagram Graph API Access Token (Precisa ser substituído pelo token real)
    // Este token deve ser gerado seguindo as instruções em: https://developers.facebook.com/docs/instagram-basic-display-api/getting-started
    const accessToken = 'SEU_ACCESS_TOKEN_AQUI'

    // ID do usuário do Instagram (Precisa ser substituído pelo ID real)
    const userId = 'ID_DO_USUARIO_INSTAGRAM'

    // Número de fotos a serem exibidas
    const count = 6

    // URL da API do Instagram
    const apiUrl = `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url&access_token=${accessToken}&limit=${count}`

    // Função para carregar as fotos do Instagram
    function loadInstagramFeed() {
        // Verificar se o token foi configurado
        if (accessToken === 'SEU_ACCESS_TOKEN_AQUI') {
            console.warn(
                'Configure o token de acesso do Instagram no arquivo instagram.js'
            )
            return
        }

        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar o feed do Instagram')
                }
                return response.json()
            })
            .then((data) => {
                // Limpar o grid existente
                instagramGrid.innerHTML = ''

                // Adicionar cada foto ao grid
                data.data.forEach((post) => {
                    // Verificar se é uma imagem (ignorar vídeos)
                    if (
                        post.media_type === 'IMAGE' ||
                        post.media_type === 'CAROUSEL_ALBUM'
                    ) {
                        const imageUrl = post.media_url
                        const postUrl = post.permalink
                        const caption = post.caption ? post.caption : ''

                        // Criar elemento para a foto
                        const postElement = document.createElement('div')
                        postElement.className = 'instagram-item'

                        // Criar link para o post original
                        const linkElement = document.createElement('a')
                        linkElement.href = postUrl
                        linkElement.target = '_blank'
                        linkElement.title = caption

                        // Criar elemento de imagem
                        const imgElement = document.createElement('img')
                        imgElement.src = imageUrl
                        imgElement.alt = 'Post do Instagram da Argoeste'
                        imgElement.loading = 'lazy'

                        // Montar a estrutura do elemento
                        linkElement.appendChild(imgElement)
                        postElement.appendChild(linkElement)
                        instagramGrid.appendChild(postElement)
                    }
                })
            })
            .catch((error) => {
                console.error('Erro ao carregar o feed do Instagram:', error)

                // Em caso de erro, manter os placeholders
                const placeholders = document.querySelectorAll(
                    '.instagram-placeholder'
                )
                placeholders.forEach((placeholder) => {
                    placeholder.style.display = 'flex'
                })
            })
    }

    // Tentar carregar o feed do Instagram
    loadInstagramFeed()

    // Instruções para obter o token de acesso
    console.info('Para configurar o feed do Instagram, você precisa:')
    console.info('1. Criar uma conta de desenvolvedor no Facebook')
    console.info('2. Criar um aplicativo no Facebook Developer Portal')
    console.info('3. Configurar o Instagram Basic Display API')
    console.info('4. Gerar um token de acesso de longa duração')
    console.info(
        '5. Substituir o valor da variável accessToken no arquivo instagram.js'
    )
})
