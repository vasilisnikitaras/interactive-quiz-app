const categories = {
    science: [
        { question: "Ποιο είναι το χημικό σύμβολο του Χρυσού;", answers: ["Hg", "Ag", "Au", "Pb"], correct: "Au" },
        { question: "Ποιος πλανήτης είναι γνωστός ως Κόκκινος Πλανήτης;", answers: ["Άρης", "Δίας", "Κρόνος", "Αφροδίτη"], correct: "Άρης" }
    ],
    history: [
        { question: "Ποιος έγραψε την Ιλιάδα και την Οδύσσεια;", answers: ["Σοφοκλής", "Όμηρος", "Αριστοτέλης", "Πλάτων"], correct: "Όμηρος" },
        { question: "Ποια χρονιά έγινε η Γαλλική Επανάσταση;", answers: ["1776", "1789", "1804", "1815"], correct: "1789" }
    ],
    sports: [
        { question: "Πόσα λεπτά διαρκεί ένας ποδοσφαιρικός αγώνας;", answers: ["60", "90", "120", "45"], correct: "90" },
        { question: "Ποιος είναι ο πιο διάσημος παίκτης μπάσκετ;", answers: ["ΛεΜπρόν Τζέιμς", "Μάικλ Τζόρνταν", "Κόμπι Μπράιαντ", "Στεφ Κάρι"], correct: "Μάικλ Τζόρνταν" }
    ]
};

let selectedCategory = "science";
let quizQuestions = categories[selectedCategory];
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
const timerDisplay = document.getElementById("timer");
const playerNameInput = document.getElementById("player-name");

function setCategory(category) {
    selectedCategory = category;
    quizQuestions = categories[selectedCategory];
    currentQuestionIndex = 0;
    loadQuestion();
}

function loadQuestion() {
    feedbackText.textContent = "";
    nextBtn.style.display = "none";
    resetTimer();

    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    questionText.classList.remove("time-up");
    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.onclick = () => checkAnswer(answer, button);
        answersContainer.appendChild(button);
    });

    startTimer();
}

function checkAnswer(selectedAnswer, button) {
    clearInterval(timerInterval);
    const currentQuestion = quizQuestions[currentQuestionIndex];

    if (selectedAnswer === currentQuestion.correct) {
        score++;
        feedbackText.textContent = "✅ Σωστό!";
        button.classList.add("correct-answer");
    } else {
        feedbackText.textContent = "❌ Λάθος! Η σωστή απάντηση είναι: " + currentQuestion.correct;
        button.classList.add("wrong-answer");
    }

    setTimeout(() => nextBtn.click(), 2000);
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
            questionText.classList.add("time-up");
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

function updateLeaderboard() {
    let playerName = playerNameInput.value.trim();
    if (playerName === "") {
        playerName = "Άγνωστος Παίκτης";
    }

    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push({ name: playerName, score: score });
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

    displayLeaderboard();
}

function displayLeaderboard() {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    scoreText.innerHTML = "<h3>Leaderboard</h3>";
    leaderboard.forEach((entry, i) => {
        scoreText.innerHTML += `<p>${i + 1}. ${entry.name}: ${entry.score} πόντοι</p>`;
    });
}

function showResults() {
    document.getElementById("quiz").style.display = "none";
    scoreText.textContent = `Συνολικό σκορ: ${score} / ${quizQuestions.length}`;
    document.getElementById("results").style.display = "block";
    updateLeaderboard();
}

restartBtn.onclick = () => location.reload();

loadQuestion();
