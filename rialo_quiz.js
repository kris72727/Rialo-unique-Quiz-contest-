// --- RIALO BLOCKCHAIN KNOWLEDGE QUIZ DATA (20 Questions) ---
const quizQuestions = [
    // ... [Insert the 20 questions and answers you provided here] ...
    { "question": "Who are the founders of Rialo Blockchain?", "options": ["Vitalik Buterin and Gavin Wood", "Ade Adepoju and Lu Zhang", "Satoshi Nakamoto and Hal Finney", "Charles Hoskinson and Jeremy Wood"], "answer": "Ade Adepoju and Lu Zhang" },
    { "question": "What is the main principle for winning a role in Rialo Club?", "options": ["Posting daily", "Quality over quantity", "First entry only", "Number of followers"], "answer": "Quality over quantity" },
    { "question": "When are winners announced in the Rialo Club?", "options": ["Monthly", "Every Tuesday", "Random days", "End of year"], "answer": "Every Tuesday" },
    { "question": "Where can club members find the list of tasks?", "options": ["#general", "#club-tasks", "#random", "#resources"], "answer": "#club-tasks" },
    { "question": "What should members do if not selected as a winner this week?", "options": ["Stop contributing", "Continue contributing next week", "Complain in chat", "Switch clubs"], "answer": "Continue contributing next week" },
    { "question": "Which option best describes Rialo’s unique feature?", "options": ["Only supports Proof-of-Work", "Native real-world event integration for dApps", "No smart contracts", "Centralized processing"], "answer": "Native real-world event integration for dApps" },
    { "question": "What kind of content increases visibility in Rialo Club?", "options": ["Spam messages", "High-quality, useful posts on social networks", "Only memes", "Only bug reports"], "answer": "High-quality, useful posts on social networks" },
    { "question": "What phrase does Rialo Club use for evaluating contributions?", "options": ["Quantity is everything", "Speed matters", "Quality > Quantity", "Automatic selection"], "answer": "Quality > Quantity" },
    { "question": "Where do members submit links to completed tasks?", "options": ["#random", "#contributions", "#welcome", "#resources"], "answer": "#contributions" },
    { "question": "What is the Rialo blockchain’s primary architecture?", "options": ["Proof-of-Work only", "Event-Driven Architecture (EDA)", "Passive State Blockchain", "Only CPU mining"], "answer": "Event-Driven Architecture (EDA)" },
    { "question": "Which VM compatibility does Rialo offer developers?", "options": ["Java VM", "Solana VM", "Ethereum VM", "C++ VM"], "answer": "Solana VM" },
    { "question": "What is a full node in blockchain?", "options": ["Node used for mining rewards", "Node storing the entire ledger", "Node processing recent transactions only", "Node responsible for blocks only"], "answer": "Node storing the entire ledger" },
    { "question": "What is the function of a consensus algorithm in blockchain?", "options": ["Synchronizing private keys", "Ensuring agreement on blockchain state", "Encrypting transactions", "Reducing speed"], "answer": "Ensuring agreement on blockchain state" },
    { "question": "What role can be obtained in Rialo Discord for content creation and helping others?", "options": ["Club founder", "RIALO Club Member", "Moderator", "Developer"], "answer": "RIALO Club Member" },
    { "question": "What is the main benefit of event-driven architecture in Rialo?", "options": ["Faster mining", "Off-chain events can trigger smart contract actions", "Free transactions", "No developer tools"], "answer": "Off-chain events can trigger smart contract actions" },
    { "question": "What does sharding do for scalability?", "options": ["Increases block size", "Divides network into smaller parts", "Creates private keys", "Increases fees"], "answer": "Divides network into smaller parts" },
    { "question": "Rialo’s development team includes engineers from?", "options": ["Only local startups", "Meta, Netflix, Solana", "Government agencies", "None"], "answer": "Meta, Netflix, Solana" },
    { "question": "What is the reward for completing all required Rialo Club tasks?", "options": ["Club badge", "Role selection & possible airdrop", "Just a thank you", "No reward"], "answer": "Role selection & possible airdrop" },
    { "question": "Which mechanism is used by Rialo for execution flexibility?", "options": ["RISC-V Architecture", "ARM Architecture", "Java Virtual Machine", "ASIC Mining"], "answer": "RISC-V Architecture" },
    { "question": "What is the main objective of Rialo blockchain according to Subzero Labs?", "options": ["Entertainment only", "Foundational decentralized infrastructure", "Fiat transaction only", "Web2 gaming"], "answer": "Foundational decentralized infrastructure" }
];

// --- GAME STATE VARIABLES ---
let currentQuestionIndex = 0;
let correctAnswers = 0;
let rialoPoints = 0;
let answered = false;

// Timer variables
const MAX_TIME = 120; // 120 seconds (2 minutes)
let timeLeft = MAX_TIME;
let timerInterval;

// Scoring constants
const POINTS_PER_QUESTION = 100;
const BONUS_PER_SECOND = 5;

