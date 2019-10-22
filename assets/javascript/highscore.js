function printHighscore(){
// function to get local scores from local storage
var highscore = JSON.parse(window.localStorage.getItem("highscore")) || [];
//sorting the scores from highest to lowest
highscore.sort(function(a,b){
    return b.score - a.score;
});
// for loop to to create list item
highscore.forEach(function(score) {
    // create li tag for each high score
    var liTag = document.createElement("li");
    liTag.textContent = score.initials + " - " + score.score;

    var orderedList = document.getElementById("highscore");
    orderedList.appendChild(liTag);
});
}
printHighscore();
// clearing the high score function
function clearHighscore(){
    window.localStorage.removeItem("highscore");
    window.location.reload();

}
document.getElementById("clear").onclick = clearHighscore;

