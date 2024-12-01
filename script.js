
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
    console.log("response", response);
    const data = response && (await getNums(response));    
    console.log("data", data);
    const arrayCopy = [...arr];
  

    function getNums(response) {
      const { data } = response;
      let nums = data.split("\n");
      nums.pop();
      let numsInt = nums.map((nums) => parseInt(nums));
      console.log("numsInt", numsInt);
      return numsInt;
    
    }

    for (let i = arrayCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }
    return arrayCopy.slice(0, count);
  }


 const startGame = async () => {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7];
    const randomNumbers = await getRandomNumbers(numbers, 4);
    console.log("randomNumbers", randomNumbers);
  }

console.log("Let's play Mastermind! Try to guess the 4-digit number.");

// I wrote this code when I built a timed quiz for my bootcamp and just integrated the code here

let Gamebtn = document.querySelector("#generate")
// QuizBtn.onclick = function () {
//     document.getElementById("#generate").remove(QuizBtn);
//     this.remove()
// };
let submitBtn = document.querySelector("#submit-initials")
let initialsPage = document.querySelector("#initials-page")
initialsPage.style.visibility="hidden"
let scorePage = document.querySelector("#score-page")
scorePage.style.visibility="hidden"
let quizWrapper = document.querySelector("#question-wrapper")
let score = 0
let timeLeft = 20
let timerEl = document.querySelector("#timer")
timerEl.textContent = timeLeft + ' seconds remaining';

Gamebtn.addEventListener("click", startGame);
Gamebtn.addEventListener("mouseup", hideElements);
function hideElements () {
   Gamebtn.style.visibility="hidden"
}

//timer for the game//
function gameTime (){
  let timeInterval = setInterval(function () {
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
  let savedscore = localStorage.getItem("score")
  if (savedscore) {
      savedscore = JSON.parse(savedscore)
  }else {
      savedscore = []
  } 
  let initials = document.querySelector("#initials").value
  savedscore.push({
      initials: initials,
      score: score
  })
  localStorage.setItem("score",JSON.stringify(savedscore));
  showHighScores ()
  let playerScore = document.querySelector("#player-score")
  playerScore.textContent = initials + " : " + score
}

function showHighScores () {
  let showHighScore = document.querySelector("#highscore-table")
  let savedscore = localStorage.getItem("score")
  if (savedscore) {
      savedscore = JSON.parse(savedscore)
  }else {
      savedscore = []
  } 
  for (let i=0; i<savedscore.length; i++) {
      let contentHolder = document.createElement("div")
      contentHolder.textContent = savedscore[i].initials + ":" + savedscore[i].score
      showHighScore.appendChild(contentHolder)
  }
  scorePage.style.visibility="visible"
}

