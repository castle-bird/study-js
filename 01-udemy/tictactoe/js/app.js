let editedPlayer = 0;
let activePlayer = 0;

const players = [
    {
        name: "",
        symbol: "X",
    },
    {
        name: "",
        symbol: "O",
    },
];

const playerConfigOverlayElement = document.querySelector("#config-overlay");
const backdropElement = document.querySelector("#backdrop");
const formElement = document.querySelector("form");
const errorsOutputElement = document.querySelector("#config-errors");
const gameAreaElement = document.querySelector("#active-game");
const activePlayerNameElement = document.querySelector('#active-player-name')

const editPlayer1BtnElement = document.querySelector("#edit-player-1-btn");
const editPlayer2BtnElement = document.querySelector("#edit-player-2-btn");
const cancelConfigBtnElement = document.querySelector("#cancel-config-btn");
const startNewGameBtnElement = document.querySelector("#start-game-btn");
const gameFieldElements = document.querySelectorAll("#game-board li");

editPlayer1BtnElement.addEventListener("click", openPlayerConfig);
editPlayer2BtnElement.addEventListener("click", openPlayerConfig);

cancelConfigBtnElement.addEventListener("click", closePlayerConfig);
backdropElement.addEventListener("click", closePlayerConfig);

formElement.addEventListener("submit", savePlayerConfig);
startNewGameBtnElement.addEventListener("click", startNewGame);

for (const gameFieldElement of gameFieldElements) {
    gameFieldElement.addEventListener("click", selectGameFiled);
}
