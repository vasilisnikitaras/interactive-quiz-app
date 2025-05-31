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
const nextBtn = document.getElementById("next-btn");
const scoreText = document.getElementById("score-text");

function loadQuestion() {
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
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById("quiz").style.display = "none";
    scoreText.textContent = `Συνολικό σκορ: ${score} / ${quizQuestions.length}`;
}

nextBtn.onclick = () => {
    if (currentQuestionIndex < quizQuestions.length) {
        loadQuestion();
    }
};

// Φόρτωση της πρώτης ερώτησης
loadQuestion();
