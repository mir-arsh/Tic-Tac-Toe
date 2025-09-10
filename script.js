// DOM Elements
const boxes = document.querySelectorAll(".box");
const resetBtn = document.getElementById("resetBtn");
const turnIndicator = document.getElementById("turnIndicator");
const turnText = document.getElementById("turnText");
const scoreXElement = document.getElementById("scoreX");
const scoreOElement = document.getElementById("scoreO");
const welcomeOverlay = document.getElementById("welcomeOverlay");
const resultOverlay = document.getElementById("resultOverlay");
const winnerText = document.getElementById("winnerText");
const playAgainBtn = document.getElementById("playAgain");
const startGameBtn = document.getElementById("startGame");
const helpBtn = document.getElementById("helpBtn");
const particlesContainer = document.getElementById("particles");

// Game state
let turnX = true;
let gameActive = true;
let scoreX = 0;
let scoreO = 0;
let moveCount = 0;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// Create background particles
function createParticles() {
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 20 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;

        particle.style.animationDuration = `${Math.random() * 10 + 15}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;

        particlesContainer.appendChild(particle);
    }
}

// Initialize game
function initGame() {
    boxes.forEach(box => {
        box.innerHTML = "";
        box.classList.remove("x", "o", "win");
        box.disabled = false;
    });

    turnX = true;
    gameActive = true;
    moveCount = 0;
    updateTurnIndicator();
}

// Update turn indicator
function updateTurnIndicator() {
    if (turnX) {
        turnIndicator.classList.add("x");
        turnIndicator.classList.remove("o");
        turnText.textContent = "Player X's Turn";
    } else {
        turnIndicator.classList.add("o");
        turnIndicator.classList.remove("x");
        turnText.textContent = "Player O's Turn";
    }
}

// Check for win
function checkWin() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        const valA = boxes[a].textContent;
        const valB = boxes[b].textContent;
        const valC = boxes[c].textContent;

        if (valA !== "" && valA === valB && valB === valC) {
            // Highlight winning boxes
            boxes[a].classList.add("win");
            boxes[b].classList.add("win");
            boxes[c].classList.add("win");

            // Disable all boxes
            boxes.forEach(box => box.disabled = true);

            return valA;
        }
    }

    return null;
}

// Check for draw
function checkDraw() {
    return moveCount === 9;
}

// Show result
function showResult(winner) {
    gameActive = false;

    if (winner === "X") {
        winnerText.textContent = "Player X Wins!";
        winnerText.className = "winner-text winner-x";
        scoreX++;
        scoreXElement.textContent = scoreX;
    } else if (winner === "O") {
        winnerText.textContent = "Player O Wins!";
        winnerText.className = "winner-text winner-o";
        scoreO++;
        scoreOElement.textContent = scoreO;
    } else {
        winnerText.textContent = "It's a Draw!";
        winnerText.className = "winner-text draw";
    }

    // Show result overlay after a short delay
    setTimeout(() => {
        resultOverlay.classList.add("active");
    }, 1000);
}

// Event Listeners
boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (!gameActive || box.textContent !== "") return;

        // Mark the box
        box.textContent = turnX ? "X" : "O";
        box.classList.add(turnX ? "x" : "o");
        moveCount++;

        // Check for win or draw
        const winner = checkWin();
        if (winner) {
            showResult(winner);
        } else if (checkDraw()) {
            showResult(null);
        } else {
            // Switch turns
            turnX = !turnX;
            updateTurnIndicator();
        }
    });
});

resetBtn.addEventListener("click", initGame);

playAgainBtn.addEventListener("click", () => {
    resultOverlay.classList.remove("active");
    initGame();
});

startGameBtn.addEventListener("click", () => {
    welcomeOverlay.classList.remove("active");
});

helpBtn.addEventListener("click", () => {
    welcomeOverlay.classList.add("active");
});

// Initialize the game
createParticles();
initGame();