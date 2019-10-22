// variables for quiz
var questionIndex = 0;
var time = questions.length * 15;
var timeId;

// var for dom elements
var quizHolderEl = document.getElementById("quizHolder");
var counterEl = document.getElementById("counter");
var choicesEl = document.getElementById("choices");
var quizGameEl = document.getElementById("quizGame");
var submitBtnEl = document.getElementById("submit");
var initialsEl = document.getElementById("intials");
var feedBack = document.getElementById("feedback");

// quiz game funtion

function startQuiz(){
    // to hide the start screen
    var introEl = document.getElementById("intro");
    introEl.setAttribute("class","invisible");
    // start timer
    timerId = setInterval(clockTick, 1000);
    //show start time
    counterEl.textContent = time;

    // un-hide quiz section
    quizHolderEl.removeAttribute("class");

    retQuestion();
}

function retQuestion(){
    //get question from array
    var curQuestion = questions[questionIndex];
    var titleEl = document.getElementById("title");
    titleEl.textContent = curQuestion.title;
    choicesEl.innerHTML="";
    //loop over choices
    curQuestion.choices.forEach(function(choice, i){
        var choicebtn = document.createElement("button");
        choicebtn.setAttribute("class","choice");
        choicebtn.setAttribute("value",choice);
        choicebtn.textContent = i + 1 + ". " + choice;

    choicebtn.onclick = questionClick;

    choicesEl.appendChild(choicebtn);
        
    });
}

function questionClick() {
    if(this.value !== questions[questionIndex].answer){
        time -= 15;

        if (time < 0){
            time=0;
        }
        counterEl.textContent = time;

        feedBack.textContent = "Wrong";
    } else { 
        feedBack.textContent = "Right";
    }
    feedBack.setAttribute("class", "feedback");
    setTimeout(function() {
        feedBack.setAttribute("class", "feedback hide");
    }, 1000);
    questionIndex ++;

    if(questionIndex === questions.length) {
        quizEnd();
    }else {
        retQuestion();
    }
}
// end of quiz function
function quizEnd() {
    //show the end screen
    var endGame = document.getElementById("endgame");
    endGame.removeAttribute("class");

    // stop timer
    clearInterval(timerId);

    var finalScore= document.getElementById("final-score");
    finalScore.textContent= time;

    //hide the quiz game
    quizHolderEl.setAttribute("class","invisible");
}

    function clockTick(){
        time--;
        counterEl.textContent = time;

        if(time<= 0) {
            quizEnd();
        }
    }
    function saveHighscore() {
        // get value of input box
        var initials = initialsEl.value.trim();
      
        // make sure value wasn't empty
        if (initials !== "") {
          // get saved scores from localstorage, or if not any, set to empty array
          var highscores =
            JSON.parse(window.localStorage.getItem("highscore")) || [];
      
          // format new score object for current user
          var newScore = {
            score: time,
            initials: initials
          };
      
          // save to localstorage
          highscores.push(newScore);
          window.localStorage.setItem("highscore", JSON.stringify(highscores));
      
          // redirect to next page
          window.location.href = "highscore.html";
        }
      }
function checkForEnter(event){
    if (event.key === "Enter"){
        saveHighscore();

}
    
}
submitBtnEl.onlick = saveHighscore;

quizGameEl.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;