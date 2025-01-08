const gameState = {
    numbers: [],
    grid: [],
    hiddenCells: [],
    gridSize: { rows: 0, cols: 0 },
};
const levels = [
    {
        name: "Niveau 1",
        grid: [
            [null, "+", 7, "=", 17, null, null, null, null],
            ["+", null, "+", null, null, null, null, null, null],
            [null, null, null, null, null, "+", 3, "=", null],
            ["=", null, "=", null, "-", null, null, null, null],
            [19, "-", null, "=", 7, null, null, null, null],
            [null, null, null, null, "=", null, null, null, null],
            [null, null, null, null, 10, null, null, null, null],
        ],
        hiddenCells: [
            [0, 5], [0, 6], [0, 7], [0, 8],
            [1, 1], [1, 4], [1, 3], [1, 5], [1, 6], [1, 7], [1, 8],
            [2, 1], [2, 3],
            [3, 1], [3, 3], [3, 3], [3, 5], [3, 6], [3, 7], [3, 8],
            [4, 5], [4, 6], [4, 7], [4, 8],
            [5, 0], [5, 1], [5, 2], [5, 3], [5, 5], [5, 6], [5, 7], [5, 8],
            [6, 0], [6, 1], [6, 2], [6, 3], [6, 5], [6, 6], [6, 7], [6, 8],
        ],
        gridSize: { rows: 7, cols: 9 },
        numbers: [9, 10, 17, 12, 5, 20]
    },
    {
        name: "Niveau 2",
        grid: [
            [null, "*", 1, "=", null, null, null, null, null, null, null],
            ["/", null, null, null, "-", null, null, null, null, null, null],
            [null, "-", 5, "=", null, null, null, null, 9, null, null],
            ["=", null, null, null, "=", null, null, null, "-", null, null],
            [1, null, 5, "+", null, "=", null, null, 2, null, null],
            [null, null, "-", null, null, null, "/", null, "=", null, null],
            [null, "+", null, "=", null, null, null, "+", null, "=", 9],
            ["+", null, "=", null, "+", null, "=", null, null, null, null],
            [7, "-", null, "=", null, null, null, "-", 4, "=", null],
            ["=", null, null, null, "=", null, null, null, null, null, null],
            [null, "+", null, "=", 10, null, null, null, null, null, null]
            ],
        hiddenCells :[
            [0, 5], [0, 6], [0, 7], [0, 8], [0, 9], [0, 10],
            [1, 1], [1, 2], [1, 3], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9], [1, 10],
            [2, 5], [2, 6], [2, 7], [2, 9], [2, 10],
            [3, 1], [3, 2], [3, 3], [3, 5], [3, 6], [3, 7], [3, 9], [3, 10],
            [4, 1], [4, 7], [4, 9], [4, 10],
            [5, 0], [5, 1], [5, 3], [5, 4], [5, 5], [5, 7], [5, 9], [5, 10],
            [6, 5],
            [7, 1], [7, 3], [7, 5], [7, 7], [7, 8], [7, 9], [7, 10],
            [8, 5],
            [9, 1], [9, 2], [9, 3], [9, 5], [9, 6], [9, 7],[9,8], [9, 9], [9, 10],
            [10, 5], [10, 6], [10, 7],[10,8] ,[10, 9], [10, 10]
        ],
        gridSize: { rows: 11, cols: 11 },
        numbers: [10, 2, 2, 7, 5, 1, 1, 5, 3, 5, 7, 9, 7, 2, 5, 7, 2],
    },
   /* {
        name: "Niveau 3",
        grid: [
            [null, "-", null, "=", 21, null, null, null, null,null,null],
            ["+", null,null,null, "+", null, null, null, null, null, null],
            [2, null, null, null, null, "-", 2, "=", null,null,null],
            ["=", null,null,null, "=", null,null,null, "*", null, null],
            [null, "+", 3, "=",null,null,null,null, 3, null,19],
            [null, null,"-", null, null,null, "-", null, "=", null, "+"],
            [2, "/", null, "=", 2, null, 26, "-", null,"=",null],
            [null,null,"=",null,null,null,"=",null,null,null,"="],
            [null,null,null,"+",3,"=",null,null,null,null,24]
        ],
        hiddenCells: [
            [0, 5], [0, 6], [0, 7], [0, 8], [0, 9], [0,10]
            [1, 1], [1, 2], [1, 3], [1, 5], [1, 6], [1, 7], [1, 8],[1, 9],[1, 10],
            [2, 1], [2, 2], [2, 3], [2, 9], [2, 10],
            [3, 1], [3, 2], [3, 3], [3, 5], [3, 6], [3, 7], [3, 9],[3, 10]
            [4, 5], [4, 7], [4, 9],
            [5, 0], [5, 1], [5, 3], [5, 4], [5, 5], [5, 7], [5, 9],
            [6, 5], 
            [7, 0], [7, 1], [7, 3], [7, 4], [7, 5], [7, 7], [7, 8],[7, 9],
            [8, 0], [8, 1], [8, 7], [8, 8], [8, 9]
        ],
        gridSize: { rows: 9, cols: 11 },
        numbers: [21, 4, 25, 9, 31, 2, 1, 7, 5, 5, 30, 27]
    },*/
];
let selectedNumber = null;
const gridContainer = document.querySelector('.grid-container');
const numberListContainer = document.querySelector('.number-list');


