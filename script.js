var boxArr = document.querySelectorAll(".box");
var questionDisplay = document.getElementById("questionDisplay");
var score = document.getElementById("score");
var countdownBar = document.getElementById("countdownBar");
var startBtn = document.getElementById("startBtn"); // Get the <button> element that closes the modal and starts game
var modal = document.getElementById('myModal'); // Get the modal
var colors = []; //array with 4 random colors
var correctColor = null; //choose random 1 of 4 colors
var currentScore = 0;
var count = 120;
var interval;
var barWidth = 100;

// When the user clicks on start button, close the modal and start game
startBtn.onclick = function() {
  getQuestion();
  startCounter();
  modal.style.display = "none";
}

//display modal before game
modal.style.display = "block";

for (var i = 0; i < boxArr.length; i++) {
  //add clikclisteners to squares
  boxArr[i].addEventListener("click", function() {
    var clickedSquare = this.style.backgroundColor;
    if (clickedSquare === correctColor) {
      currentScore = currentScore + 3;
      score.textContent = currentScore;
      countdownBar.style.backgroundColor = correctColor;
    } else {
      if (currentScore > 0)
        score.textContent = --currentScore;
    }
    getQuestion();
  });
}

//return random number from 0 to 3
function pickColor() {
  var rnd = Math.floor(Math.random() * 4);
  return colors[rnd];
}
//generate array with 4 random rgb colors
function generateRndColors() {
  var arr = [];
  for (var i = 0; i < 4; i++) {
    arr.push(randomColor());
  }
  return arr;
}
//generate 1 random rgb color
function randomColor() {
  var r = Math.floor(Math.random() * 256); //red
  var g = Math.floor(Math.random() * 256); //green
  var b = Math.floor(Math.random() * 256); //blue
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

function getQuestion() {
  colors = generateRndColors();
  correctColor = pickColor();
  questionDisplay.textContent = correctColor;
  for (var i = 0; i < boxArr.length; i++) {
    //add colors to squares
    boxArr[i].style.backgroundColor = colors[i];
  }
}

//time counter
function startCounter() {
  interval = setInterval(function() {
    count--;
    barWidth = barWidth - (100 / 120);
    countdownBar.style.width = barWidth + '%';
    if (count === 0) {
      countdownBar.style.width = '0%';
      clearInterval(interval);
      gameOver();
    }
  }, 1000);
}

function gameOver() {
  document.getElementById("modalText").textContent = "HIGHSCORE: " + getScore() + "\r\n" + "YOUR SCORE: " + currentScore;
  if (getScore() === null || currentScore > getScore()) {
    saveScore();
  }
  resetGame();
  modal.style.display = "block";
  document.getElementById("modalHeader").textContent = "GAME OVER";
  document.getElementById("startBtn").textContent = "RESTART";
}

//save Score to localstorage
function saveScore() {
  localStorage.setItem('highscore', currentScore);
}
//read highscore form localstorage
function getScore() {
  if (localStorage.getItem('highscore') === null)
    return 0;
  else
    return localStorage.getItem('highscore');
}

//reset game variables
function resetGame() {
  countdownBar.style.width = '100%';
  barWidth = 100;
  count = 120;
  currentScore = 0;
  score.textContent = 0;
};