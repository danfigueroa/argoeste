# Argoeste - Fábrica de Argamassa

Landing page moderna para a Argoeste, uma fábrica de argamassa, desenvolvida com HTML, CSS e JavaScript.

## Visão Geral

Esta landing page foi criada para exibir informações sobre a empresa Argoeste e seus produtos, além de facilitar o contato dos clientes através do WhatsApp.

## Características

-   Design moderno e responsivo
-   Seções para apresentação da empresa, produtos e contato
-   Integração com WhatsApp para contato direto com mensagem pré-programada
-   Localização da fábrica com Google Maps
-   Formulário de newsletter
-   Menu de navegação responsivo

## Estrutura do Projeto

```
├── index.html          # Estrutura HTML da landing page
├── styles.css          # Estilos CSS
├── script.js           # Funcionalidades JavaScript
├── .nojekyll           # Arquivo para desativar o processamento Jekyll no GitHub Pages
├── CNAME               # Arquivo para configurar domínio personalizado (quando necessário)
└── images/             # Diretório para imagens
```

## Personalização

Para personalizar a landing page com as informações oficiais da Argoeste:

1. Substitua as imagens de placeholder na pasta `images/` pelas imagens oficiais da empresa
2. Atualize o número de telefone para WhatsApp no arquivo `script.js`
3. Modifique o endereço no iframe do Google Maps em `index.html`
4. Atualize as informações de contato e descrições de produtos conforme necessário

## Implantação no GitHub Pages

Esta landing page está configurada para ser facilmente implantada no GitHub Pages. Siga os passos abaixo:

1. Faça o push do repositório para o GitHub
2. Acesse as configurações do repositório no GitHub
3. Na seção "GitHub Pages", selecione a branch principal (main ou master) como fonte
4. O site estará disponível em `https://[seu-usuario].github.io/argoeste/`

### Configurando um Domínio Personalizado

Para usar um domínio personalizado:

1. Adicione seu domínio no arquivo CNAME (remova os comentários)
2. Configure os registros DNS do seu domínio conforme a documentação do GitHub Pages
3. No GitHub, vá para as configurações do repositório e adicione seu domínio personalizado na seção GitHub Pages

## Licença

MIT License
