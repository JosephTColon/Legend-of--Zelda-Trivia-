//Declared variables
var currentTime = document.querySelector("#timer");
var timer = document.querySelector("#start-time");
var questionVar = document.querySelector("#questions")
var score = 0;
var questionIndex =0;
var ulCreator = document.createElement("ul");

//time variables
var secondsLeft = 80;
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

