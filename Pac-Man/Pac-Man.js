/***************************************************
 * 1) Layout (28×31) + tunnel (ligne 14)
 ***************************************************/
const layout = [
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,0,
  0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
  0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,
  0,1,0,1,1,1,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,1,1,1,0,1,0,
  0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,
  0,1,0,1,1,1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,1,1,1,0,1,0,1,0,
  0,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,
  0,1,0,0,0,0,0,0,0,0,1,0,1,0,1,1,1,0,1,0,1,0,0,0,0,0,1,0,
  0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
  0,1,0,1,1,1,0,1,1,0,1,0,0,1,1,1,0,0,1,0,1,1,0,1,1,1,0,0,
  0,1,0,1,1,1,0,1,0,1,1,0,1,1,1,1,1,0,1,1,0,1,0,1,1,1,1,0,
  0,1,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0,1,1,0,0,1,0,0,0,0,1,0,
  0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
  3,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,3,
  0,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,
  0,1,1,1,0,0,0,0,0,0,1,0,1,1,1,0,1,0,0,0,0,0,0,0,1,1,1,0,
  0,1,1,1,0,0,1,1,0,0,1,0,1,1,1,0,1,0,0,1,1,0,0,0,1,1,1,0,
  0,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,
  0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,0,1,0,0,0,0,0,0,0,1,0,
  0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,0,
  0,1,0,0,0,0,1,1,1,1,0,0,1,1,0,0,0,1,1,1,1,0,0,0,0,0,1,0,
  0,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,
  0,1,0,1,0,0,0,0,0,0,1,0,1,1,1,1,1,0,1,0,0,0,0,0,0,0,1,0,
  0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
  0,1,1,1,0,0,0,1,0,0,0,0,1,1,1,1,0,0,0,0,0,1,0,0,0,0,1,0,
  0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
  0,1,0,0,0,0,0,1,1,1,1,1,0,0,0,0,1,1,1,1,1,0,0,0,0,0,1,0,
  0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
  0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
];

/***************************************************
 * 2) Variables/états
 ***************************************************/
// MODIF : On lit bestScore depuis localStorage
const width = 28, 
      height = 31,
      grid = document.getElementById('grid'),
      scoreDisplay = document.getElementById('score'),
      startMessage = document.getElementById('startMessage');

let gameState = "menu",
    score = 0,
    bestScore = parseInt(localStorage.getItem("bestScore") || "0", 10), // <--
    squares = [],
    pacmanCurrentIndex = 490,
    pacmanDirection = 0,
    pendingDirection = 0,
    pacmanTimerId = null,
    FRIGHTENED_TIME = 6000;

/***************************************************
 * 3) Création du plateau
 ***************************************************/
function createBoard() {
  grid.innerHTML = "";
  squares = [];
  for (let i = 0; i < layout.length; i++) {
    const sq = document.createElement('div');
    sq.classList.add('square');
    switch (layout[i]) {
      case 0: sq.classList.add('wall'); break;
      case 1: sq.classList.add('dot'); break;
      case 2: sq.classList.add('power-pellet'); break;
      case 3: sq.classList.add('empty'); break;
      case 4: sq.classList.add('ghost-lair'); break;
      default: sq.classList.add('empty');
    }
    grid.appendChild(sq);
    squares.push(sq);
  }
}
createBoard();

/***************************************************
 * 4) Fantômes
 ***************************************************/
class Ghost {
  constructor(className, startIndex) {
    this.className  = className;
    this.startIndex = startIndex;
    this.currentIndex = startIndex;
    this.timerId    = null;
    this.frightened = false;
  }
}

const ghosts = [
  new Ghost('red',    9*width + 13),
  new Ghost('blue',   9*width + 14),
  new Ghost('pink',   9*width + 12),
  new Ghost('orange', 9*width + 15),
];

/***************************************************
 * 5) Placement initial
 ***************************************************/
function placePacmanAndGhosts() {
  squares[pacmanCurrentIndex].classList.add('pacman');
  ghosts.forEach(g => {
    squares[g.startIndex].classList.add('ghost', g.className);
    g.currentIndex = g.startIndex;
  });
}
placePacmanAndGhosts();

/***************************************************
 * 6) start / pause / resume / reset
 ***************************************************/
function startGame() {
  if (gameState === "play") return;
  if (gameState === "over" || gameState === "win") {
    resetGame();
  }

  gameState = "play";
  startMessage.style.display = "none";

  // Déplacer Pac-Man
  pacmanTimerId = setInterval(() => {
    if (gameState === "play") movePacman();
  }, 300);

  // Déplacer fantômes
  ghosts.forEach(g => {
    g.timerId = setInterval(() => {
      if (gameState === "play") {
        moveGhostBFS(g);
        checkGameOver();
      }
    }, 300);
  });
}

function pauseGame() {
  if (gameState === "play") {
    gameState = "pause";
    startMessage.innerText = "PAUSE - [P] pour reprendre";
    startMessage.style.display = "block";
  }
}

