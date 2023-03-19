//get highscores from local storage
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

//sort highscores by score property in descending order
highScores.sort(function (a, b) {
    return b.score - a.score;
});

//populate highscores list
for (var i = 0; i < highScores.length; i++) {
    var li = document.createElement("li");
    li.textContent = highScores[i].initials + " - " + highScores[i].score;
    highScoresList.appendChild(li);
}


