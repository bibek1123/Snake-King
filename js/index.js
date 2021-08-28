// Game Constants & Varibles:-
let inputDirection = { x: 0, y: 0 }
let moveSound = new Audio('../music/move.mp3')
let foodSound = new Audio('../music/food.mp3')
let gameOverSound = new Audio('../music/gameover.mp3')
let musicSound = new Audio('../music/music.mp3')
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArray = [{ x: 15, y: 12 }]
let food = { x: 5, y: 2 };



// Game Functions:-
function main(ctime) {
    window.requestAnimationFrame(main);  // requestAnimationFrame is used for game loop
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine(); // gameEngin is itself a function and it run this game.
}

function isCollide(snake) {
    //  if snake bump into yourself:-
    for (let i = 1; i<snakeArray.length; i++) {
        if(snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            return true;
        }
    }
    // if snake bump into wall:-
    if(snake[0].x >= 20 || snake[0].x <= 0 || snake[0].y >= 20 || snake[0].y <=0){
        return true;
    }

}



function gameEngine() {
    // Part 1: Update the snake array and food:-
    if(isCollide(snakeArray)) {
        gameOverSound.play();
        musicSound.pause();
        inputDirection = { x: 0, y: 0 };
        alert("Game Over. Press OK to Play again!")
        snakeArray = [{ x: 15, y: 12 }];
        musicSound.play();
        score = 0;

    }

    // if snake eaten food, then increment the score and regenerate the food:-
    if (snakeArray[0].y === food.y && snakeArray[0].x === food.x) {
        foodSound.play();
        score +=1;
        scoreBox.innerHTML = "Score: 0" + score;
        if(score>hiScoreVal){
            hiScoreVal = score;
            localStorage.setItem('hiScore', JSON.stringify(hiScoreVal));
            hiScoreBox.innerHTML = "Hi-Score: 0" + hiScoreVal;
        }

        snakeArray.unshift({ x: snakeArray[0].x + inputDirection.x, y: snakeArray[0].y + inputDirection.y }); // unshift insert Elements at the start of the array.
        let a = 2;
        let b = 10;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    };



    // Moving the snake:-
    for (let i = snakeArray.length - 2; i >= 0; i--) {
        snakeArray[i + 1] = { ...snakeArray[i] }; // to put snake head on new place i.e. to creating new object for head and this is called destructuring.
    };

    snakeArray[0].x += inputDirection.x;
    snakeArray[0].y += inputDirection.y;




    // Part 2: Display the snake and food:-
    // i) Display the snake:-
    board.innerHTML = "";  // it emty the board
    snakeArray.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y; // to add css using javascripts
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    // ii) Display the food:-
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y; // to add css using javascripts
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);



}







// Main logic starts here:-
let hiScore = localStorage.getItem('hiScore');
if (hiScore === null){
    hiScoreVal = 0;
    localStorage.setItem("hiScore", JSON.stringify(hiScoreVal))
}
else{
    hiScoreVal = JSON.parse(hiScore)
    hiScoreBox.innerHTML = "Hi-Score: 0" + hiScore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDirection = { x: 0, y: 1 }
    moveSound.play();// Start the GAME and this i choose random direction
    switch (e.key) {
        case 'ArrowUp':
            console.log('ArrowUp')
            inputDirection.x = 0;
            inputDirection.y = -1;
            break;
        case 'ArrowDown':
            console.log('ArrowDown')
            inputDirection.x = 0;
            inputDirection.y = 1;
            break;
        case 'ArrowLeft':
            console.log('ArrowLeft')
            inputDirection.x = -1;
            inputDirection.y = 0;
            break;
        case 'ArrowRight':
            console.log('ArrowRight')
            inputDirection.x = 1;
            inputDirection.y = 0;
            break;

        default:
            break;
    }

});
