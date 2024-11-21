// define criteria
// add event listener?
// query selector?
// score page and timer
function getRandomNumbers(arr, count) {
    // Create a copy of the array to avoid mutating the original
    const arrayCopy = [...arr];
  
    // Shuffle the array
    for (let i = arrayCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }
  
    // Return the first 'count' elements
    return arrayCopy.slice(0, count);
  }
  
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7];
  const randomNumbers = getRandomNumbers(numbers, 4);
  console.log(`${randomNumbers}`);
  



