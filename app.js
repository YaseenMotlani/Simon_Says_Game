// Game variables
let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let highestScore = 0;
let difficulty = "Medium"; // Default difficulty
let flashSpeed = 300; // Default flash speed
let userResponseTime = 5000; // Default time for user input

let h2 = document.querySelector("h2");

// Retrieve the highest score from localStorage
if (localStorage.getItem("highestScore")) {
    highestScore = parseInt(localStorage.getItem("highestScore"));
}
document.querySelector(".highest-score").innerText = `Highest Score: ${highestScore}`;

// Start the game on keypress
document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game is started");
        started = true;
        levelUp();
    }
});

// Flash a button (game sequence)
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), flashSpeed);
}

// Flash a button (user action)
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => btn.classList.remove("userflash"), 250);
}

// Level up
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    const randIdx = Math.floor(Math.random() * btns.length);
    const randColor = btns[randIdx];
    const randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    // gameSeq(randBtn)

    console.log("Game Sequence:", gameSeq);

    // Flash sequence based on difficulty
    let delay = 0;
    gameSeq.forEach((color, idx) => {
        setTimeout(() => {
            const btn = document.querySelector(`.${color}`);
            gameFlash(btn);
        }, delay);
        delay += flashSpeed;
    });
}

// Check the user's answer
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Nice Try! <b>Your score was ${level}</b> <br> Press any key to start again.`;

        // Update the highest score if necessary
        if (level > highestScore) {
            highestScore = level;
            localStorage.setItem("highestScore", highestScore);
            document.querySelector(".highest-score").innerText = `Highest Score: ${highestScore}`;
        }

        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => (document.querySelector("body").style.backgroundColor = "white"), 150);
        reset();
    }
}

// Button press handler
function btnPress() {
    const btn = this;
    userFlash(btn);
    const userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

// Attach click listeners to all buttons
document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", btnPress);
});

// Reset the game
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

// Clear button functionality
document.querySelector(".clear-btn").addEventListener("click", () => {
    localStorage.removeItem("highestScore");
    highestScore = 0;
    document.querySelector(".highest-score").innerText = `Highest Score: ${highestScore}`;
    h2.innerText = "Records cleared! Press any key to start a new game.";
});

// Difficulty Selection
const difficultyBtns = document.querySelectorAll(".difficulty-btn");
difficultyBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
        difficulty = this.id.charAt(0).toUpperCase() + this.id.slice(1); // Set difficulty
        h2.innerText = `Difficulty set to ${difficulty}. Press any key to start.`;

        // Adjust flash speed and user response time based on difficulty
        if (difficulty === "Easy") {
            flashSpeed = 1000;
            userResponseTime = 7000;
        } else if (difficulty === "Medium") {
            flashSpeed = 700;
            userResponseTime = 5000;
        } else if (difficulty === "Hard") {
            flashSpeed = 500;
            userResponseTime = 3000;
        }

        console.log("Difficulty set to:", difficulty);
    });
});

// share-Btn
const shareBtn = document.querySelector('.share-btn');
shareBtn.addEventListener('click', () => {
    const shareText = `I scored ${highestScore} in the Memory Game! Can you beat me?`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank');
});


// Theme Selector
let darkBtn = document.getElementById("dark");
let neonBtn = document.getElementById("neon");
let lightBtn = document.getElementById("light");

// Function to change the theme
function changeTheme(theme) {
    // Remove all existing theme classes
    document.body.classList.remove("dark", "neon", "light");
    document.querySelector(".content").classList.remove("dark", "neon", "light");
    
    // Add the selected theme class
    document.body.classList.add(theme);
    document.querySelector(".content").classList.add(theme);
}

// Event listeners for theme buttons
darkBtn.addEventListener("click", () => {
    changeTheme("dark");
});

neonBtn.addEventListener("click", () => {
    changeTheme("neon");
});

lightBtn.addEventListener("click", () => {
    changeTheme("light");
});


