var highScore = document.querySelector("highscore");
var clear = document.querySelector("#clear-HS");
var goBack = document.querySelector("#back");


clear.addEventListener("click", function() {
    localStorage.clear();
});

var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if(allScores !== null) {
    for (var i = 0; i < allScores.length; i++) {
        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(createLi);
    }
}

goBack.addEventListener("click", function() {
    window.location.replace("./index.html");
});