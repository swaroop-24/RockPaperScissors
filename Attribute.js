function findWinner(pChoice, cChoice) {
    if ((pChoice + 1) % 3 == cChoice) {
      compScoreNum++;
      return "comp";
    } else if (pChoice == cChoice) {
      return "tie";
    } else {
      playerScoreNum++;
      return "player";
    }
  }
  
  const options = document.querySelectorAll("#options img");
  const playerImg = document.querySelector("#player-img");
  const compImg = document.querySelector("#comp-img");
  const result = document.querySelector("#result");
  const info = document.querySelector("#info");
  const playerScore = document.querySelector("#player-score");
  const compScore = document.querySelector("#comp-score");
  const popup = document.querySelector(".popup");
  const playAgain = document.querySelector(".popup button");
  const body = document.querySelector("body");
  const points = document.querySelector("#points");
  
  const resultStyle = result.style;
  const infoStyle = info.style;
  
  let running = true;
  
  let playerScoreNum = 0;
  let compScoreNum = 0;
  
  let winner = document.querySelector("#winner");
  
  const allChoices = ["rock", "paper", "scissors"];
  
  options.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      if (running) {
        let playerChoice = el.getAttribute("data-value");
        let compChoice = Math.floor(Math.random() * 3);
        updateStage(allChoices[playerChoice], allChoices[compChoice]);
        updateInfoResults(
          findWinner(playerChoice, compChoice),
          playerChoice,
          compChoice
        );
        updateScoreEl();
        announceWinner();
      } else {
        reset();
      }
    });
  });
  
  function updateInfoResults(winner, pChoice, cChoice) {
    if (winner == "player") {
      resultStyle.color = "green";
      infoStyle.color = "green";
      info.textContent = `${allChoices[pChoice]} beats ${allChoices[cChoice]}`;
      result.textContent = "You scored a point";
    } else if (winner == "comp") {
      resultStyle.color = "red";
      infoStyle.color = "red";
      info.textContent = `${allChoices[pChoice]} is beaten by ${allChoices[cChoice]}`;
      result.textContent = "Computer scored a point";
    } else {
      resultStyle.color = "blue";
      infoStyle.color = "blue";
      info.textContent = `${allChoices[pChoice]} ties with ${allChoices[cChoice]}`;
      result.textContent = "It's a tie";
    }
  }
  function updateStage(pChoice, cChoice) {
    playerImg.setAttribute("src","user.webp");
    compImg.setAttribute("src","robot.webp");
  }
  function updateScore() {
    if (result.textContent.includes("You")) {
      playerScoreNum++;
    } else if (result.textContent.includes("Computer")) {
      compScoreNum++;
    }
  }
  
  function updateScoreEl() {
    playerScore.textContent = `Player: ${playerScoreNum}`;
    compScore.textContent = `Computer: ${compScoreNum}`;
  }
  
  function announceWinner() {
    if (playerScoreNum == 3 || compScoreNum == 3) {
      running = false;
      points.textContent = `${playerScoreNum}:${compScoreNum}`;
  
      if (playerScoreNum > compScoreNum) {
        showPopup("You Won!");
      } else {
        showPopup("You lost!");
      }
    }
  }
  
  function showPopup(text) {
    console.log("showing popup");
    winner.textContent = text;
    body.classList.add("overlay");
    popup.classList.add("open-popup");
    body.addEventListener("keypress", reset);
    body.addEventListener("click", reset);
  }
  function hidePopup() {
    body.classList.remove("overlay");
    popup.classList.remove("open-popup");
  }
  function reset() {
    hidePopup();
    body.removeEventListener("keypress", reset);
    body.removeEventListener("click", reset);
    resultStyle.color = "";
    infoStyle.color = "";
    running = true;
    playerScoreNum = 0;
    compScoreNum = 0;
    result.textContent = "First to score 3 points wins";
    info.textContent = "Live update";
    updateStage("user", "robot");
    updateScoreEl();
  }
  
  playAgain.addEventListener("click", reset);