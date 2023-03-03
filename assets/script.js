// variables for quiz elements
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");

// variables for quiz questions
let shuffledQuestions, currentQuestionIndex;
let score = 0;
let timeLeft = 60;

//array for questions
const questions = [
    {
        question: 'Who is the protagoniist of Dragon Ball Z?',
        answers: [
            { text: 'Goku', correct: true },
            { text: 'Vegeta', correct: false },
            { text: 'Gohan', correct: false },
            { text: 'Piccolo', correct: false }
        ]
    },
    {
        question: 'What Gokus saiyan name?',
        answers: [
            { text: 'Earth', correct: false },
            { text: 'Vegeta', correct: false },
            { text: 'Namek', correct: false },
            { text: 'Kakarot', correct: true }
        ]
    },
    {
        question: 'What is the name of the planet where the Saiyans are from?',
        answers: [
            { text: 'Earth', correct: false },
            { text: 'Vegeta', correct: true },
            { text: 'Namek', correct: false },
            { text: 'Kakarot', correct: false }
        ]
    },
    {
        question: 'What is the name of the planet where the Namekians are from?',
        answers: [
            { text: 'Earth', correct: false },
            { text: 'Vegeta', correct: false },
            { text: 'Namek', correct: true },
            { text: 'Kakarot', correct: false }
        ]
    },
    {
        question: 'Who is Gohan fighting when he goes Super Saiyan 2 for the first time?',
        answers: [
            { text: 'Cell', correct: true },
            { text: 'Vegeta', correct: false },
            { text: 'Frieza', correct: false },
            { text: 'Kakarot', correct: false }
        ]
    },

];

function startQuiz() {
    console.log("Started");
}

startButton.addEventListener('click', startQuiz);

document.addEventListener("DOMContentLoaded", function () {
//function to start quiz
function startQuiz() {
    //reset game
    score = 0;
    timeLeft = 60;
    currentQuestionIndex = 0;
    //hide start button
    startButton.classList.add("hide");
    //show question container
    questionContainerElement.classList.remove("hide");
    //shuffle questions
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    //start timer
    startTimer();
    //show the first question
    setNextQuestion();
}

//function to get questions from array
function setNextQuestion() {
    const question = shuffledQuestions[currentQuestionIndex];
    questionElement.innerText = question.question;
    answerButtonsElement.innerHTML = "";
    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

//function that checks if answer is correct
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
        score++;
        scoreElement.innerText = score;
    }
    else {
        timeLeft -= 10;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        setNextQuestion();
    }
    else {
        endGame();
    }
}

//remove question container and show end screen
function endGame() {
    questionContainerElement.classList.add("hide");
    const endScreenElement = document.getElementById("end-screen");
    endScreenElement.classList.remove("hide");
    const finalScoreElement = document.getElementById("final-score");
    finalScoreElement.innerText = score;
}

// function for when submit button is clicked, users scores and initials ars saved to local storage
function submitScore() {
    const initials = document.getElementById("initials").value;
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    const newScore = {
        score: score,
        initials: initials
    };
    highScores.push(newScore);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("highscores.html");
}
});