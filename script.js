let P1 = true;
let moves = [];
let choice = Array(9).fill(null);
let emptyCells = 9;
let isMuted = false;

// Function to reset the game
function resetGame() {
  P1 = true;
  emptyCells = 9;
  moves = [];
  choice.fill(null);
  document.getElementById("result").innerHTML = "1st Player Turn";
  for (let i = 1; i <= 9; i++) {
    const button = document.getElementById("box" + i);
    button.innerHTML = "";
    button.disabled = false;
  }
}

// Function to undo the last move
function undoMove() {
  if (moves.length > 0) {
    const idx = moves.pop(); // Get the most recent move
    const button = document.getElementById("box" + idx);
    button.innerHTML = "";
    button.disabled = false;
    choice[idx - 1] = null;
    P1 = !P1;
    document.getElementById("result").innerHTML = P1
      ? "1st Player Turn"
      : "2nd Player Turn";
  }
}

// Function to mark cells on board
function box(idx) {
  let pos = idx - 1;
  if (choice[pos] == null) {
    let cell = document.getElementById("box" + idx);
    cell.innerHTML = P1 ? "X" : "O";
    choice[pos] = P1 ? "X" : "O";
    moves.push(idx);
    emptyCells--;
    P1 = !P1;
    document.getElementById("result").innerHTML = P1
      ? "1st Player Turn"
      : "2nd Player Turn";
    checkResult();
  }
}

// Function to check the result
function checkResult() {
  const checkWinner = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let isAnyoneWins = false;

  for (const element of checkWinner) {
    const [a, b, c] = element;
    if (choice[a] && choice[a] === choice[b] && choice[b] === choice[c]) {
      playWinSound();
      let resultText = choice[a] == "X" ? "Player 1 Wins!" : "Player 2 Wins!";
      document.getElementById("result").innerHTML = resultText;
      disableAllCells();
      isAnyoneWins = true;
      setTimeout(resetGame, 6000);
      return;
    }
  }

  if (!isAnyoneWins && emptyCells === 0) {
    document.getElementById("result").innerHTML = "It's a Draw!";
    playTieSound();
    setTimeout(resetGame, 4000);
  }
}

// Function to disable all cells
function disableAllCells() {
  for (let i = 1; i <= 9; i++) {
    let boardCell = document.getElementById("box" + i);
    boardCell.disabled = true;
  }
}

// Function to play the win sound
function playWinSound() {
  if (!isMuted) {
    let winSound = document.getElementById("win");
    winSound.play(); // Play the win sound
  }
}

// Function to play the tie sound
function playTieSound() {
  if (!isMuted) {
    let tieSound = document.getElementById("tie");
    tieSound.play(); // Play the tie sound
  }
}

// Mute/Unmute function
function toggleMute() {
  isMuted = !isMuted;
  const muteButton = document.querySelector('.feature-btn[title="Mute"]');
  muteButton.innerHTML = isMuted ? "Unmute" : "Mute"; // Update button text
}

let popup = document.getElementById("popup");
function openPopup() {
  popup.classList.add("open-popup");
}

function closePopup() {
  popup.classList.remove("open-popup");
}