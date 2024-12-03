// 기능정의
function openPlayerConfig(event) {
    editedPlayer = +event.target.dataset.playerid; // +str = number 변환됨

    playerConfigOverlayElement.style.display = "block";
    backdropElement.style.display = "block";
}

function closePlayerConfig() {
    playerConfigOverlayElement.style.display = "none";
    backdropElement.style.display = "none";
    formElement.firstElementChild.classList.remove("error");
    errorsOutputElement.textContent = "";
    formElement.firstElementChild.lastElementChild.value = '';
}

function savePlayerConfig(event) {
    event.preventDefault();
    // new FromData(event.target)
    // 브라우저 기본 함수
    // form태그 안에 name속성을 가지고 있는 것들을 객체로 리턴한다
    // get('name 문자열') 로 name에 있는 input에 접근이 가능하다
    const formData = new FormData(event.target); // name속성 값들 리턴
    const enteredPlayername = formData.get("playername").trim(); // get으로 접근

    if (!enteredPlayername) {
        event.target.firstElementChild.classList.add("error");
        errorsOutputElement.textContent = "빈 여백만 입력하시면 안됩니다! 값을 정확히 입력해주세요!";

        return;
    }

    const updatedPlayerDataElement = document.querySelector(`#player-${editedPlayer}-data`);
    updatedPlayerDataElement.children[1].textContent = enteredPlayername;

    players[editedPlayer - 1].name = enteredPlayername;

    closePlayerConfig();
}
