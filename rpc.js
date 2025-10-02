// there should be three rounds
// after the three rounds the player should reset to start new game
// get all the buttons
// option buttons event listener

  // if last round, alert to reset.

  // increment round
  
  // reset button (function): color and size
  
  // get the text of the button
  // change its color and size
  
  // get a peng button at random and its text
  // change its color and size
  
  // compare buttons text and determine winner
  // add score texts and display scores


// reset button event listener
  // if round is 3 
    // reset round and scores
    // remove score texts
    // remove result text
  // else alert "Peng says: Let's finish the game"


const optionButtons = document.querySelectorAll(".options button");
const playerScoreSpan = document.querySelector(".your-score");
const pengScoreSpan = document.querySelector(".peng-score");
const scoresDiv = document.querySelector(".scores");
const resultDiv = document.querySelector(".result");
const resetBtn = document.querySelector(".reset");
const message = document.querySelector(".message");

const choicesArr = ["rock", "paper", "scissors"];
let round = 0;
let playerScore = 0;
let pengScore = 0;

const winMessages = ["You win the game!", "Victory is yours!", "You outplayed Peng!", "Champion! 🏆"];
const lostMessages = ["Peng wins the game!", "Peng outplayed you!", "Defeated this time...", "Better luck next game!"];
const tieMessages = ["It's a tie game!", "Stalemate — no winner.", "Even match!", "Drawn battle."];

const getRandomStr = (strArr) => {
  return strArr[Math.floor(Math.random() * strArr.length)];
}

const toggleHideClass = (element) => {
  if (element.classList.contains("hide")) {
    element.classList.remove("hide");
  } else {
    element.classList.add("hide");
  }
}

const setPrimaryAppearance = (elementList) => { // for ALL buttons
  elementList.forEach((element) => {
    element.style.backgroundColor = `var(--${element.textContent.toLowerCase()}-primary)`;
    element.style.width = "165px";
    element.style.height = "33px";
  })
}

const setSecondaryAppearance = (element) => { // for a specific option button
  element.style.backgroundColor = `var(--${element.textContent.toLowerCase()}-secondary)`;
  element.style.width = "170px";
  element.style.height = "37px";
}


//-----------------------------------------------event handlers
const scoreKeeper = (e) => {
  if (round === 3) { // new game?
    alert("Game over! Please press RESET to play again");
    return;
  }

  const clickedBtn = e.target;
  const playerChoice = e.target.textContent.toLowerCase();

  // reset buttons to primary appearance
  setPrimaryAppearance(optionButtons);

  // set to secondary apperance
  setSecondaryAppearance(clickedBtn);

  round++; // new round
  
  if (round === 1) { // show scores and result
    toggleHideClass(scoresDiv);
    toggleHideClass(resultDiv);
  }

  const pengChoice = getRandomStr(choicesArr); // peng's choice

  // set appearance of corresponding button
  optionButtons.forEach((btn, index) => {
    if (index >= 3) {
      if (btn.textContent.toLowerCase() === pengChoice) {
        setSecondaryAppearance(btn);
      }
    }
  })
    
  // display message for the round and update scores
  if (
    playerChoice === "rock" && pengChoice === "scissors" ||
    playerChoice === "paper" && pengChoice === "rock" ||
    playerChoice === "scissors" && pengChoice === "paper"
  )
  { 
    message.textContent = "Won";
    playerScore++;
    playerScoreSpan.textContent = playerScore;
  }
  else if (
    playerChoice === "rock" && pengChoice === "paper" ||
    playerChoice === "paper" && pengChoice === "scissors" ||
    playerChoice === "scissors" && pengChoice === "rock"
  )
  { 
    message.textContent = "Lost";
    pengScore++;
    pengScoreSpan.textContent = pengScore;
  }
  else {
    message.textContent = "Draw";
  }

  // highlighting and final message
  if (round === 3) {
    if (playerScore > pengScore) {
      playerScoreSpan.style.color = "#00ff00";
      message.textContent = getRandomStr(winMessages);
    } else if (playerScore < pengScore) {
      pengScoreSpan.style.color = "#00ff00";
      message.textContent = getRandomStr(lostMessages);
    } else {
      message.textContent = getRandomStr(tieMessages);
    }
  }

  // console output
  /* console.log("Round ", round); // announce round
  console.log("Player's choice: ", playerChoice);
  console.log("Peng's choice: ", pengChoice);
  if (round === 3) { console.log("\n") }
  */
}

const resetScore = () => {
  if (round === 3) {
    round = 0; // new game
    playerScore = 0;
    playerScoreSpan.textContent = playerScore;
    playerScoreSpan.style.color = "#ffffff";
    pengScore = 0;
    pengScoreSpan.textContent = pengScore;
    pengScoreSpan.style.color = "#ffffff";
    setPrimaryAppearance(optionButtons); // reset appearance for all option buttons
    toggleHideClass(scoresDiv);
    toggleHideClass(resultDiv);
  } else if (round === 0) {
    alert("A new game has started");
  } else {
    alert("Peng says, \"Let's finish the game\"");
  }
}
//----------------------------------------------------



optionButtons.forEach((btn, index) => {
  if (index <= 2) {
    btn.addEventListener("click", scoreKeeper); // to first three buttons
  }
})

resetBtn.addEventListener("click", resetScore);