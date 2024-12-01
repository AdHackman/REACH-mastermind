
// const getRandomNumbers(arr, count) {
//     // Create a copy of the array to avoid mutating the original
//     const arrayCopy = [...arr];

// const { start } = require("repl");

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

// const getRandomNumbers = async (arr, count) => {
//   try {
//     const response = await fetch('https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new');
//     console.log("response", response);
//   } catch (error) {
//     console.log("response", response);
//     const data = await response.json();    
//     console.log("data", data);
//     console.log(error)
//     // const arrayCopy = [...arr];

//     // for (let i = arrayCopy.length - 1; i > 0; i--) {
//     //   const j = Math.floor(Math.random() * (i + 1));
//     //   [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
//     // }
//     console.log(error)
//     // return arrayCopy.slice(0, count);
//   }
// }

const getRandomNumbers = async () => {
  try {
    // Fetch random numbers from the API
    const response = await fetch(
      "https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new"
    );
    if (!response.ok) {
      throw new Error(`Error fetching random numbers: ${response.status}`);
    }

    // Parse response text into an array of numbers
    const text = await response.text();
    const randomNumbers = text
      .trim()
      .split("\n")
      .map((num) => parseInt(num, 10)); // Convert strings to integers

    return randomNumbers;
  } catch (error) {
    console.error("Failed to fetch random numbers:", error);
    return null;
  }
};

// const getNums(response) {
//   const { data } = response;
//   let nums = data.split("\n");
//   nums.pop();
//   let numsInt = nums.map((nums) => parseInt(nums));
//   console.log("numsInt", numsInt);
//   return numsInt;

// }
const startGame = async () => {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7];
  const randomNumbers = await getRandomNumbers(numbers, 4);
  console.log("randomNumbers", randomNumbers);
}

console.log("Let's play Mastermind! Try to guess the 4-digit number.");

// I wrote this code when I built a timed quiz for my bootcamp and just integrated the code here

// let Gamebtn = document.querySelector("#generate")
// QuizBtn.onclick = const () {
//     document.getElementById("#generate").remove(QuizBtn);
//     this.remove()
// };
let submitBtn = document.querySelector("#submit-initials")
let initialsPage = document.querySelector("#initials-page")
initialsPage.style.visibility = "hidden"
let scorePage = document.querySelector("#score-page")
scorePage.style.visibility = "hidden"
let quizWrapper = document.querySelector("#question-wrapper")
let score = 0
let timeLeft = 20
let timerStarted = false
let timerEl = document.querySelector("#timer")
timerEl.textContent = timeLeft + ' seconds remaining';


//timer for the game//
const startTimer = () => {
  if (timerStarted) {
    return 
  }
  let timeInterval = setInterval(() => {
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
      // Call the `displayMessage()` const
      // displayMessage();
      endGame()
    } 
  }, 1000);
}

const saveScore = () => {
  let savedscore = localStorage.getItem("score")
  if (savedscore) {
    savedscore = JSON.parse(savedscore)
  } else {
    savedscore = []
  }
  let initials = document.querySelector("#initials").value
  savedscore.push({
    initials: initials,
    score: score
  })
  localStorage.setItem("score", JSON.stringify(savedscore));
  showHighScores()
  let playerScore = document.querySelector("#player-score")
  playerScore.textContent = initials + " : " + score
  console.log("score", score)
}

const showHighScores = () => {
  let showHighScore = document.querySelector("#highscore-table")
  let savedscore = localStorage.getItem("score")
  if (savedscore) {
    savedscore = JSON.parse(savedscore)
  } else {
    savedscore = []
  }
  for (let i = 0; i < savedscore.length; i++) {
    let contentHolder = document.createElement("div")
    contentHolder.textContent = savedscore[i].initials + ":" + savedscore[i].score
    showHighScore.appendChild(contentHolder)
  }
  scorePage.style.visibility = "visible"
}

///////event listeners////////
let secretCode = [];
let attemptsRemaining = 10;

//when the document is loaded, the start button is displayed and re
const initializeGame = async () => {
  const form = document.getElementById("game-form");
  const guessInput = document.getElementById("guess");
  const feedback = document.getElementById("feedback"); 

  // Game state
  secretCode = await getRandomNumbers();
};

const getGuess = () =>{
  let input = document.getElementById("guess").value.trim().split("").map(Number);
  return input
}
// check if the guess is correct
const checkGuess = (event) =>{
  event.preventDefault(); // Prevent form from refreshing the page
 startTimer() //start the timer when the game starts

  const guess = getGuess();

  // Validate input length
  if (guess.length !== 4) {
    feedback.textContent = "Please enter exactly 4 digits.";
    return;
  }

  // Validate input digits
  if (!guess.every((digit) => digit >= 0 && digit <= 7)) {
    feedback.textContent = "Digits must be between 0 and 7.";
    return;
  }

  // Compare guess with secret code
  let correctNumbers = 0;
  let correctPositions = 0;

  console.log("secretCode", secretCode)
  guess.forEach((digit, index) => {
    if (secretCode.includes(digit)) correctNumbers++;
    if (secretCode[index] === digit) correctPositions++;
  });

  // Provide feedback
  if (correctPositions === 4) {
    feedback.textContent = "Congratulations! You guessed the code!";
    disableForm() // Disable form after winning
  } else {
    feedback.textContent = `${correctNumbers} correct number(s) and ${correctPositions} correct position(s).`;
    attemptsRemaining--;

    // Update attempts remaining
    updateAttemptsRemaining(attemptsRemaining);
    
    // End game if attempts run out
    if (attemptsRemaining === 0) {
    endGame();}
  }
}

const disableForm = () => {
  const form = document.getElementById("game-form");
  form.querySelector("button#submit-guess").disabled = true;
}

const updateAttemptsRemaining = (attemptsRemaining) => {
  const attemptsRemainingDisplay = document.getElementById("attempts-remaining").querySelector("span");
  attemptsRemainingDisplay.textContent = attemptsRemaining;
}

const endGame = () => {
  feedback.textContent = `Game Over! The correct code was ${secretCode.join("")}.`;
  disableForm() // Disable form after losing
}