// --- DOM ELEMENTS ---
const startScreen = document.getElementById('start-screen');
const quizArea = document.getElementById('quiz-area');
const resultScreen = document.getElementById('result-screen');

const questionDisplay = document.getElementById('question-display');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-button');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');

const timerDisplay = document.getElementById('timer-display');
const pointsDisplay = document.getElementById('points-display');
const scoreSummary = document.getElementById('score-summary');
const timeSummary = document.getElementById('time-summary');
const finalTotal = document.getElementById('final-total');
const resultMessage = document.getElementById('result-message');


// --- TIMER LOGIC ---

function startTimer() {
    timeLeft = MAX_TIME;
    timerDisplay.textContent = `${timeLeft}s`;
    
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endChallenge(true); // End challenge due to timeout
        }
    }, 1000);
}

// --- QUIZ LOGIC ---

function loadQuestion() {
    answered = false;
    nextButton.disabled = true;
    optionsContainer.innerHTML = '';
    
    if (currentQuestionIndex >= quizQuestions.length) {
        endChallenge(false); // End challenge by completion
        return;
    }

    const q = quizQuestions[currentQuestionIndex];
    questionDisplay.textContent = `${currentQuestionIndex + 1} / ${quizQuestions.length}. ${q.question}`;

    q.options.forEach(option => {
        const button = document.createElement('div');
        button.className = 'answer-option';
        button.textContent = option;
        button.onclick = () => selectAnswer(button, option, q.answer);
        optionsContainer.appendChild(button);
    });
}

function selectAnswer(selectedElement, selectedAnswer, correctAnswer) {
    if (answered) return;
    answered = true;
    nextButton.disabled = false;

    const isCorrect = (selectedAnswer === correctAnswer);
    if (isCorrect) {
        correctAnswers++;
        rialoPoints += POINTS_PER_QUESTION; // Add base points
        pointsDisplay.textContent = rialoPoints;
        selectedElement.classList.add('correct');
    } else {
        selectedElement.classList.add('incorrect');
    }

    // Highlight the correct answer (if the user was wrong)
    Array.from(optionsContainer.children).forEach(option => {
        if (option.textContent === correctAnswer) {
            option.classList.add('correct');
        }
        option.onclick = null; // Disable further clicks
    });
}

function endChallenge(timedOut) {
    clearInterval(timerInterval);
    
    // Calculate bonus and final score
    const timeBonus = timedOut ? 0 : timeLeft * BONUS_PER_SECOND;
    const finalRialoPoints = rialoPoints + timeBonus;
    
    // Set result screen messages
    scoreSummary.textContent = `You answered ${correctAnswers} out of ${quizQuestions.length} questions correctly.`;
    timeSummary.textContent = `Time Bonus: ${timeBonus} points (Based on ${timeLeft} seconds remaining @ ${BONUS_PER_SECOND} points/sec)`;
    finalTotal.textContent = `Final Score: ${finalRialoPoints} Rialo Points`;

    // Determine result message based on performance
    const percentage = correctAnswers / quizQuestions.length;
    if (timedOut) {
        resultMessage.textContent = "⏱️ Time's up! You ran out of time before finishing the challenge.";
    } else if (percentage === 1) {
        resultMessage.textContent = "🏆 Master Contributor! Perfect score and maximum efficiency. You are a true RIALO asset!";
        resultMessage.style.color = 'var(--rialo-correct)';
    } else if (percentage >= 0.8) {
        resultMessage.textContent = "⭐ Excellent! You demonstrated strong knowledge. Ready for the RIALO Club!";
        resultMessage.style.color = 'var(--rialo-bonus)';
    } else if (percentage >= 0.5) {
        resultMessage.textContent = "👍 Solid Attempt. You meet the minimum knowledge standard. Keep learning!";
        resultMessage.style.color = 'var(--rialo-text)';
    } else {
        resultMessage.textContent = "📚 Requires Review. Please study the Rialo Club materials and try again.";
        resultMessage.style.color = 'var(--rialo-incorrect)';
    }

    // Display result screen
    quizArea.style.display = 'none';
    resultScreen.style.display = 'block';
}

// --- INITIALIZATION AND EVENT LISTENERS ---

function initializeQuiz() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    rialoPoints = 0;
    timeLeft = MAX_TIME;

    // Reset displays
    pointsDisplay.textContent = '0';
    timerDisplay.textContent = `${MAX_TIME}s`;
    
    startScreen.style.display = 'block';
    quizArea.style.display = 'none';
    resultScreen.style.display = 'none';
}

startButton.onclick = () => {
    startScreen.style.display = 'none';
    quizArea.style.display = 'block';
    startTimer();
    loadQuestion();
};

nextButton.onclick = () => {
    currentQuestionIndex++;
    loadQuestion();
};

restartButton.onclick = initializeQuiz;

// Start the quiz experience
initializeQuiz();
