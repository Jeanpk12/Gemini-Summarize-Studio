# Gemini Summarize Studio (Versão Prévia)

Gemini Summarize Studio é uma aplicação web projetada para facilitar a criação de resumos e roteiros de aula. Esta é uma versão prévia do projeto, que pode apresentar falhas e bugs. Novos recursos estão em desenvolvimento e, em breve, a interface será reimaginada para proporcionar uma melhor experiência para os usuários.

## Filosofia

<<<<<<< HEAD
Acreditamos que a verdadeira inteligência por trás de bons resumos reside nos estudantes. 
Nossa abordagem valoriza a colaboração entre humanos e tecnologia, reconhecendo que a IA pode ser uma ferramenta poderosa quando combinada com a criatividade e o conhecimento dos usuários. Em nossa aplicação, a IA é responsável por trazer uma base robusta para o resumo e o estudante fica encarregado de personalizá-lo e complementá-lo com as informações extraídas de seus estudos e pesquisas.

O logo do Gemini Summarize Studio reflete essa filosofia, representando um cérebro composto por metade matéria biológica e metade circuitos de computadores. Esta simbiose entre humano e tecnologia é o cerne de nossa missão.
=======
No Gemini Resume Composer, acreditamos que a verdadeira arte de criar resumos e roteiros de aulas reside na capacidade humana de sintetizar conhecimentos. Valorizamos a colaboração entre humanos e tecnologia, reconhecendo que a inteligência artificial pode potencializar essa habilidade quando combinada com a criatividade e o conhecimento dos usuários.

Em nossa abordagem, a IA atua como um parceiro, fornecendo uma base sólida para o resumo ou roteiro de aula. No entanto, é o estudante ou professor que assume o papel principal, personalizando e complementando essas informações com suas próprias experiências, pesquisas e insights.

O logo do Gemini Resume Composer simboliza essa sinergia entre o cérebro humano e os circuitos de computadores. Ele representa a ideia de que, juntos, humanos e tecnologia podem alcançar um nível de inteligência e criatividade que seria impossível de atingir individualmente. Essa simbiose é o cerne da nossa missão: capacitar os usuários a aproveitar ao máximo seu potencial enquanto utilizam a tecnologia de forma inteligente e responsável.
>>>>>>> d9700bf329778b712c7270f7ad37bef798ef8264

## Funcionalidades

- **Criação de Resumos e Roteiros:** Os usuários podem digitar ou colar tópicos que desejam incluir no texto e receber respostas geradas pela IA.
- **Personalização:** A aplicação permite aos usuários editar e personalizar as respostas geradas pela IA conforme necessário utilizando um editor de texto integrado à interface.
- **Flexibilidade:** A aplicação permite aos usuários apagar os tópicos gerados pela IA que não atendam às suas necessidades, bem como modificar a ordem dos tópicos.
- **Armazenamento Local:** Os resumos são salvos localmente, evitando que os usuários percam seus resumos.
- **Imprimir e Salvar em PDF:** Os usuários podem imprimir ou salvar seus resumos em PDF com facilidade.

## Estrutura do Projeto

O projeto Gemini Summarize Studio é organizado da seguinte maneira:

- **index.html:** Este arquivo contém a estrutura HTML da aplicação, incluindo a definição da interface do usuário e os links para os arquivos CSS e JavaScript necessários.
  
- **src/:** Este diretório contém todos os arquivos de recursos da aplicação, como estilos CSS, imagens e JavaScript.

    - **style/:** Este diretório contém arquivos CSS que definem o estilo da aplicação.

    - **img/:** Aqui estão localizadas as imagens utilizadas na interface, incluindo o logotipo e o ícone de carregamento.

    - **javascript/:** Todos os arquivos JavaScript da aplicação estão aqui.

        - **chat.js:** Este arquivo contém a lógica responsável por gerenciar a interação do usuário com a aplicação, incluindo o envio de mensagens e a exibição das respostas geradas pela IA.

        - **generativeAI.js:** Aqui está a integração com a API de IA generativa do Google, responsável por gerar as respostas em prosa com base nos tópicos fornecidos pelos usuários.

        - **utils.js:** Este arquivo contém funções utilitárias compartilhadas entre os outros arquivos JavaScript, como a renderização de mensagens na interface e o gerenciamento do armazenamento local.

- **README.md:** O arquivo README principal do projeto, contendo informações sobre a aplicação, sua filosofia, funcionalidades, tecnologias usadas, como contribuir e a licença.

## Tecnologias Utilizadas

- **HTML/CSS/JavaScript:** A aplicação é desenvolvida utilizando as linguagens padrão da web para criação de interfaces e interatividade.
- **CKEditor:** Utilizado para implementar um editor de texto rico para a entrada e exibição de mensagens.
- **Google Gemini API:** Integração com a API de IA generativa do Google para gerar respostas em prosa com base nos tópicos fornecidos pelos usuários.
- **Marked:** Utilizado para converter o texto gerado pela IA em HTML para exibição na interface do usuário.


## Funções dos Arquivos JavaScript

### chat.js

- **initializeChat():** Inicializa o chat, carrega mensagens salvas, adiciona event listeners para enviar mensagens e inicia a impressão do PDF.

- **sendMessage():** Envia a mensagem do usuário para a IA generativa, exibe a resposta na interface, salva a mensagem no armazenamento local e trata erros.

### utils.js

- **appendMessage(role, message, index):** Adiciona uma mensagem à interface do chat, inicializa o editor CKEditor, adiciona botões para manipular mensagens e salva mensagens no armazenamento local.

- **initializeCKEditor(container):** Inicializa o editor CKEditor dentro de um contêiner especificado.

- **createUpDownButton(index, direction):** Cria botões para mover as mensagens para cima ou para baixo na lista.

- **moveMessage(index, direction):** Move uma mensagem na lista de mensagens para cima ou para baixo, atualizando o armazenamento local e a interface do usuário.

- **scrollToBottom():** Rola a janela de mensagens para o final, para exibir a mensagem mais recente.

- **showLoadingMessage():** Exibe uma mensagem de carregamento na interface do usuário enquanto a IA está processando a resposta.

- **hideLoadingMessage():** Oculta a mensagem de carregamento após o processamento da resposta da IA.

- **createDeleteButton(index):** Cria um botão para excluir uma mensagem da lista e remove a mensagem do armazenamento local.

- **removeMessageFromLocalStorage(index):** Remove uma mensagem do armazenamento local com base no índice fornecido.

- **startSaveMessagesTimer():** Inicia um temporizador para salvar automaticamente as mensagens no armazenamento local a cada 3 segundos.

- **stopSaveMessagesTimer():** Para o temporizador de salvamento automático de mensagens.

- **saveMessagesToLocalStorage():** Salva as mensagens atualmente exibidas na interface do usuário no armazenamento local.
