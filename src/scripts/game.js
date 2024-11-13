// Lista de personagens do jogo
let characters1 = [
  "Albert_Einstein", "Colisao", "Galileu", "Isaac_Newton", "Metros_segundos",
  "Retrogrado", "Sorvetao", "Sorvete", "Torriceli", "Velocidade_media"
];

let characters2 = [
  "Schrodinger", "Referencial", "Nicolaus", "Marie_Curie", "Inercia",
  "Gravidade", "Fisica_quantica", "Buraco_negro", "Atomo", "Acao_reacao"
];

// Definindo o conjunto de personagens inicial
let currentCharacters = characters1;

// Função para iniciar um novo jogo alternando o conjunto de personagens
const startNewGame = () => {
  currentCharacters = currentCharacters === characters1 ? characters2 : characters1;
  grid.innerHTML = "";
  loadGame();
  restartTimer();

  const modalEndGame = document.querySelector(".modal");
  if (modalEndGame) modalEndGame.remove();

  const playerName1 = localStorage.getItem("player1") || "Jogador";
  const playerName2 = localStorage.getItem("player2");

  const modalEndGameTitle = document.querySelector(".modal-title");
  if (playerName2) {
    modalEndGameTitle.innerHTML = `<span>Parabéns ${playerName1} & ${playerName2}! Vocês venceram!</span>`;
  } else {
    modalEndGameTitle.innerHTML = `<span>Parabéns ${playerName1}! Você venceu!</span>`;
  }
};

// Seleção de elementos HTML
const grid = document.querySelector(".grid");
const spanPlayer = document.querySelector(".player");
const timer = document.querySelector(".timer");
const body = document.querySelector("body");
const form = document.querySelector(".login-form");
const input = document.querySelector(".login-input");
const player2Input = document.querySelector(".player2-input");

// Função para criar um novo elemento HTML
const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

// Variáveis para armazenar as cartas viradas
let firstCard = "";
let secondCard = "";

// Função para verificar se o jogo terminou
const checkEndGame = () => {
  const disabledCards = document.querySelectorAll(".disabled-card");
  if (disabledCards.length === 20) {
    clearInterval(this.loop);
    const finishTime = timer.innerHTML;

    setTimeout(() => {
      const modalEndGame = createElement("div", "modal");
      const modalEndGameTitle = createElement("div", "modal-title");
      const modalEndGameContent = createElement("div", "modal-content");

      const spanMenu = createElement("i", "fa-solid fa-house fa-2xl");
      const spanRestart = createElement("i", "fa-solid fa-arrow-rotate-right fa-2xl");
      const spanNewGame = createElement("i", "fa-solid fa-chevron-right fa-2xl");

      const menu = document.createElement("a");
      const restart = document.createElement("a");
      const newGame = document.createElement("button");

      menu.setAttribute("href", "../../index.html");
      menu.appendChild(spanMenu);
      restart.appendChild(spanRestart);

      newGame.appendChild(spanNewGame);
      newGame.addEventListener("click", startNewGame);
      newGame.classList.add("modal-button");

      body.appendChild(modalEndGame);
      modalEndGame.appendChild(modalEndGameTitle);
      modalEndGame.appendChild(modalEndGameContent);

      const playerName1 = localStorage.getItem("player1") || "Jogador";
      const playerName2 = localStorage.getItem("player2");
      if (playerName2) {
        modalEndGameTitle.innerHTML = `<span>Parabéns ${playerName1} & ${playerName2}! Vocês venceram em ${finishTime}s</span>`;
      } else {
        modalEndGameTitle.innerHTML = `<span>Parabéns ${playerName1}! Você venceu em ${finishTime}s</span>`;
      }

      modalEndGameContent.appendChild(menu);
      modalEndGameContent.appendChild(restart).addEventListener("click", () => location.reload());
      modalEndGameContent.appendChild(newGame);

      document.querySelectorAll('.card').forEach(card => card.remove());

      // Salva o resultado do jogador no localStorage
      savePlayerResult(playerName1, finishTime);

    }, 400);
  }
};

// Função para verificar se as cartas viradas são iguais
const checkCards = () => {
  const firstCharacter = firstCard.getAttribute("data-character");
  const secondCharacter = secondCard.getAttribute("data-character");

  if (firstCharacter === secondCharacter) {
    firstCard.firstChild.classList.add("disabled-card");
    secondCard.firstChild.classList.add("disabled-card");
    firstCard = "";
    secondCard = "";
    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove("reveal-card");
      secondCard.classList.remove("reveal-card");
      firstCard = "";
      secondCard = "";
    }, 500);
  }
};

// Função para virar uma carta
const revealCard = ({ target }) => {
  if (target.parentNode.className.includes("reveal-card") || target.parentNode.className.includes("grid")) return;

  if (firstCard === "") {
    target.parentNode.classList.add("reveal-card");
    firstCard = target.parentNode;
  } else if (secondCard === "") {
    target.parentNode.classList.add("reveal-card");
    secondCard = target.parentNode;
    checkCards();
  }
};

// Função para criar uma carta de jogo
const createCard = (character) => {
  const card = createElement("div", "card");
  const front = createElement("div", "face front");
  const back = createElement("div", "face back");

  front.style.backgroundImage = `url('../images/${character}.png')`;
  front.setAttribute("draggable", "true");
  front.addEventListener("click", () => window.open(`../images/${character}.png`, "_blank"));
  front.addEventListener("dragstart", (event) => event.preventDefault());

  card.appendChild(front);
  card.appendChild(back);
  card.addEventListener("click", revealCard);
  card.setAttribute("data-character", character);

  return card;
};

// Função para carregar o jogo
const loadGame = () => {
  const duplicateCharacters = [...currentCharacters, ...currentCharacters];
  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
};

// Função para iniciar o cronômetro
const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);
};

// Função para reiniciar o cronômetro
const restartTimer = () => {
  clearInterval(this.loop);
  timer.innerHTML = "0";
  startTimer();
};

// Função para salvar o resultado do jogador no localStorage
const savePlayerResult = (playerName, finishTime) => {
  const players = JSON.parse(localStorage.getItem("playersRanking")) || [];
  players.push({ name: playerName, time: finishTime });
  localStorage.setItem("playersRanking", JSON.stringify(players));
};

// Ao carregar a janela, define o nome do jogador e carrega o jogo
window.onload = () => {
  const playerName1 = localStorage.getItem("player1") || "Jogador";
  const playerName2 = localStorage.getItem("player2");

  spanPlayer.innerHTML = playerName2 ? `${playerName1} & ${playerName2}` : playerName1;
  startTimer();
  loadGame();
};

// Event listener para o formulário de login
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const playerCount = document.querySelector("#player-count input:checked").value;

  if (input.value.length > 2) {
    if (playerCount === "1") {
      localStorage.setItem("player1", input.value);
      localStorage.removeItem("player2");
    } else if (playerCount === "2" && player2Input.value.length > 2) {
      localStorage.setItem("player1", input.value);
      localStorage.setItem("player2", player2Input.value);
    }
    
    window.location = "./src/pages/game.html";
  }
});