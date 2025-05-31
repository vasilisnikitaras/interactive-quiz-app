const quizQuestions = [
    { question: "Ποιο είναι το μεγαλύτερο πλανητικό σώμα στο ηλιακό μας σύστημα;", answers: ["Γη", "Δίας", "Άρης", "Κρόνος"], correct: "Δίας" },
    { question: "Ποιο είναι το χημικό σύμβολο του Χρυσού;", answers: ["Hg", "Ag", "Au", "Pb"], correct: "Au" },
    { question: "Ποιος έγραψε την Ιλιάδα και την Οδύσσεια;", answers: ["Σοφοκλής", "Όμηρος", "Αριστοτέλης", "Πλάτων"], correct: "Όμηρος" },
    { question: "Πόσα δευτερόλεπτα έχει ένα λεπτό;", answers: ["30", "60", "90", "120"], correct: "60" },
    { question: "Ποιο είναι το εθνικό φαγητό της Ιταλίας;", answers: ["Σούσι", "Τακός", "Πίτσα", "Κρέπες"], correct: "Πίτσα" }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timerInterval;

const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const feedbackText = document.getElementById("feedback-text");
const nextBtn = document.getElementById("next-btn");
const scoreText = document.getElementById("score-text");
const restartBtn = document.getElementById("restart-btn");
const timerDisplay = document.createElement("p");
timerDisplay.id = "timer";
document.getElementById("quiz").appendChild(timerDisplay);

function loadQuestion() {
    feedbackText.textContent = "";
    nextBtn.style.display = "none";
    resetTimer();

    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.onclick = () => checkAnswer(answer);
        answersContainer.appendChild(button);
    });

    startTimer();
}

function checkAnswer(selectedAnswer) {
    clearInterval(timerInterval);
    const currentQuestion = quizQuestions[currentQuestionIndex];

    if (selectedAnswer === currentQuestion.correct) {
        score++;
        feedbackText.textContent = "✅ Σωστό!";
    } else {
        feedbackText.textContent = "❌ Λάθος! Η σωστή απάντηση είναι: " + currentQuestion.correct;
    }

    nextBtn.style.display = "block";
}

function startTimer() {
    timeLeft = 10;
    timerDisplay.textContent = `Χρόνος: ${timeLeft}s`;
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Χρόνος: ${timeLeft}s`;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            feedbackText.textContent = "⏳ Χρόνος εξαντλήθηκε! Η σωστή απάντηση είναι: " + quizQuestions[currentQuestionIndex].correct;
            nextBtn.style.display = "block";
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    timerDisplay.textContent = "Χρόνος: 10s";
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

function checkAnswer(selectedAnswer) {
    clearInterval(timerInterval);
    const currentQuestion = quizQuestions[currentQuestionIndex];
    
    if (selectedAnswer === currentQuestion.correct) {
        score++;
        feedbackText.textContent = "✅ Σωστό!";
        event.target.classList.add("correct-answer");
    } else {
        feedbackText.textContent = "❌ Λάθος! Η σωστή απάντηση είναι: " + currentQuestion.correct;
        event.target.classList.add("wrong-answer");
    }

    nextBtn.style.display = "block";
}


restartBtn.onclick = restartQuiz;

// Φόρτωση της πρώτης ερώτησης
loadQuestion();




