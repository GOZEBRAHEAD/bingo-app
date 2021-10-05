// ==================== //// ==================== //
const modal = document.getElementById("modal-endGame");
const modalClose = document.getElementById("modal-close");
const modalText = document.getElementById("modal-text");

const btnPlay = document.getElementById("btn-play");
const btnReset = document.getElementById("btn-reset");

const randomBoard = document.getElementById("random-board");
const userBoard = document.getElementById("user-board");

const userPlays = document.getElementById("user-plays");
const userScore = document.getElementById("user-score");

const TOTAL_RANDOM_SQUARES = 48;
const TOTAL_USER_SQUARES = 20;

const arrayRandomSquares = [], arrayUserSquares = [], squaresSelected = [];

let userPlaying = false, totalScore = 0, totalGames = 20;

// ==================== //// ==================== //
const delay = (ms) => new Promise(res => setTimeout(res, ms));

const getRandomNumber = () => Math.floor(Math.random() * TOTAL_RANDOM_SQUARES + 1);

const createRandomSquares = () => {

    

    for (let i = 1; i <= TOTAL_RANDOM_SQUARES; i++) {

        const newSquare = document.createElement("div");

        newSquare.classList.add("square__item");
        newSquare.id = `random-${i}`;
        newSquare.innerHTML = i;

        arrayRandomSquares.push(`random-${i}`);

        randomBoard.appendChild(newSquare);
    }
};

const createUserSquares = () => {

    let randomNum;

    for (let i = 1; i <= TOTAL_USER_SQUARES; i++) {

        const newSquare = document.createElement("div");

        newSquare.classList.add("square__item");

        randomNum = getRandomNumber();

        while (arrayUserSquares.includes(`user-${randomNum}`)) {
            randomNum = getRandomNumber();
        }

        newSquare.id = `user-${randomNum}`;
        newSquare.innerHTML = randomNum;

        arrayUserSquares.push(`user-${randomNum}`);

        userBoard.appendChild(newSquare);
    }
};

const updatePlays = () => userPlays.innerHTML = `Remaining plays: <span>${totalGames}</span>/20`;

const updateScore = () => userScore.innerHTML = `Score: <span>${++totalScore}</span>/10`;

const playBingo = async () => {

    if (userPlaying) {
        return;
    }

    userPlaying = true;
    totalGames--;
    updatePlays();

    let randomSquare, randomNumber;
    
    const auxRandomSquares = arrayRandomSquares;

    for (let j = 0; j < 6; j++) {

        randomNumber = getRandomNumber();

        while (squaresSelected.includes(randomNumber)) {
            randomNumber = getRandomNumber();
        }
        
        randomSquare = document.getElementById(`random-${randomNumber}`);

        randomSquare.style.backgroundColor = "#075783";

        await delay(200);

        if (j != 5) {
            randomSquare.style.backgroundColor = "#0C91DA";
        }
    }

    let finalSelectedSquare = parseInt(randomSquare.id.split("-")[1]);

    if (arrayUserSquares.includes(`user-${finalSelectedSquare}`)) {
        
        const selected = document.getElementById(`user-${finalSelectedSquare}`);
        
        if (selected.style.backgroundColor !== null) {
            selected.style.backgroundColor = "#075783";
        }

        updateScore();
    }

    squaresSelected.push(finalSelectedSquare);

    auxRandomSquares.splice(finalSelectedSquare - 1, 1);

    userPlaying = false;

    if (totalGames === 0 || totalScore === 10) {
        endGame();
    }
};

const resetBingo = () => {

    if (userPlaying || totalGames === 20) {
        return;
    }

    arrayRandomSquares.length = 0;
    arrayUserSquares.length = 0;
    squaresSelected.length = 0;

    randomBoard.innerHTML = ``;
    userBoard.innerHTML = ``;
    userPlays.innerHTML = "Remaining plays: <span>20</span>/20";
    userScore.innerHTML = "Score: <span>0</span>/10";

    createRandomSquares();
    createUserSquares();

    userPlaying = false;
    totalScore = 0
    totalGames = 20;
};

const endGame = () => {

    let playerWon = totalScore >= 10;

    modalText.innerHTML = `You've ${playerWon ? "won" : "lose"}!`;
    modalText.style.color = playerWon ? "#34a3a3" : "#9E2A2B";

    modal.style.display = "block";
};

// ==================== //// ==================== //
window.onload = () => {

    createRandomSquares();

    createUserSquares();

    btnPlay.addEventListener("click", playBingo);

    btnReset.addEventListener("click", resetBingo);

    modalClose.addEventListener("click", () => {
        modal.style.display = "none"
        resetBingo();
    });
};