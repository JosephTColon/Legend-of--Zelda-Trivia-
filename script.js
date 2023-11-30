//Declared variables
var currentTime = document.querySelector("#timer");
var timer = document.querySelector("#start-time");
var questionVar = document.querySelector("#questions")
var score = 0;
var questionIndex =0;
var ulCreator = document.createElement("ul");

//time variables
var secondsLeft = 60;
var holdInterval = 0;
var penalty = 7;

// Questions
var questions = [
    {
        title: "Which game in the series was the first to feature 3D graphics?",
        choices:["The Legend of Zelda: Majora's Mask","The Legend of Zelda: A Link to the Past","The Legend of Zelda: Ocarina of Time","The Legend of Zelda: The Wind Waker",],
        answer: "The Legend of Zelda: A Link to the Past"
    },
    {
        title: "What is the name of the land in which most of the games take place?",
        choices:["Hyrule","Termina","Lorule","The Great Sea",],
        answer: "Hyrule"
    },
    {
        title: "What is the name of the guardian spirit that guides Link in Ocarina of Time?",
        choices:["Midna","Mipha","Navi","Daruk",],
        answer: "Navi"
    },
    {
        title: "How many masks can be collected in The Legend of Zelda: Majora's Mask?",
        choices:["10 masks","24 masks","33 masks","27 masks",],
        answer: "24"
    },
]


// Timer on button click
timer.addEventListener("click", function() {
    if (holdInterval === 0) {
        holdInterval = setInterval(function() {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft<=0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "FINISHED!!"
            }
        }, 1000);
    }
    render(questionIndex);
});

// Renders questions to page
function render(questionIndex) {
    questionVar.innerHTML ="";
    ulCreator.innerHTML ="";
    for(var i = 0; i < questions.length; i++){
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionVar.textContent = userQuestion
    }
    userChoices.forEach(function(newItem) {
        var listItem =document.createElement("li");
        listItem.textContent = newItem;
        questionVar.appendChild(ulCreator);
        ulCreator.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

function compare(event) {
    var element = event.target;
    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        if (element.textContent == questions[questionIndex].answer){
            score++;
            createDiv.textContent = "Correct!"
        } else {
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong"
        }
    }
    questionIndex++;

    if (questionIndex >= questions.length){
        allDone();
        createDiv.textContent = "You Finished";
    } else {
        render(questionIndex);
    }
    questionVar.appendChild(createDiv);
}

// Once all done append last page
function allDone() {
    questionVar.innerHTML = "";
    timer.innerHTML = "";
    // creates a heading
    var createHead = document.createElement("h1");
    createHead.setAttribute("id", "createH1");
    createHead.textContent = "You did it!!"
    questionVar.appendChild(createHead);
    // creates paragraph
    var createParagraph = document.createElement("p");
    createParagraph.setAttribute("id", "createP");
    questionVar.appendChild(createParagraph);
    // calculates time remaining
    if(secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createParagraph.textContent = "Your score is " + timeRemaining;
        questionVar.appendChild(createP2);
    }
    // Creates Label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionVar.appendChild(createLabel);
    
    // Creates input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "submit");
    createInput.textContent = "submit";

    questionVar.appendChild(createInput);
    // Creates submits
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit")
    createSubmit.setAttribute("id", "submit")
    createSubmit.textContent = "submit";

    questionVar.appendChild(createSubmit);

    createSubmit.addEventListener("click", function() {
        var initials = createInput.value;
        if(initials === null) {
            console.log("no value entered.");
        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            var allScores = localStorage.getItem("allScore");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            window.location.replace("./HighScore.html");
        }
    });
    
}
