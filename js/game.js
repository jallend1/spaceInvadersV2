const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const KEY_CODE_LEFT = 37;
const KEY_CODE_RIGHT = 39;
const KEY_CODE_SPACE = 32;
const PLAYER_WIDTH = 20;
const PLAYER_MAX_SPEED = 500;
const GAME_STATE = {
    lastTime: Date.now(),
    playerX: 0, 
    playerY:0,
    leftPressed: false,
    rightPressed: false,
    spacePressed: false
}

function setPosition($el, x, y){
    $el.style.transform = `translate(${x}px, ${y}px)`;
}

function clamp(v, min, max){
    if (v < min){
        return min;
    }else if (v > max){
        return max;
    }
    else{
        return v;
    }
}

function createPlayer($container){
    GAME_STATE.playerX = GAME_WIDTH / 2;
    GAME_STATE.playerY = GAME_HEIGHT - 50;
    const $player = document.createElement('img');
    $player.src = "img/player-blue-1.png";
    $player.className = 'player';
    $container.appendChild($player);
    setPosition($player, GAME_STATE.playerX, GAME_STATE.playerY);
}

function onKeyDown(e){
    if(e.keyCode === KEY_CODE_LEFT){
        GAME_STATE.leftPressed = true;
    }else if (e.keyCode === KEY_CODE_RIGHT){
        GAME_STATE.rightPressed = true;
    }else if(e.keyCode === KEY_CODE_SPACE){
        GAME_STATE.spacePressed = true;
    }
}

function onKeyUp(e){
    if(e.keyCode === KEY_CODE_LEFT){
        GAME_STATE.leftPressed = false;
    }else if(e.keyCode === KEY_CODE_RIGHT){
        GAME_STATE.rightPressed = false;
    }else if(e.keyCode === KEY_CODE_SPACE){
        GAME_STATE.spacePressed = false;
    }
}

function update(){
    const currentTime = Date.now();
    const dt = (currentTime - GAME_STATE.lastTime) / 1000;
    updatePlayer(dt);
    GAME_STATE.lastTime = currentTime;
    window.requestAnimationFrame(update);
}

function updatePlayer(dt){
    if(GAME_STATE.leftPressed === true){
        GAME_STATE.playerX -= dt * PLAYER_MAX_SPEED;
    }
    if(GAME_STATE.rightPressed === true){
        GAME_STATE.playerX += dt * PLAYER_MAX_SPEED;
    }
    const $player = document.querySelector('.player');
    GAME_STATE.playerX = clamp(GAME_STATE.playerX, PLAYER_WIDTH, GAME_WIDTH - PLAYER_WIDTH);
    setPosition($player, GAME_STATE.playerX, GAME_STATE.playerY);
}

function init(){
    const $container = document.querySelector('.game');
    createPlayer($container);
}

init();
window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);
window.requestAnimationFrame(update);