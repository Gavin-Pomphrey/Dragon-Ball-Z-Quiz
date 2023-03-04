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

//event listener for start button
startButton.addEventListener('click', startQuiz);


//function to start quiz
function startQuiz() {
    console.log("started");
    //hide start screen and show quiz screem
    document.getElementById("start-screen").classList.add("hide");
    questionContainerElement.classList.remove("hide");
    //shuffle questions
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    //start timer
    startTimer();
    //show first question
    showQuestion();
}

//function to start the timer
function startTimer() {
    const timerInterval = setInterval(function () {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

//function to show questions
function showQuestion() {
    resetState();
    showScore();
    //show question
    questionElement.innerText = questions[currentQuestionIndex].question;
    //create buttons for answers
    questions[currentQuestionIndex].answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}
//function to reset state
function resetState() {
    nextButton.classList.add("hide");
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

//function to select answer
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    if (correct) {
        score++;
        showScore();
    }
    //set status class to correct or incorrect
    setStatusClass(document.body, correct);
    //disable answer buttons
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct) === "true";
        button.disabled = true;
    });
    //show next button
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide");
    }
    else {
        endQuiz();
    }
}

//function to set status class on answer button
function setStatusClass(element, correct) {
    element.classList.remove("correct");
    element.classList.remove("incorrect");
    if (correct) {
        element.classList.add("correct");
    }
    else {
        element.classList.add("incorrect");
    }
}

//function to show score
function showScore() {
    scoreElement.innerText = score;
}

//add event listener to next button
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    showQuestion();
});

//function to end quiz
function endQuiz() {
    questionContainerElement.classList.add("hide");
    document.getElementById("end-screen").classList.remove("hide");
    document.getElementById("final-score").innerText = score;
}

//