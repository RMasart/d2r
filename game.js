document.getElementById('startGame').addEventListener('click', startGame);

let currentPhase = "setup"; // setup, player1Turn, player2Turn, gameOver
let currentPlayer = 1;
let player1Grid, player2Grid;

function startGame() {
    player1Grid = createEmptyGrid();
    player2Grid = createEmptyGrid();
    showGridSetup(1); // Joueur 1 configure sa grille
}

function createEmptyGrid() {
    const grid = [];
    for (let i = 0; i < 4; i++) { // 4 lignes
        const row = [];
        for (let j = 0; j < 4; j++) { // 4 colonnes
            row.push('-'); // '-' représente une case vide
        }
        grid.push(row);
    }
    return grid;
}

function addAccueilButton(container) {
    const accueilButton = document.createElement('a');
    accueilButton.textContent = "Accueil";
    accueilButton.href = "menu.html";
    accueilButton.className = "btn accueil-btn"; // Classe CSS personnalisée pour le style
    container.appendChild(accueilButton);
}

function showGridSetup(player) {
    currentPhase = "setup";
    const container = document.querySelector('.container');
    container.innerHTML = '';
    addAccueilButton(container);

    const title = document.createElement('h1');
    title.textContent = `Joueur ${player}, placez vos navires`;
    container.appendChild(title);

    const grid = document.createElement('div');
    grid.id = 'grid';
    grid.className = 'grid';
    container.appendChild(grid);

    const errorMessage = document.createElement('p');
    errorMessage.id = 'errorMessage';
    errorMessage.style.color = 'red';
    container.appendChild(errorMessage);

    renderGrid(player === 1 ? player1Grid : player2Grid, true);

    const finishButton = document.createElement('button');
    finishButton.textContent = "Terminer";
    finishButton.className = "btn";
    finishButton.addEventListener('click', () => {
        const currentGrid = player === 1 ? player1Grid : player2Grid;
        if (countShips(currentGrid) === 4) { // Validation : 4 bateaux
            if (player === 1) {
                showGridSetup(2);
            } else {
                startTurn(1);
            }
        } else {
            const errorMessage = document.getElementById('errorMessage');
            errorMessage.textContent = "Vous devez placer exactement 4 bateaux avant de continuer.";
        }
    });
    container.appendChild(finishButton);
}

function countShips(grid) {
    return grid.flat().filter(cell => cell === '@').length; // Compte le nombre de '@'
}

function renderGrid(grid, setupMode = false) {
    const gridContainer = document.getElementById('grid');
    gridContainer.innerHTML = '';
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            if (grid[i][j] === '@') cell.classList.add('ship');
            cell.dataset.row = i;
            cell.dataset.col = j;

            if (setupMode) {
                cell.addEventListener('click', () => placeShip(grid, i, j));
            }
            gridContainer.appendChild(cell);
        }
    }
}

function placeShip(grid, row, col) {
    if (grid[row][col] === '@') {
        grid[row][col] = '-';
    } else {
        grid[row][col] = '@';
    }
    renderGrid(grid, true);
}

function startTurn(player) {
    currentPhase = `player${player}Turn`;
    const enemyGrid = player === 1 ? player2Grid : player1Grid;
    const container = document.querySelector('.container');
    container.innerHTML = '';
    addAccueilButton(container);

    const title = document.createElement('h1');
    title.textContent = `Tour du Joueur ${player}`;
    container.appendChild(title);

    const grid = document.createElement('div');
    grid.id = 'grid';
    grid.className = 'grid';
    container.appendChild(grid);

    renderGameGrid(enemyGrid, player);
}

function renderGameGrid(grid, player) {
    const gridContainer = document.getElementById('grid');
    gridContainer.innerHTML = '';
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';

            if (grid[i][j] === 'X') {
                cell.classList.add('hit');
                cell.textContent = 'X';
            } else if (grid[i][j] === 'O') {
                cell.classList.add('miss');
                cell.textContent = 'O';
            } else if (grid[i][j] === '@' && currentPhase.includes('Turn')) {
                cell.classList.add('hidden');
            }

            if (grid[i][j] === '-' || grid[i][j] === '@') {
                cell.addEventListener('click', () => fire(grid, i, j, player));
            }
            gridContainer.appendChild(cell);
        }
    }
}

function fire(grid, row, col, player) {
    if (grid[row][col] === '@') {
        grid[row][col] = 'X'; // Touche
        alert(`Joueur ${player} : Touché !`);
    } else if (grid[row][col] === '-') {
        grid[row][col] = 'O'; // Manqué
        alert(`Joueur ${player} : Manqué !`);
    }

    if (checkVictory(grid)) {
        showVictory(player);
    } else {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        startTurn(currentPlayer);
    }
}

function checkVictory(grid) {
    return !grid.flat().includes('@'); // Si aucun '@', la partie est gagnée
}

function showVictory(player) {
    currentPhase = "gameOver";
    const container = document.querySelector('.container');
    container.innerHTML = '';
    addAccueilButton(container);

    const title = document.createElement('h1');
    title.textContent = `Joueur ${player} a gagné ! 🎉`;
    container.appendChild(title);

    const replayButton = document.createElement('button');
    replayButton.textContent = "Rejouer";
    replayButton.className = "btn";
    replayButton.addEventListener('click', startGame);
    container.appendChild(replayButton);
}
