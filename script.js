
// function getRandomNumbers(arr, count) {
//     // Create a copy of the array to avoid mutating the original
//     const arrayCopy = [...arr];
  
//     // Shuffle the array
//     for (let i = arrayCopy.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
//     }
  
//     // Return the first 'count' elements
//     return arrayCopy.slice(0, count);
//   }
  
//   const numbers = [0, 1, 2, 3, 4, 5, 6, 7];
//   const randomNumbers = getRandomNumbers(numbers, 4);
//   console.log(`${randomNumbers}`);
  
// I can use the code above without the API integration but I can use the code below to integrate the API

const getRandomNumbers = async (arr, count) => {
    const response = await fetch('https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new');
    const data = await response.json();
  
    const arrayCopy = [...arr];
  
    for (let i = arrayCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }
  
    return arrayCopy.slice(0, count);
  }

 const startGame = async () => {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7];
    const randomNumbers = await getRandomNumbers(numbers, 4);
    console.log(randomNumbers);
  }

console.log("Let's play Mastermind! Try to guess the 4-digit number.");

// I wrote this code when I built a timed quiz for my bootcamp and just integrated the code here

var Gamebtn = document.querySelector("#generate")
// QuizBtn.onclick = function () {
//     document.getElementById("#generate").remove(QuizBtn);
//     this.remove()
// };
var submitBtn = document.querySelector("#submit-initials")
var initialsPage = document.querySelector("#initials-page")
initialsPage.style.visibility="hidden"
var scorePage = document.querySelector("#score-page")
scorePage.style.visibility="hidden"
var quizWrapper = document.querySelector("#question-wrapper")
var score = 0
var timeLeft = 20
var timerEl = document.querySelector("#timer")
timerEl.textContent = timeLeft + ' seconds remaining';

//timer for the game//
function gameTime (){
  var timeInterval = setInterval(function () {
      console.log(timeLeft)
    // As long as the `timeLeft` is greater than 1
    if (timeLeft > 1) {
      // Set the `textContent` of `timerEl` to show the remaining seconds
      timerEl.textContent = timeLeft + ' seconds remaining';
      // Decrement `timeLeft` by 1
      timeLeft--;
    } else if (timeLeft === 1) {
      // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
      timerEl.textContent = timeLeft + ' second remaining';
      timeLeft--;
    } else {
      // Once `timeLeft` gets to 0, set `timerEl` to an empty string
      timerEl.textContent = '';
      // Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);
      // Call the `displayMessage()` function
      // displayMessage();
      endGame ()
    }
  }, 1000);
  showNextQuestion ()
} 

function saveScore () {
  var savedscore = localStorage.getItem("score")
  if (savedscore) {
      savedscore = JSON.parse(savedscore)
  }else {
      savedscore = []
  } 
  var initials = document.querySelector("#initials").value
  savedscore.push({
      initials: initials,
      score: score
  })
  localStorage.setItem("score",JSON.stringify(savedscore));
  showHighScores ()
  var playerScore = document.querySelector("#player-score")
  playerScore.textContent = initials + " : " + score
}

function showHighScores () {
  var showHighScore = document.querySelector("#highscore-table")
  var savedscore = localStorage.getItem("score")
  if (savedscore) {
      savedscore = JSON.parse(savedscore)
  }else {
      savedscore = []
  } 
  for (var i=0; i<savedscore.length; i++) {
      var contentHolder = document.createElement("div")
      contentHolder.textContent = savedscore[i].initials + ":" + savedscore[i].score
      showHighScore.appendChild(contentHolder)
  }
  scorePage.style.visibility="visible"
}

