const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector(".resetBtn");
const container = document.querySelector(".container");
const msgContainer = document.querySelector(".msg-container");
const playerName = document.querySelector(".playerName");
const newGameBtn = document.querySelector(".newGame");
const congrats = document.querySelector(".congrats");

let turnX = true; // true for X (Player 1), false for O (Player 2)
const p1 = "Player 1";
const p2 = "Player 2";

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        box.innerHTML = turnX ? "X" : "O";
        box.disabled = true;
        checkWin();
        turnX = !turnX;
    });
});

function checkWin() {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        let val1 = boxes[a].innerHTML;
        let val2 = boxes[b].innerHTML;
        let val3 = boxes[c].innerHTML;

        if (val1 !== "" && val1 === val2 && val2 === val3) {
            showResult(val1 === "X" ? p1 : p2);
            return;
        }
    }

    // Check for draw
    const isDraw = Array.from(boxes).every(box => box.innerHTML !== "");
    if (isDraw) {
        showResult("draw");
    }
}

function showResult(winner) {
    boxes.forEach(box => box.disabled = true);
    container.style.display = "none";
    resetBtn.style.display = "none";
    msgContainer.style.display = "flex";

    if (winner === "draw") {
        congrats.style.display = "none";
        playerName.innerText = `It's a draw!`;
    } else {
        congrats.style.display = "block";
        playerName.innerText = `${winner} wins!`;
    }
}

function resetGame() {
    turnX = true;
    boxes.forEach(box => {
        box.innerHTML = "";
        box.disabled = false;
    });
}

function newGame() {
    msgContainer.style.display = "none";
    container.style.display = "flex";
    resetBtn.style.display = "flex";
    resetGame();
}

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", newGame);

//alert
window.addEventListener("load", () => {
    document.getElementById("customAlert").style.display = "block";
    document.getElementById("overlay").style.display = "block";
});

document.getElementById("alertClose").addEventListener("click", () => {
    document.getElementById("customAlert").style.display = "none";
    document.getElementById("overlay").style.display = "none";
});