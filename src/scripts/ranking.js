// Função para carregar e exibir o ranking dos jogadores 
const loadRanking = () => {
  const rankingBody = document.getElementById("ranking-body");

  // Verifica se o rankingBody existe na página
  if (!rankingBody) {
    console.warn("Elemento '#ranking-body' não encontrado.");
    return;
  }

  // Recupera os dados do ranking do localStorage
  const playersRanking = JSON.parse(localStorage.getItem("playersRanking")) || [];

  // Ordena o ranking pelo tempo do menor para o maior
  playersRanking.sort((a, b) => parseInt(a.time) - parseInt(b.time));

  // Limpa o rankingBody antes de exibir os dados
  rankingBody.innerHTML = "";

  // Exibe o ranking
  playersRanking.forEach((player, index) => {
    const row = document.createElement("tr");

    // Adiciona as células na linha
    const positionCell = document.createElement("td");
    positionCell.textContent = index + 1;

    const nameCell = document.createElement("td");
    nameCell.textContent = player.name;

    const timeCell = document.createElement("td");
    timeCell.textContent = `${player.time}s`;

    // Adiciona as células à linha
    row.appendChild(positionCell);
    row.appendChild(nameCell);
    row.appendChild(timeCell);

    // Adiciona a linha ao corpo da tabela
    rankingBody.appendChild(row);
  });
};

// Chama a função para carregar o ranking ao carregar a página
window.onload = loadRanking;