// Création de la grille
function loadLevel(levelIndex) {
    const level = levels[levelIndex];
    console.log("Chargement du niveau : ", level.name);  // Affichage du nom du niveau
    if (!level) {
        console.error("Niveau non trouvé !");
        return;
    }
    console.log(level); // Afficher le contenu du niveau avant le chargement

    const grid = level.grid;
    const numbers = level.numbers;
    console.log("Nombres chargés:", numbers);

    // Mise à jour de l'état global
    gameState.numbers = [...level.numbers];
    if (!Array.isArray(grid) || !grid.every(row => Array.isArray(row))) {
        console.error("Grille invalide !", grid);
    } else {
        gameState.grid = grid.map(row => [...row]);
    }
    
    gameState.hiddenCells = [...level.hiddenCells];
    gameState.gridSize = { ...level.gridSize };

    // Réinitialiser la grille et les nombres
    gridContainer.innerHTML = "";
    numberListContainer.innerHTML = "";

    // Configurer la taille de la grille
    gridContainer.style.gridTemplateColumns = `repeat(${gameState.gridSize.cols}, 50px)`;
    for (let row = 0; row < gameState.gridSize.rows; row++) {
        for (let col = 0; col < gameState.gridSize.cols; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;

            if (gameState.hiddenCells.some(([hiddenRow, hiddenCol]) => hiddenRow === row && hiddenCol === col)) {
                cell.classList.add('hidden-cell');
            } else if (gameState.grid[row] && gameState.grid[row][col] !== null) {
                cell.textContent = gameState.grid[row][col];
                cell.classList.add('filled');
                cell.dataset.number = gameState.grid[row][col];
            } else {
                cell.addEventListener('click', () => handleCellClick(cell));
            }

            gridContainer.appendChild(cell);
        }
    }

    // Ajouter les nombres disponibles
    gameState.numbers.forEach(number => addNumberToList(number));
}


// Ajoute un nombre à la liste des nombres disponibles
function addNumberToList(number) {
    const numberItem = document.createElement('div');
    numberItem.classList.add('number-item');
    numberItem.textContent = number;

    numberItem.addEventListener('click', () => {
        selectedNumber = number;
        document.querySelectorAll('.number-item').forEach(item => item.classList.remove('selected'));
        numberItem.classList.add('selected');
        console.log(`Nombre sélectionné: ${selectedNumber}`);
    });

    numberListContainer.appendChild(numberItem);
}
// Supprimer un nombre de la liste après utilisation
function removeNumberFromList(number) {
    const items = numberListContainer.querySelectorAll('.number-item');
    for (let item of items) {
        if (parseInt(item.textContent) === number) {
            item.remove();
            console.log(`Nombre supprimé de la liste : ${number}`);
            break;
        }
    }
}

