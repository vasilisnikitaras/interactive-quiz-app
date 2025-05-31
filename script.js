const quizQuestions = [
    {
        question: "Ποιο είναι το μεγαλύτερο πλανητικό σώμα στο ηλιακό μας σύστημα;",
        answers: ["Γη", "Δίας", "Άρης", "Κρόνος"],
        correct: "Δίας"
    },
    {
        question: "Ποιο είναι το χημικό σύμβολο του Χρυσού;",
        answers: ["Hg", "Ag", "Au", "Pb"],
        correct: "Au"
    },
    {
        question: "Ποιος έγραψε την Ιλιάδα και την Οδύσσεια;",
        answers: ["Σοφοκλής", "Όμηρος", "Αριστοτέλης", "Πλάτων"],
        correct: "Όμηρος"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const feedbackText = document.getElementById("feedback-text");
const nextBtn = document.getElementById("next-btn");
const scoreText = document.getElementById("score-text");
const restartBtn = document.getElementById("restart-btn");

function loadQuestion() {
    feedbackText.textContent = "";
    nextBtn.style.display = "none";

    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.onclick = () => checkAnswer(answer);
        answersContainer.appendChild(button);
    });
}

function checkAnswer(selectedAnswer) {
    const currentQuestion = quizQuestions[currentQuestionIndex];

    if (selectedAnswer === currentQuestion.correct) {
        score++;
        feedbackText.textContent = "✅ Σωστό!";
    } else {
        feedbackText.textContent = "❌ Λάθος! Η σωστή απάντηση είναι: " + currentQuestion.correct;
    }

    nextBtn.style.display = "block";
}

nextBtn.onclick = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        loadQuestion();
    } else {
        showResults();
    }
};

function showResults() {
    document.getElementById("quiz").style.display = "none";
    scoreText.textContent = `Συνολικό σκορ: ${score} / ${quizQuestions.length}`;
    document.getElementById("results").style.display = "block";
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("quiz").style.display = "block";
    document.getElementById("results").style.display = "none";
    loadQuestion();
}

restartBtn.onclick = restartQuiz;

// Φόρτωση της πρώτης ερώτησης
loadQuestion();