function resumeGame() {
  if (gameState === "pause") {
    gameState = "play";
    startMessage.style.display = "none";
  }
}

function resetGame() {
  clearInterval(pacmanTimerId);
  ghosts.forEach(g => clearInterval(g.timerId));

  score = 0;
  scoreDisplay.textContent = score;
  pacmanCurrentIndex = 490;
  pacmanDirection = 0;
  pendingDirection = 0;

  createBoard();
  ghosts.forEach(g => {
    g.currentIndex = g.startIndex;
    g.frightened = false;
  });
  placePacmanAndGhosts();

  gameState = "menu";
  startMessage.innerText = "Appuie sur [S] pour jouer";
  startMessage.style.display = "block";
}

/***************************************************
 * 7) Pac-Man
 ***************************************************/
function movePacman() {
  if (isDirectionPossible(pendingDirection)) {
    pacmanDirection = pendingDirection;
  }
  squares[pacmanCurrentIndex].classList.remove('pacman');

  let x = pacmanCurrentIndex % width;
  let next = pacmanCurrentIndex + pacmanDirection;

  // Tunnel horizontal
  if (x === 0 && pacmanDirection === -1) {
    next = pacmanCurrentIndex + (width - 1);
  } else if (x === width - 1 && pacmanDirection === +1) {
    next = pacmanCurrentIndex - (width - 1);
  }

  if (!squares[next].classList.contains('wall')) {
    pacmanCurrentIndex = next;
  }
  squares[pacmanCurrentIndex].classList.add('pacman');

  // Manger dot
  if (squares[pacmanCurrentIndex].classList.contains('dot')) {
    squares[pacmanCurrentIndex].classList.remove('dot');
    score += 10;
    scoreDisplay.textContent = score;
    checkWinCondition();
  }

  // Manger power-pellet
  if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
    squares[pacmanCurrentIndex].classList.remove('power-pellet');
    score += 50;
    scoreDisplay.textContent = score;
    powerPelletEat();
    checkWinCondition();
  }

  checkGameOver();
}

function powerPelletEat() {
  ghosts.forEach(g => {
    g.frightened = true;
    squares[g.currentIndex].classList.add('frightened');
  });
  setTimeout(() => {
    ghosts.forEach(g => {
      g.frightened = false;
      squares[g.currentIndex].classList.remove('frightened');
    });
  }, FRIGHTENED_TIME);
}

function isDirectionPossible(dir) {
  let x = pacmanCurrentIndex % width;
  let t = pacmanCurrentIndex + dir;
  if (x === 0 && dir === -1) {
    t = pacmanCurrentIndex + (width - 1);
  } else if (x === width - 1 && dir === +1) {
    t = pacmanCurrentIndex - (width - 1);
  }
  return !squares[t].classList.contains('wall');
}

// Vérifie si on a mangé toutes les dots/powerPellet
function checkWinCondition() {
  let left = squares.some(s =>
    s.classList.contains('dot') || s.classList.contains('power-pellet')
  );
  if (!left) gameWin();
}

function gameWin() {
  ghosts.forEach(g => clearInterval(g.timerId));
  clearInterval(pacmanTimerId);
  document.removeEventListener('keydown', handleKey);

  // MODIF : si score > bestScore, on enregistre
  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem("bestScore", bestScore);
  }

  gameState = "win";
  startMessage.innerHTML = `<strong>YOU WIN !</strong><br>
    Score : ${score}<br>
    Meilleur score : ${bestScore}<br>
    [S] pour rejouer`;
  startMessage.style.display = "block";
}

/***************************************************
 * 8) getGhostTarget(ghost)
 ***************************************************/
function getGhostTarget(ghost) {
  let pacX = pacmanCurrentIndex % width;
  let pacY = Math.floor(pacmanCurrentIndex / width);

  if (ghost.frightened) {
    const corners = [
      [0, 0],
      [width - 1, 0],
      [0, height - 1],
      [width - 1, height - 1]
    ];
    let bestCorner = corners[0];
    let bestDist = -1;
    for (let c of corners) {
      let dist = Math.abs(c[0] - pacX) + Math.abs(c[1] - pacY);
      if (dist > bestDist) {
        bestDist = dist;
        bestCorner = c;
      }
    }
    return bestCorner[1]*width + bestCorner[0];
  }

  // Logique offset
  let offsetX = 0, offsetY = 0;
  switch (ghost.className) {
    case 'red':    offsetX=0;  offsetY=0;  break;
    case 'pink':   offsetX=1;  offsetY=0;  break;
    case 'blue':   offsetX=0;  offsetY=1;  break;
    case 'orange': offsetX=-1; offsetY=0;  break;
  }
  let tx = pacX + offsetX;
  let ty = pacY + offsetY;
  tx = Math.max(0, Math.min(width - 1, tx));
  ty = Math.max(0, Math.min(height - 1, ty));
  return ty*width + tx;
}

/***************************************************
 * 8*) moveGhostBFS(ghost)
 ***************************************************/
