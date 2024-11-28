function startNewGame() {
    // if (!players[0].name || !players[1].name) {
    //     alert("닉네임을 모두 정해주세요!");

    //     return;
    // }
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
    event.target.textContent = players[activePlayer].symbol;
    event.target.classList.add("disabled");
    switchPlayer();
}