// Gérer le clic sur une cellule
function handleCellClick(cell) {
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);

    console.log(`Cellule cliquée: [${row}, ${col}]`);

    if (cell.classList.contains('filled')) {
        const number = parseInt(cell.dataset.number);
        if (!isNaN(number)) {
            addNumberToList(number);
        }
        cell.textContent = '';
        cell.classList.remove('filled');
        delete cell.dataset.number;
        console.log(`Cellule vidée à la position [${row}, ${col}]`);
    } else if (selectedNumber !== null) {
        cell.textContent = selectedNumber;
        cell.classList.add('filled');
        cell.dataset.number = selectedNumber;
        removeNumberFromList(selectedNumber);
        console.log(`Cellule remplie avec ${selectedNumber} à la position [${row}, ${col}]`);
        selectedNumber = null;
    } else {
        console.error("Aucun nombre sélectionné pour remplir la cellule !");
    }

    // Vérifie si toutes les cellules sont remplies
    if (areAllCellsFilled()) {
        const isGridCorrect = checkGrid();
        if (isGridCorrect) {   
        } else {
            alert("There are errors in the calculations. Please check!");
        }
    }
}

// Vérifie si toutes les cases nécessaires sont remplies
function areAllCellsFilled() {
    const cells = document.querySelectorAll('.grid-container .cell');
    for (let cell of cells) {
        if (!cell.classList.contains('hidden-cell') && !cell.classList.contains('filled') && !cell.textContent.trim()) {
            console.log('Il reste des cellules vides.');
            return false;
        }
    }
    console.log('Toutes les cellules sont remplies.');
    return true;
}

let currentLevel = 0; // Niveau actuel

function loadNextLevel() {
    currentLevel++; // Passer au niveau suivant
    if (currentLevel < levels.length) {
        loadLevel(currentLevel); // Charger la grille du niveau suivant
    } else {
        alert("You have completed all levels!יישר כח");
    }
}
// Fonction de vérification de la grille
function checkGrid() {
    let isCorrect = true;
    const cells = document.querySelectorAll('.grid-container .cell');

    // Réinitialisation des couleurs et erreurs
    cells.forEach(cell => {
        cell.style.backgroundColor = '';
        cell.classList.remove('error');
    });

    // Vérification des calculs
    cells.forEach(cell => {
        if (cell.textContent === "=") {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            const horizontalValid = checkHorizontal(row, col);
            const verticalValid = checkVertical(row, col);

            if (!horizontalValid && !verticalValid) {
                isCorrect = false;
            }
        }
    });

    if (isCorrect) {
        alert("Congratulations! You have successfully completed this level.");
        // Remplacer l'appel direct de loadNextLevel() par un délai pour que l'utilisateur voit l'alerte avant
        setTimeout(() => {
            // Demander à l'utilisateur s'il souhaite passer au niveau suivant
            if (confirm("Move to the next level?")) {
                loadNextLevel();
            }
        }, 1000); // Attendre 1 seconde avant d'afficher l'option de passer au niveau suivant
    } 

    return isCorrect;
}


