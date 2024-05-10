import { initializeGenerativeAI } from "./generativeAI.js";
import { appendMessage, showLoadingMessage, hideLoadingMessage } from "./utils.js";

document.addEventListener("DOMContentLoaded", initializeChat);

async function initializeChat() {
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");
  const printPdfBtn = document.getElementById("print-pdf-btn");

  let chat;

  // Carregar mensagens do localStorage, se houver
  const savedMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
  savedMessages.forEach((message, index) => {
    appendMessage(message.role, message.content, index);
  });

  sendBtn.addEventListener("click", sendMessage);
  userInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });

  printPdfBtn.addEventListener("click", function () {
    window.print();
  });

  async function sendMessage() {
    const topic = userInput.value.trim();
    if (!topic) return;

    userInput.value = "";
    sendBtn.innerHTML = '<i class="ri-loader-fill rotate"></i>';

    showLoadingMessage();

    try {
      if (!chat) {
        chat = await initializeGenerativeAI();
      }

      const formattedTopic = `Sua tarefa é criar um texto resumindo: ${topic}`;

      const response = await chat.sendMessage(formattedTopic);
      const textResponse = await response.response.text();

      const htmlResponse = marked.parse(textResponse);

      appendMessage("model", htmlResponse);

      // Salvar a nova mensagem no localStorage
      const newMessage = { role: "model", content: htmlResponse };
      savedMessages.push(newMessage);
      localStorage.setItem("chatMessages", JSON.stringify(savedMessages));
      sendBtn.innerHTML = '<i class="ri-pencil-line"></i>';
      sendBtn.querySelector("i").classList.remove("rotate");

      hideLoadingMessage();
    } catch (error) {
      if (error.status === 503) {
        console.log(
          "Erro 503: O servidor está sobrecarregado. Tentando novamente em 5 segundos..."
        );
        setTimeout(sendMessage, 5000);
      } else {
        console.error("Erro ao enviar mensagem:", error);
      }
    }
  }
}
