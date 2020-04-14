const $game = document.querySelector('.game');
const width = $game.offsetWidth;
const height = $game.offsetHeight;
const playerWidth = 20;
const playerHeight = 30;
const maxSpeed = 5;

const gameState = {
    playerX: width / 2,
    playerY: height - playerHeight,
    leftPressed: false,
    rightPressed: false,
    spacePressed: false
}

function checkBoundaries(){                                                             // Make sure the ship stays on the field
    if(gameState.playerX < playerWidth){
        gameState.playerX = playerWidth;
    }else if(gameState.playerX > width - playerWidth){
        gameState.playerX = width - playerWidth;
    }
}

function createPlayer(){
    const playerShip = document.createElement('img');
    playerShip.src = 'img/player-blue-1.png';
    playerShip.classList.add('player');
    $game.appendChild(playerShip);
    setPosition(playerShip, gameState.playerX, gameState.playerY);
}

function setPosition($el, x, y){
    $el.style.transform = `translate(${x}px, ${y}px)`;
}

function handleKeyDown(e){
    if(e.keyCode === 37){
        gameState.leftPressed = true;
    }else if(e.keyCode === 39){
        gameState.rightPressed = true;
    }else if(e.keyCode === 32){
        gameState.spacePressed = true;
    }
}

function handleKeyUp(e){                                                                            
    if(e.keyCode === 37){
        gameState.leftPressed = false;
    }else if (e.keyCode === 39){
        gameState.rightPressed = false;
    }else if (e.keyCode === 32){
        gameState.spacePressed = false;
    }
}

function update(){
    const $player = document.querySelector('.player');
    if(gameState.leftPressed === true){
        gameState.playerX -= maxSpeed;
    }else if(gameState.rightPressed === true){
        gameState.playerX += maxSpeed;
    }
    checkBoundaries();
    setPosition($player, gameState.playerX, gameState.playerY);
    requestAnimationFrame(update);
}

function init(){
    createPlayer();
}

init();
requestAnimationFrame(update);

window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);