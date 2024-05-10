function appendMessage(role, message, index) {
  const chatMessages = document.getElementById("chat-messages");
  const messageContainer = document.createElement("div");
  messageContainer.classList.add(
    role === "user" ? "user-message" : "response-message"
  );

  // Criar um contêiner para o editor CKEditor
  const editorContainer = document.createElement("div");
  editorContainer.classList.add("ckeditor-editor");
  messageContainer.appendChild(editorContainer);

  chatMessages.appendChild(messageContainer);

  // Inicializar o editor CKEditor dentro do contêiner criado
  initializeCKEditor(editorContainer).then((editor) => {
    // Definir o conteúdo do editor CKEditor com a mensagem da IA
    editor.setData(message);
  });

  // Criar botões "up" e "down"
  const upButton = createUpDownButton(index, "up");
  const downButton = createUpDownButton(index, "down");

  messageContainer.appendChild(upButton);
  messageContainer.appendChild(downButton);

  // Adicionar botão de exclusão
  const deleteButton = createDeleteButton(index);
  messageContainer.appendChild(deleteButton);

  scrollToBottom();

  // Salvar as mensagens no localStorage a cada 5 segundos
  startSaveMessagesTimer();
}

function initializeCKEditor(container) {
  return BalloonEditor.create(container).catch((error) => {
    console.error(error);
  });
}

function createUpDownButton(index, direction) {
  const button = document.createElement("button");
  button.innerHTML = `<i class="ri-arrow-${direction}-line"></i>`;
  button.classList.add(direction);
  button.addEventListener("click", function () {
    moveMessage(index, direction);
  });
  return button;
}

function moveMessage(index, direction) {
  const savedMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];

  if (
    (direction === "up" && index === 0) ||
    (direction === "down" && index === savedMessages.length - 1)
  ) {
    return;
  }

  const temp = savedMessages[index];
  if (direction === "up") {
    savedMessages[index] = savedMessages[index - 1];
    savedMessages[index - 1] = temp;
  } else {
    savedMessages[index] = savedMessages[index + 1];
    savedMessages[index + 1] = temp;
  }

  localStorage.setItem("chatMessages", JSON.stringify(savedMessages));

  const chatMessages = document.getElementById("chat-messages");
  const messageContainers = chatMessages.querySelectorAll(".response-message");

  if (messageContainers[index]) {
    messageContainers[index].classList.add("fade-out");

    setTimeout(() => {
      while (chatMessages.firstChild) {
        chatMessages.removeChild(chatMessages.firstChild);
      }
      savedMessages.forEach((message, idx) => {
        appendMessage(message.role, message.content, idx);
      });
    }, 300);
  }
}

function scrollToBottom() {
  const chatMessages = document.getElementById("chat-messages");
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showLoadingMessage() {
  const chatMessages = document.getElementById("chat-messages");
  const loadingImage = document.createElement("img");
  loadingImage.src = "src/img/loading_loop.gif";
  loadingImage.classList.add("loading-image");
  chatMessages.appendChild(loadingImage);
}

function hideLoadingMessage() {
  const loadingImage = document.querySelector(".loading-image");
  if (loadingImage) {
    loadingImage.remove();
  }
}

function createMessageElement(text, className) {
  const messageElement = document.createElement("div");
  messageElement.textContent = text;
  messageElement.classList.add(className);
  return messageElement;
}

function createDeleteButton(index) {
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="ri-delete-bin-7-line"></i>';
  deleteButton.classList.add("delete", "hideToPrint");
  deleteButton.addEventListener("click", function () {
    const messageContainer = deleteButton.parentElement;
    messageContainer.remove();

    removeMessageFromLocalStorage(index);
  });
  return deleteButton;
}

function removeMessageFromLocalStorage(index) {
  const savedMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];

  savedMessages.splice(index, 1);

  localStorage.setItem("chatMessages", JSON.stringify(savedMessages));
}

// Funções para gerenciar o temporizador de salvamento de mensagens
let saveMessagesTimer;

function startSaveMessagesTimer() {
  if (!saveMessagesTimer) {
    saveMessagesTimer = setInterval(saveMessagesToLocalStorage, 3000); // 5000 milissegundos = 5 segundos
  }
}

function stopSaveMessagesTimer() {
  clearInterval(saveMessagesTimer);
  saveMessagesTimer = null;
}

function saveMessagesToLocalStorage() {
  const chatMessages = document.querySelectorAll(".response-message");
  const savedMessages = [];

  chatMessages.forEach((messageContainer) => {
    const role = messageContainer.classList.contains("user-message")
      ? "user"
      : "response";
    const content =
      messageContainer.querySelector(".ckeditor-editor").innerHTML;
    savedMessages.push({ role, content });
  });

  localStorage.setItem("chatMessages", JSON.stringify(savedMessages));
}

export { appendMessage, showLoadingMessage, hideLoadingMessage };
