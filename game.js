// Declare variables to track player names, scores, rounds, and game state
let playerAName = '';
let playerBName = '';
let playerAScore = 0;
let playerBScore = 0;
let currentRound = 1;
const totalRounds = 5;
const correctAnswers = ["Answer 1", "Answer 2", "Answer 3", "Answer 4"];
let currentTurn = 'A';
let countdownTimer;
let timeLeft = 10;
let gameActive = true;
let buzzerTimeout;

// Object to hold game data
const gameData = {
    playerAName: '',
    playerBName: '',
    playerAScore: 0,
    playerBScore: 0,
    rounds: [],
    currentRound: 1
};

// Event listener for the start game button
document.getElementById('player-form').addEventListener('submit', function (event) {
    event.preventDefault();
    startGame(); // Start the game when the form is submitted
});

// Function to start the game
function startGame() {
    if (!gameActive) {
        resetGame();
    }
    // Store player names in variables
    playerAName = document.getElementById('player-a').value;
    playerBName = document.getElementById('player-b').value;
    
    // Store player names in gameData object
    gameData.playerAName = playerAName;
    gameData.playerBName = playerBName;
    
    alert(`Game is starting with Team A: ${playerAName} and Team B: ${playerBName}!`);
    resetScores();
    startRound();
}

// Function to reset scores and rounds
function resetScores() {
    playerAScore = 0;
    playerBScore = 0;
    currentRound = 1;
    gameData.playerAScore = 0;
    gameData.playerBScore = 0;
    gameData.rounds = [];
    updateScoreDisplay();
}

// Function to reset the game after all rounds
function resetGame() {
    gameActive = true;
    resetScores();
    clearResults();
    document.getElementById('user-answer').value = ''; // Clear the answer input
    alert("The game has been reset.");
}

// Function to start a new round
function startRound() {
    if (currentRound <= totalRounds) {
        console.log(`Starting Round ${currentRound}`);
        alert(`Round ${currentRound} starts now!`);
        startCountdown();
    } else {
        endGame();
    }
}

// Function to start the countdown timer
function startCountdown() {
    const timerDisplay = document.getElementById('time');
    timerDisplay.textContent = timeLeft;
    countdownTimer = setInterval(function () {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(countdownTimer);
            alert("Time's up!");
            handleEndOfRound();
        }
    }, 1000);
}

// Function to handle the end of the round
function handleEndOfRound() {
    timeLeft = 10;
    currentRound++;
    startRound();
}

// Event listener for the answer submission form
document.getElementById('answer-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const answer = document.getElementById('user-answer').value;
    if (validateAnswer(answer)) {
        alert("Correct answer!");
        updateScores(answer);
    } else {
        alert("Wrong answer, try again!");
    }
    document.getElementById('user-answer').value = '';
});

// Function to validate the answer
function validateAnswer(answer) {
    return correctAnswers.includes(answer);
}

// Function to update scores dynamically using innerHTML
function updateScores(answer) {
    if (currentTurn === 'A') {
        playerAScore += 10;
        gameData.playerAScore = playerAScore;
        gameData.rounds.push({ round: currentRound, answer: answer, team: 'A' });
        currentTurn = 'B';
    } else {
        playerBScore += 10;
        gameData.playerBScore = playerBScore;
        gameData.rounds.push({ round: currentRound, answer: answer, team: 'B' });
        currentTurn = 'A';
    }
    updateScoreDisplay();
    displayCorrectAnswers();
    console.log(`Round ${currentRound}: Team A - ${playerAScore}, Team B - ${playerBScore}`);
}

// Function to update the score table dynamically using innerHTML
function updateScoreDisplay() {
    const playerAScoreDisplay = document.querySelector('.score-table tbody tr td:first-child');
    const playerBScoreDisplay = document.querySelector('.score-table tbody tr td:last-child');
    playerAScoreDisplay.innerHTML = playerAScore;
    playerBScoreDisplay.innerHTML = playerBScore;
}

// Function to display correct answers dynamically using innerHTML
function displayCorrectAnswers() {
    const resultsSection = document.getElementById('results');
    resultsSection.innerHTML = `<h2>Results</h2>
                                <p>Points: <span id="points">${playerAScore + playerBScore}</span></p>
                                <p>Submitted Answer: <span id="submitted-answer">Correct Answers: ${correctAnswers.join(', ')}</span></p>`;
}

// Function to clear the results section
function clearResults() {
    document.getElementById('results').innerHTML = `<h2>Results</h2>
                                                    <p>Points: <span id="points">0</span></p>
                                                    <p>Submitted Answer: <span id="submitted-answer">None</span></p>`;
}

// Event listeners for Pass and Play buttons
document.getElementById('pass-button').addEventListener('click', function () {
    alert("You passed your turn!");
    currentTurn = currentTurn === 'A' ? 'B' : 'A';
});

document.getElementById('play-button').addEventListener('click', function () {
    alert("You chose to play!");
    startCountdown();
});

// Buzzer random function with setTimeout()
document.getElementById('buzzer').addEventListener('click', function () {
    clearTimeout(buzzerTimeout);
    buzzerTimeout = setTimeout(function () {
        const randomNumber = Math.floor(Math.random() * 2);
        if (randomNumber === 0) {
            alert("Team A pressed the buzzer first!");
            currentTurn = 'A';
        } else {
            alert("Team B pressed the buzzer first!");
            currentTurn = 'B';
        }
    }, Math.random() * 1000); // Random buzzer press timing within 1 second
});

// Function to handle the end of the game
function endGame() {
    gameActive = false;
    clearInterval(countdownTimer);
    if (playerAScore > playerBScore) {
        alert(`Game Over! Team A (${playerAName}) wins with ${playerAScore} points!`);
    } else if (playerBScore > playerAScore) {
        alert(`Game Over! Team B (${playerBName}) wins with ${playerBScore} points!`);
    } else {
        alert("Game Over! It's a tie!");
    }
    resetGame(); // Automatically reset the game for a new session
}

// Function to reset the game variables
function resetGame() {
    clearInterval(countdownTimer);
    clearTimeout(buzzerTimeout);
    playerAScore = 0;
    playerBScore = 0;
    currentRound = 1;
    timeLeft = 10;
    gameActive = true;
    currentTurn = 'A';
    gameData.playerAScore = 0;
    gameData.playerBScore = 0;
    gameData.rounds = [];
    updateScoreDisplay();
    clearResults();
    console.log("Game reset completed.");
}