function moveGhostBFS(g) {
  let target = getGhostTarget(g);
  let path = getNextMoveBFS(g.currentIndex, target);
  if (path && path.length > 1) {
    let n = path[1];
    if (!squares[n].classList.contains('wall') &&
        !squares[n].classList.contains('ghost-lair') &&
        !squares[n].classList.contains('ghost'))
    {
      squares[g.currentIndex].classList.remove('ghost', g.className, 'frightened');
      g.currentIndex = n;
      squares[n].classList.add('ghost', g.className);
      if (g.frightened) {
        squares[n].classList.add('frightened');
      }
    }
  } else {
    randomMove(g);
  }
}

/***************************************************
 * randomMove(ghost)
 ***************************************************/
function randomMove(g) {
  const dirs = [-1, +1, -width, +width];
  const d = dirs[Math.floor(Math.random() * dirs.length)];
  const n = g.currentIndex + d;

  if (!squares[n].classList.contains('wall') &&
      !squares[n].classList.contains('ghost-lair') &&
      !squares[n].classList.contains('ghost'))
  {
    squares[g.currentIndex].classList.remove('ghost', g.className, 'frightened');
    g.currentIndex = n;
    squares[n].classList.add('ghost', g.className);
    if (g.frightened) {
      squares[n].classList.add('frightened');
    }
  }
}

/***************************************************
 * 9) BFS (classique)
 ***************************************************/
function getNextMoveBFS(start, goal) {
  if (start === goal) return [start];
  let queue = [start];
  let visited = new Set([start]);
  let parent = {};
  while (queue.length > 0) {
    let c = queue.shift();
    if (c === goal) {
      return reconstructPath(parent, start, goal);
    }
    for (let n of getNeighbors(c)) {
      if (!visited.has(n)) {
        visited.add(n);
        parent[n] = c;
        queue.push(n);
      }
    }
  }
  return null;
}

function getNeighbors(i) {
  let r = [];
  let dirs = [-1, +1, -width, +width];
  let x = i % width;

  for (let d of dirs) {
    let n = i + d;
    // tunnel horizontal
    if (x === 0 && d === -1) {
      n = i + (width - 1);
    } else if (x === width - 1 && d === +1) {
      n = i - (width - 1);
    }
    if (!squares[n].classList.contains('wall') &&
        !squares[n].classList.contains('ghost-lair'))
    {
      r.push(n);
    }
  }
  return r;
}

function reconstructPath(parent, start, goal) {
  let path = [goal];
  let cur = goal;
  while (cur !== start) {
    cur = parent[cur];
    path.unshift(cur);
  }
  return path;
}

/***************************************************
 * 10) checkGameOver()
 ***************************************************/
function checkGameOver(){
  let collided = ghosts.filter(gh => gh.currentIndex === pacmanCurrentIndex);
  if (collided.length > 0) {
    for (let gh of collided) {
      if (gh.frightened) {
        eatGhost(gh);
      } else {
        gameOver();
        return;
      }
    }
  }
}

function eatGhost(gh){
  score += 200;
  scoreDisplay.textContent = score;
  squares[gh.currentIndex].classList.remove('ghost', gh.className, 'frightened');
  gh.currentIndex = gh.startIndex;
  gh.frightened = false;
  squares[gh.currentIndex].classList.add('ghost', gh.className);
}

function gameOver(){
  ghosts.forEach(g => clearInterval(g.timerId));
  clearInterval(pacmanTimerId);

  // MODIF : si score > bestScore, on enregistre
  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem("bestScore", bestScore); 
  }

  gameState = "over";
  startMessage.innerHTML = `<strong>GAME OVER</strong><br>
    Score : ${score}<br>
    Meilleur score : ${bestScore}<br>
    [S] pour rejouer`;
  startMessage.style.display = "block";
}

/***************************************************
 * 11) Clavier
 ***************************************************/
function handleKey(e){
  if ((e.key === "s" || e.key === "S" || e.code === "Space") && gameState === "menu") {
    startGame();
    return;
  }
  if (e.key === "p" || e.key === "P") {
    if (gameState === "play") {
      pauseGame();
    } else if (gameState === "pause") {
      resumeGame();
    }
    return;
  }
  if ((e.key === "s" || e.key === "Space") && (gameState === "over" || gameState === "win")) {
    resetGame();
    return;
  }
  if (gameState === "play" || gameState === "pause") {
    switch (e.key) {
      case "ArrowLeft":
      case "a":
        pendingDirection = -1;
        break;
      case "ArrowRight":
      case "d":
        pendingDirection = +1;
        break;
      case "ArrowUp":
      case "w":
        pendingDirection = -width;
        break;
      case "ArrowDown":
      case "s":
        pendingDirection = +width;
        break;
    }
  }
}
document.addEventListener("keydown", handleKey);

/***************************************************
 * 12) Écran menu initial
 ***************************************************/
startMessage.innerText = "Appuie sur [S] pour jouer";
startMessage.style.display = "block";
scoreDisplay.textContent = score;
