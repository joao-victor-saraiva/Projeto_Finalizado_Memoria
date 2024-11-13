// Seleciona o input de login (campo de nome do jogador 1)
const input = document.querySelector(".login-input");

// Seleciona o botão de login (Play)
const button = document.querySelector(".login-button");

// Seleciona o formulário de login
const form = document.querySelector(".login-form");

// // Seleciona o botão de ranking corretamente pelo ID
const rankingButton = document.getElementById("ranking-button");

// Remove a propriedade 'disabled' para garantir que o botão esteja habilitado
rankingButton.removeAttribute("disabled");

// Adiciona um listener de evento de clique para o botão de ranking
rankingButton.addEventListener("click", function() {
    // Redireciona para a página de ranking
    window.location.href = "./src/pages/ranking.html";
});

// Seleciona o checkbox para alternar entre modo claro e escuro
const checkbox = document.querySelector("#checkbox");

// Seleciona o body da página (utilizado para aplicar tema claro/escuro)
const body = document.querySelector("body");

// Verifica se o sistema operacional está configurado no modo escuro
const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;

// Seleciona todos os inputs que controlam a quantidade de jogadores (radio buttons)
const playerCountInputs = document.querySelectorAll("#player-count input");

// Seleciona o input do jogador 2 (se o jogo for para 2 jogadores)
const player2Input = document.querySelector(".player2-input");

// Função para limpar os nomes dos jogadores salvos no localStorage
const clearPlayerNames = () => {
    // Remove os nomes dos jogadores armazenados (player1 e player2)
    localStorage.removeItem("player1");
    localStorage.removeItem("player2");
};

// Verifica se o caminho da página é a tela de login (index.html)
if (window.location.pathname === "/index.html") {
    clearPlayerNames(); // Se estiver na tela de login, limpa os nomes salvos
}

// Função para validar os inputs e habilitar o botão de login (Play)
const validarInputs = () => {
    // Pega o valor do input de número de jogadores selecionado (1 ou 2)
    const playerCount = document.querySelector("#player-count input:checked").value;

    // Verifica se o nome do jogador 1 tem mais de 2 caracteres
    const isPlayer1Valid = input.value.length > 2;

    // Se o jogo for para 2 jogadores, verifica se o nome do jogador 2 também é válido
    const isPlayer2Valid = playerCount === "2" ? player2Input.value.length > 2 : true;

    // Determina se o botão de login (Play) deve ser habilitado
    const isButtonEnabled = isPlayer1Valid && isPlayer2Valid;

    // Se as condições forem satisfeitas, habilita o botão; caso contrário, desabilita
    if (isButtonEnabled) {
        button.removeAttribute("disabled");
    } else {
        button.setAttribute("disabled", "");
    }
};

// Adiciona um event listener para cada input de quantidade de jogadores (1 ou 2)
// Atualiza a exibição do campo do jogador 2 quando o número de jogadores é alterado
playerCountInputs.forEach(input => input.addEventListener("click", () => {
    // Se o jogo for para 2 jogadores, exibe o campo do jogador 2; caso contrário, esconde-o
    player2Input.style.display = document.querySelector("#player2").checked ? "block" : "none";
    validarInputs(); // Valida os inputs novamente após a mudança
}));

// Adiciona um event listener para o input do nome do jogador 1
// Sempre que o nome for alterado, valida os inputs
input.addEventListener("input", validarInputs);

// Adiciona um event listener para o input do nome do jogador 2
// Sempre que o nome do jogador 2 for alterado, valida os inputs
player2Input.addEventListener("input", validarInputs);

// Event listener para a submissão do formulário de login
form.addEventListener("submit", (event) => {
    event.preventDefault(); // Previne o comportamento padrão do formulário (não recarrega a página)

    // Pega o valor do número de jogadores (1 ou 2)
    const playerCount = document.querySelector("#player-count input:checked").value;

    // Verifica se o nome do jogador 1 tem mais de 2 caracteres
    if (input.value.length > 2) {
        // Se for apenas 1 jogador, salva o nome do jogador 1 e remove o nome do jogador 2
        if (playerCount === "1") {
            localStorage.setItem("player1", input.value);
            localStorage.removeItem("player2");
        } 
        // Se forem 2 jogadores, salva os nomes de ambos
        else if (playerCount === "2" && player2Input.value.length > 2) {
            localStorage.setItem("player1", input.value);
            localStorage.setItem("player2", player2Input.value);
        }
        // Redireciona para a página do jogo
        window.location = "./src/pages/game.html";
    }
});

// Event listener para o clique no botão de login (Play)
// Executa a mesma função de salvar os nomes dos jogadores e redirecionar para o jogo
button.addEventListener("click", () => {
    const playerCount = document.querySelector("#player-count input:checked").value;
    if (input.value.length > 2 && playerCount === "1") {
        localStorage.setItem("player1", input.value);
        localStorage.removeItem("player2");
        window.location = "./src/pages/game.html";
    }
});

// Event listener para alternar entre tema claro e escuro
checkbox.addEventListener("change", () => {
    // Alterna a classe 'dark' no body (modo escuro)
    body.classList.toggle("dark");

    // Alterna a classe 'dark' nos campos de input (modo escuro)
    input.classList.toggle("dark");
    player2Input.classList.toggle("dark");
});