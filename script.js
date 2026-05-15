const questions = [
    {
        question: "What does AI mainly try to do?",
        answers: [
            "Make machines perform tasks that need human-like intelligence",
            "Only store large files",
            "Replace all computer hardware",
            "Work only without data"
        ],
        correct: 0
    },
    {
        question: "Which of these is an example of AI in daily life?",
        answers: [
            "Voice assistants like Siri or Alexa",
            "A plain notebook",
            "A normal pencil",
            "A wall clock without sensors"
        ],
        correct: 0
    },
    {
        question: "What is machine learning?",
        answers: [
            "A method where systems learn patterns from data",
            "A method for painting machines",
            "A way to remove all data",
            "A type of computer cable"
        ],
        correct: 0
    },
    {
        question: "Why is data important in AI?",
        answers: [
            "AI systems use data to learn and make decisions",
            "Data is only used to decorate websites",
            "AI cannot use data at all",
            "Data always makes systems slower"
        ],
        correct: 0
    },
    {
        question: "Which task can a chatbot perform?",
        answers: [
            "Answer user questions through text conversation",
            "Cook food physically",
            "Print money",
            "Repair a broken screen by itself"
        ],
        correct: 0
    },
    {
        question: "What is one safe practice when using AI tools?",
        answers: [
            "Review and understand the AI-generated output",
            "Submit AI output without reading it",
            "Share private passwords with AI tools",
            "Ignore mistakes in the output"
        ],
        correct: 0
    },
    {
        question: "What does a score update in this quiz show?",
        answers: [
            "JavaScript can change page content after user interaction",
            "CSS cannot style pages",
            "HTML can only show images",
            "Buttons cannot be interactive"
        ],
        correct: 0
    },
    {
        question: "Which three technologies are used in this project?",
        answers: [
            "HTML, CSS, and JavaScript",
            "Python, SQL, and Java",
            "Excel, Word, and PowerPoint",
            "Router, switch, and cable"
        ],
        correct: 0
    }
];

const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const scoreText = document.getElementById("score");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress-bar");
const resultCard = document.getElementById("result-card");
const resultTitle = document.getElementById("result-title");
const resultMessage = document.getElementById("result-message");
const playAgainButton = document.getElementById("play-again-btn");

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

function shuffleAnswers(question) {
    const answerObjects = question.answers.map((answer, index) => ({
        text: answer,
        isCorrect: index === question.correct
    }));

    return answerObjects.sort(() => Math.random() - 0.5);
}

function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function showQuestion() {
    answered = false;
    feedback.textContent = "Choose one answer to continue.";
    nextButton.disabled = true;
    answerButtons.innerHTML = "";

    const currentQuestion = questions[currentQuestionIndex];
    questionNumber.textContent = `${currentQuestionIndex + 1} of ${questions.length}`;
    questionText.textContent = currentQuestion.question;
    updateProgress();

    const shuffledAnswers = shuffleAnswers(currentQuestion);

    shuffledAnswers.forEach((answer) => {
        const button = document.createElement("button");
        button.className = "answer-btn";
        button.textContent = answer.text;
        button.type = "button";
        button.dataset.correct = answer.isCorrect;
        button.addEventListener("click", () => selectAnswer(button));
        answerButtons.appendChild(button);
    });
}

function selectAnswer(selectedButton) {
    if (answered) {
        return;
    }

    answered = true;
    const allButtons = document.querySelectorAll(".answer-btn");
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        score += 1;
        scoreText.textContent = score;
        selectedButton.classList.add("correct");
        feedback.textContent = "Correct answer. Well done!";
    } else {
        selectedButton.classList.add("wrong");
        feedback.textContent = "Wrong answer. The correct option is highlighted.";
    }

    allButtons.forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.disabled = false;
}

function showResult() {
    const percentage = Math.round((score / questions.length) * 100);
    resultCard.classList.remove("hidden");
    resultTitle.textContent = `You scored ${score} out of ${questions.length}`;

    if (percentage >= 75) {
        resultMessage.textContent = `Excellent work. Your score is ${percentage}%. You have a strong basic understanding of AI concepts.`;
    } else if (percentage >= 50) {
        resultMessage.textContent = `Good effort. Your score is ${percentage}%. Review the missed questions and try again.`;
    } else {
        resultMessage.textContent = `Your score is ${percentage}%. Keep practicing and the basics will become easier.`;
    }
}

function nextQuestion() {
    currentQuestionIndex += 1;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        nextButton.disabled = true;
        feedback.textContent = "Quiz completed. Check your final result below.";
        showResult();
    }
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreText.textContent = score;
    resultCard.classList.add("hidden");
    showQuestion();
}

nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", restartQuiz);
playAgainButton.addEventListener("click", restartQuiz);

showQuestion();
