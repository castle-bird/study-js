function resetGameStatus() {
    activePlayer = 0;
    currentRound = 1;
    gameIsOver = false;
    gameOverElement.firstElementChild.innerHTML = 'You won, <span id="winner-name">PLAYER NAME</span>!';
    gameOverElement.style.display = "none";

    let gameBoardIndex = 0;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            gameData[i][j] = 0;

            gameFieldElements[gameBoardIndex].textContent = "";
            gameFieldElements[gameBoardIndex].classList.remove("disabled");
            gameBoardIndex++;
        }
    }
}

function startNewGame() {
    if (!players[0].name || !players[1].name) {
        alert("닉네임을 모두 정해주세요!");

        return;
    }

    resetGameStatus();

    activePlayerNameElement.textContent = players[activePlayer].name;
    gameAreaElement.style.display = "block";
}

function switchPlayer() {
    if (activePlayer === 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }

    activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameFiled(event) {
    if (gameIsOver) {
        return;
    }

    const slectedField = event.target;
    const selectedColumn = slectedField.dataset.col - 1;
    const selectedRow = slectedField.dataset.row - 1;

    if (gameData[selectedRow][selectedColumn] > 0) {
        alert("이미 클릭한 곳입니다!");

        return;
    }

    slectedField.textContent = players[activePlayer].symbol;
    slectedField.classList.add("disabled");

    gameData[selectedRow][selectedColumn] = activePlayer + 1;

    const winnerId = checkForGameOver();

    if (winnerId !== 0) {
        endGame(winnerId);
    }

    currentRound++;
    switchPlayer();
}
function checkForGameOver() {
    // 노가다 방법
    // if (
    //     gameData[0][0] > 0 &&
    //     gameData[0][0] === gameData[0][1] &&
    //     gameData[0][1] === gameData[0][2]
    // ) {
    //     return gameData[0][0];
    // }

    // if (
    //     gameData[1][0] > 0 &&
    //     gameData[1][0] === gameData[1][1] &&
    //     gameData[1][1] === gameData[1][2]
    // ) {
    //     return gameData[1][1];
    // }

    // if (
    //     gameData[2][0] > 0 &&
    //     gameData[2][0] === gameData[2][1] &&
    //     gameData[2][1] === gameData[2][2]
    // ) {
    //     return gameData[2][2];
    // }

    // 가로 줄 전부 선택했는지 체크
    for (let i = 0; i < 3; i++) {
        if (gameData[i][0] > 0 && gameData[i][0] === gameData[i][1] && gameData[i][1] === gameData[i][2]) {
            return gameData[i][0];
        }
    }

    // 세로 줄 전부 선택했는지 체크
    for (let i = 0; i < 3; i++) {
        if (gameData[0][i] > 0 && gameData[0][i] === gameData[1][i] && gameData[0][i] === gameData[2][i]) {
            return gameData[0][i];
        }
    }

    // 대각선 줄이 전부 선택됐는지

    // 좌상단 -> 우하단 대각
    if (gameData[0][0] > 0 && gameData[0][0] === gameData[1][1] && gameData[1][1] === gameData[2][2]) {
        return gameData[0][0];
    }

    // 우상단 -> 좌하단 대각
    if (gameData[2][0] > 0 && gameData[2][0] === gameData[1][1] && gameData[1][1] === gameData[0][2]) {
        return gameData[2][0];
    }

    // 무승부
    if (currentRound === 9) {
        return -1;
    }
    return 0;
}

function endGame(winnerId) {
    gameIsOver = true;
    gameOverElement.style.display = "block";

    if (winnerId > 0) {
        gameOverElement.firstElementChild.firstElementChild.textContent = players[winnerId - 1].name;
    } else {
        gameOverElement.firstElementChild.textContent = "무승부";
    }
}
