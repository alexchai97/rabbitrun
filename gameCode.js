let container = document.querySelector("#container");
let rabbit = document.querySelector("#rabbit");
let block = document.querySelector("#block");
let road = document.querySelector("#road");
let cloud = document.querySelector("#cloud");
let mountain = document.querySelector("#Mountain");
let score = document.querySelector("#score");
let gameOver = document.querySelector("#gameOver");
let gameStart = document.querySelector("#gameStart");

//declaring variable for score
let interval = null;
let playerScore = 0;
let ifGameStart = false;
let firstTry = true;

//function for score
let scoreCounter = () => {
    playerScore++;
    score.innerHTML = `Score <b>${playerScore}</b>`;
};

function rabbitJump() {
    if (rabbit.classList !== "rabbitActive") {
        rabbit.classList.add("rabbitActive");

        // remove class after 0.5 seconds
        setTimeout(() => {
            rabbit.classList.remove("rabbitActive");
        }, 500);
    }
}

function startGame() {
    gameOver.style.display = "none";
    block.classList.add("blockActive");
    road.firstElementChild.style.animation = "roadAnimate 1.5s linear infinite";
    cloud.firstElementChild.style.animation = "cloudAnimate 50s linear infinite";
    mountain.firstElementChild.style.animation = "MountainAnimate 30s linear infinite";
    gameStart.style.display = "none";

    //score
    let playerScore = 0;
    interval = setInterval(scoreCounter, 200);

    var x = document.getElementById("StartGameMusic");
    x.play();

    var x = document.getElementById("GameBGM");
    x.play();

    firstTry = false;
    ifGameStart = true;
}

window.addEventListener('keydown', event => {
    if (event.code === 'Space') {
        if (ifGameStart) {
            rabbitJump();
        } else {
            startGame();
        }
    }
})

window.addEventListener("click", function () {
    if (ifGameStart) {
        rabbitJump();
    } else {
        startGame();
    }
});

//'Game Over' if 'Character' hit The 'Block' 
let result = setInterval(() => {
    let rabbitBottom = parseInt(getComputedStyle(rabbit).getPropertyValue("bottom"));

    let blockLeft = parseInt(getComputedStyle(block).getPropertyValue("left"));

    if (rabbitBottom <= 90 && blockLeft >= -10 && blockLeft <= 50) {

        gameOver.style.display = "block";
        gameStart.style.display = "block";
        
        block.classList.remove("blockActive");

        road.firstElementChild.style.animation = "none";
        cloud.firstElementChild.style.animation = "none";
        mountain.firstElementChild.style.animation = "none";

        clearInterval(interval);

        playerScore = 0;
        
        var x = document.getElementById("GameOverMusic");
        x.play();

        ifGameStart = false;

        if (!firstTry) {
            document.getElementById("start-game-text").style.display = "none";
            document.getElementById("if-restart").innerHTML = "Restart";
        }
    }
}, 10);