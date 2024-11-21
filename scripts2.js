// const APIkey = "43d3ce9a4d6be02e5f3dbc9ba49a17b0"
// var apiURL = 'http://api.openweathermap.org/geo/1.0/direct?q={cityName}&limit=5&units=imperial&appid=' + APIkey;
// var weatherAPI = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&units=imperial&appid=" + APIkey;
// //learned from tutor and the API website that I can update the weather units by adding &units=imperial to the URL, all URL's actions are separated by &. 
// function getCityGeoCodes(cityName) {
//     var validURL = apiURL.replace("{cityName}", cityName);
//     //replace function is the first parameter of what we are looking for and the second parameter is the new value we are looking for
//     //    alert(validURL)
//     $.ajax({
//         url: validURL,
//         method: 'GET',
//         success: function (response) {
//             // Handle the API response here
//             console.log(response);
//             // alert(response)
//             var json = JSON.parse(JSON.stringify(response));
//             //we are parsing the response using jquery
//             // alert(json[0].name)
//             // alert(json[0].lat)
//             getWeatherApi(json[0].lat, json[0].lon)
//             getCurrentAPI(json[0].lat, json[0].lon)
//             // alert(json[0].lon)
//         },
//         error: function (xhr, status, error) {
//             // Handle errors here
//             // console.error(status, error);
//         }

//     });





function startGame (){
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