// Vérifie les calculs horizontaux
function checkHorizontal(row, col) {
    console.log(`Vérification horizontale pour la cellule [${row}, ${col}].`);

    const leftCells = [
        getCell(row, col - 1),
        getCell(row, col - 2),
        getCell(row, col - 3)
    ];

    // Vérification des cellules à gauche
    if (leftCells.some(cell => !cell)) {
        console.error(`Cellules manquantes ou inexistantes à gauche du "=" en [${row}, ${col}].`);
        return false;
    }

    if (leftCells.some(cell => cell.classList.contains('hidden-cell'))) {
        console.error(`Certaines cellules sont masquées dans la ligne ${row}, ce qui empêche le calcul horizontal.`);
        return false;
    }

    const num1 = parseInt(leftCells[2]?.textContent.trim());
    const operator = leftCells[1]?.textContent.trim();
    const num2 = parseInt(leftCells[0]?.textContent.trim());
    const resultCell = getCell(row, col + 1);
    const result = parseInt(resultCell?.textContent.trim());

    if (isNaN(num1)) {
        console.error(`Le premier opérande est manquant ou invalide en [${row}, ${col - 3}].`);
        return false;
    }

    if (!operator || !["+", "-", "*", "/"].includes(operator)) {
        console.error(`L'opérateur est manquant ou invalide en [${row}, ${col - 2}].`);
        return false;
    }

    if (isNaN(num2)) {
        console.error(`Le second opérande est manquant ou invalide en [${row}, ${col - 1}].`);
        return false;
    }

    if (!resultCell || isNaN(result)) {
        console.error(`Le résultat est manquant ou invalide en [${row}, ${col + 1}].`);
        return false;
    }

    // Vérification du calcul
    if (!checkCalculation(num1, operator, num2, result)) {
        console.error(`Erreur de calcul horizontal : ${num1} ${operator} ${num2} != ${result}.`);
        resultCell.style.backgroundColor = 'red'; // Mettre en évidence l'erreur
        resultCell.classList.add('error');
        return false;
    }

    console.log(`Calcul horizontal valide : ${num1} ${operator} ${num2} = ${result}`);
    return true;
}

// Vérifie les calculs verticaux
function checkVertical(row, col) {
    console.log(`Vérification verticale pour la cellule [${row}, ${col}].`);

    const topCells = [
        getCell(row - 1, col),
        getCell(row - 2, col),
        getCell(row - 3, col)
    ];

    // Vérification des cellules au-dessus
    if (topCells.some(cell => !cell)) {
        console.error(`Cellules manquantes ou inexistantes au-dessus du "=" en [${row}, ${col}].`);
        return false;
    }

    if (topCells.some(cell => cell.classList.contains('hidden-cell'))) {
        console.error(`Certaines cellules sont masquées dans la colonne ${col}, ce qui empêche le calcul vertical.`);
        return false;
    }

    const num1 = parseInt(topCells[2]?.textContent.trim());
    const operator = topCells[1]?.textContent.trim();
    const num2 = parseInt(topCells[0]?.textContent.trim());
    const resultCell = getCell(row + 1, col);
    const result = parseInt(resultCell?.textContent.trim());

    if (isNaN(num1)) {
        console.error(`Le premier opérande est manquant ou invalide en [${row - 3}, ${col}].`);
        return false;
    }

    if (!operator || !["+", "-", "*", "/"].includes(operator)) {
        console.error(`L'opérateur est manquant ou invalide en [${row - 2}, ${col}].`);
        return false;
    }

    if (isNaN(num2)) {
        console.error(`Le second opérande est manquant ou invalide en [${row - 1}, ${col}].`);
        return false;
    }

    if (!resultCell || isNaN(result)) {
        console.error(`Le résultat est manquant ou invalide en [${row + 1}, ${col}].`);
        return false;
    }

    // Vérification du calcul
    if (!checkCalculation(num1, operator, num2, result)) {
        console.error(`Erreur de calcul vertical : ${num1} ${operator} ${num2} != ${result}.`);
        resultCell.style.backgroundColor = 'red'; // Mettre en évidence l'erreur
        resultCell.classList.add('error');
        return false;
    }

    console.log(`Calcul vertical valide : ${num1} ${operator} ${num2} = ${result}`);
    return true;
}

// Fonction pour vérifier si le calcul est correct
function checkCalculation(num1, operator, num2, result) {
    switch (operator) {
        case "+":
            return num1 + num2 === result;
        case "-":
            return num1 - num2 === result;
        case "*":
            return num1 * num2 === result;
        case "/":
            return num1 / num2 === result;
        default:
            console.error(`Opérateur invalide : "${operator}"`);
            return false;
    }
}

// Récupère une cellule à des coordonnées spécifiques
function getCell(row, col) {
    return document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
}
document.addEventListener('DOMContentLoaded', () => {
    loadLevel(0); // Charge le premier niveau
});
