const questions = [
    {
        question: "What is full of holes but still holds water?",
        answers: [
            { text: "A bucket", correct: false },
            { text: "A sponge", correct: true },
            { text: "A strainer", correct: false },
            { text: "A sieve", correct: false }
        ]
    },
    {
        question: "What has keys but can't open locks?",
        answers: [
            { text: "A map", correct: false },
            { text: "A lock", correct: false },
            { text: "A piano", correct: true },
            { text: "A door", correct: false }
        ]
    },
    {
        question: "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?",
        answers: [
            { text: "An echo", correct: true },
            { text: "A shadow", correct: false },
            { text: "A ghost", correct: false },
            { text: "A whisper", correct: false }
        ]
    },
    {
        question: "What can travel around the world while staying in a corner?",
        answers: [
            { text: "A letter", correct: false },
            { text: "A stamp", correct: true },
            { text: "A postcard", correct: false },
            { text: "An envelope", correct: false }
        ]
    },
    {
        question: "What comes once in a minute, twice in a moment, but never in a thousand years?",
        answers: [
            { text: "The letter 'M'", correct: true },
            { text: "A blink", correct: false },
            { text: "A breath", correct: false },
            { text: "A leap year", correct: false }
        ]
    }
];

const question = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-btns");
const nextButton = document.querySelector(".next-btn button");
const quizContainer = document.querySelector(".quiz");
const header = document.querySelector("#heading");
const restartButton = document.querySelector(".restart-btn");

let score = 0;
let currQuestionIndex = 0;

function startQuiz() {
    score = 0;
    currQuestionIndex = 0;
    nextButton.innerHTML = "Next";
    quizContainer.style.display = "block";
    header.innerHTML = "Simple Quiz";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currQuestion = questions[currQuestionIndex];
    const questionNo = currQuestionIndex + 1;
    question.innerHTML = questionNo + ". " + currQuestion.question;

    currQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        score++;
        selectedButton.classList.add("correct");
    } else {
        selectedButton.classList.add("wrong");
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

nextButton.addEventListener('click', () => {
    if (currQuestionIndex < questions.length - 1) {
        currQuestionIndex++;
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    quizContainer.style.display = "none";
    header.innerHTML = `Your score is ${score}/${questions.length}!`;
    nextButton.innerHTML = "<t>Play Again!";
    nextButton.style.display = "flex";
    nextButton.removeEventListener('click', showScore);
    nextButton.addEventListener('click', startQuiz);
}

startQuiz();
