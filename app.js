const $game = document.querySelector('.game');
const width = $game.offsetWidth;
const height = $game.offsetHeight;
const playerWidth = 20;
const playerHeight = 30;
const maxSpeed = 500;
const laserSpeed = 5;
const coolDown = 0.1;

const gameState = {
    playerX: width / 2,
    playerY: height - playerHeight,
    leftPressed: false,
    rightPressed: false,
    spacePressed: false,
    lasers: [],
    lastTime: Date.now(),
    coolDown: coolDown
}

function checkBoundaries(){                                                             // Make sure the ship stays on the field
    if(gameState.playerX < playerWidth){
        gameState.playerX = playerWidth;
    }else if(gameState.playerX > width - playerWidth){
        gameState.playerX = width - playerWidth;
    }
}

function createLasers(x, y, delta){
    gameState.coolDown -= delta;
    if(gameState.coolDown < 0){
        const $newLaser = document.createElement('img');
        $newLaser.src = 'img/laser-red-1.png';
        $newLaser.className = 'laser';
        $game.appendChild($newLaser);
        setPosition($newLaser, x, y - playerHeight);
        gameState.lasers.push({x, y, $newLaser});
        gameState.coolDown = coolDown;
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
    const currentTime = Date.now();
    let delta = (currentTime - gameState.lastTime) / 1000;
    if(gameState.leftPressed === true){
        gameState.playerX -= maxSpeed * delta;
    }else if(gameState.rightPressed === true){
        gameState.playerX += maxSpeed * delta;
    }
    if(gameState.spacePressed === true){
        console.log(delta)
        createLasers(gameState.playerX, gameState.playerY, delta);
    }
    checkBoundaries();
    setPosition($player, gameState.playerX, gameState.playerY);
    updateLasers();
    gameState.lastTime = currentTime;
    requestAnimationFrame(update);
}

function updateLasers(){
    let lasersToDelete = 0;
    gameState.lasers.forEach(laser => {
        laser.y -= laserSpeed;
        if(laser.y < 0){
            $game.removeChild(laser.$newLaser);
            lasersToDelete++;
        }
        else{
            setPosition(laser.$newLaser, laser.x, laser.y);
        }
    })
    gameState.lasers.splice(0, lasersToDelete);
}

function init(){
    createPlayer();
}

init();
requestAnimationFrame(update);

window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);