let basket = document.getElementById("basket");
let gameArea = document.getElementById("game-area");
let scoreDisplay = document.getElementById("score");

let basketX = gameArea.offsetWidth / 2 - 40;
let score = 0;
let speed = 2;
let lives = 3; // Player can miss 3 times before Game Over

let catchSound = new Audio("catch.mp3");
let missSound = new Audio("miss.mp3");
let bombSound = new Audio("explosion.mp3");

// Move the basket with arrow keys
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && basketX > 0) {
        basketX -= 20;
    } else if (event.key === "ArrowRight" && basketX < gameArea.offsetWidth - 80) {
        basketX += 20;
    }
    basket.style.left = basketX + "px";
});

// Create falling objects (fruits & bombs)
function createObject() {
    let object = document.createElement("div");
    let isBomb = Math.random() < 0.2; // 20% chance of a bomb
    
    object.classList.add(isBomb ? "bomb" : "fruit");
    object.style.left = Math.random() * (gameArea.offsetWidth - 20) + "px";
    object.style.top = "0px";

    gameArea.appendChild(object);
    
    let fallInterval = setInterval(() => {
        object.style.top = object.offsetTop + speed + "px";

        if (object.offsetTop >= gameArea.offsetHeight - 40) {
            if (object.offsetLeft >= basketX && object.offsetLeft <= basketX + 80) {
                if (isBomb) {
                    bombSound.play();
                    score -= 1; // Deduct points for bombs
                } else {
                    catchSound.play();
                    score += 1;
                }
                scoreDisplay.textContent = "Score: " + score;
            } else {
                missSound.play();
                lives--;
                if (lives === 0) {
                    gameOver();
                }
            }
            object.remove();
            clearInterval(fallInterval);
        }
    }, 30);
}

// Spawn new objects every second
setInterval(createObject, 1000);

// Game Over Function
function gameOver() {
    alert("Game Over! Your Score: " + score);
    localStorage.setItem("highScore", Math.max(score, localStorage.getItem("highScore") || 0));
    location.reload();
}
let highScore = localStorage.getItem("highScore") || 0;
scoreDisplay.innerHTML = `Score: ${score} | High Score: ${highScore}`;

function updateScore() {
    if (score > highScore) {
        localStorage.setItem("highScore", score);
    }
    scoreDisplay.innerHTML = `Score: ${score} | High Score: ${localStorage.getItem("highScore")}`;
}
