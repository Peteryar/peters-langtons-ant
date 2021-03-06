let antMovement;

let currentPoint = 62;
let nextPos;

let childOrient = 'right';

const inputEl = document.querySelector('input');
const startButton = document.querySelector('.start');
const stopButton = document.querySelector('.stop');
let speed;

function setupPlayground() {
    for (let i = 1; i <= 121; i++) {
        let childBox = document.createElement('div');
        childBox.className = `child no${i} white`;
        const rootEl = document.getElementById('langton-box');
        rootEl.appendChild(childBox);
    }
}

window.onload = () => {
    let runningAnt;

    setupPlayground();

    inputEl.addEventListener('keyup', function (e) {
        speed = Math.floor(1000 / Number(e.target.value) * 1000); //smaller number gets bigger while bigger number gets small to increament speed
    });

    startButton.onclick = function () {
        if (runningAnt) {
            alert('stop running ant first');
            return;
        }
        if (!speed) {
            alert('please enter speed');
            return;
        }
        if(speed < 1000){
            alert('must be greater than 1000');
            return;
        }
        runningAnt = runLangtonAnt(speed);
    };

    stopButton.onclick = function () {
        clearInterval(runningAnt);
        runningAnt = null;
    };

};


function initAntPosition() {

    const el = document.querySelector(`.no${currentPoint}`);

    let ant = document.createElement('img');
    ant.setAttribute('src', './assets/Red_ant.svg');
    ant.classList.add(childOrient);

    el.appendChild(ant);
    if (el.classList.contains('white')) {
        el.classList.remove('white');
        el.classList.add('dark');
    }
}

function getAntPosInfo(pos) {
    
    const el = document.querySelector(`.no${pos}`);

    if (el.classList.contains('dark')) {
        antMovement = 'anticlockwise';
    } else {
        antMovement = 'clockwise';
    }

    childOrient = el.firstChild.classList[0];

    if (antMovement == 'clockwise') {
        if (childOrient == 'up') {
            if (pos % 11 == 0) {
                nextPos = pos - 10;
            } else {
                nextPos = pos + 1;
            }
            childOrient = 'right';
        } else if (childOrient == 'right') {
            nextPos = pos + 11;
            childOrient = 'down';
        } else if (childOrient == 'down') {
            nextPos = pos - 1;
            if (nextPos % 11 == 0) {
                nextPos = nextPos + 11;
            }
            childOrient = 'left';
        } else {
            nextPos = pos - 11;
            childOrient = 'up';
        }
    } else {
        if (childOrient == 'up') {
            nextPos = pos - 1;
            if (nextPos % 11 == 0) {
                nextPos = nextPos + 11;
            }
            childOrient = 'left';
        } else if (childOrient == 'right') {
            nextPos = pos - 11;
            childOrient = 'up';
        } else if (childOrient == 'down') {
            if (pos % 11 == 0) {
                nextPos = pos - 10;
            } else {
                nextPos = pos + 1;
            }
            childOrient = 'right';
        } else {
            nextPos = pos + 11;
            childOrient = 'down';
        }
    }

    if (nextPos <= 0) {
        nextPos = nextPos + 121;
    } else if (nextPos > 121) {
        nextPos = nextPos - 121;
    }
}

function moveAnt(pos) {
    //get the current element ant is currently at
    const el = document.querySelector(`.no${currentPoint}`);

    el.innerHTML = '';  //remove ant from the element

    //next element ant will be moving to
    const newEl = document.querySelector(`.no${pos}`);

    //creates ant el
    let ant = document.createElement('img');
    ant.setAttribute('src', './assets/Red_ant.svg');
    ant.classList.add(childOrient);

    newEl.appendChild(ant);// add ant to new element
    console.log('img', newEl.querySelector('img'));


    if (newEl.classList.contains('dark')) { // change background color to 
        newEl.classList.remove('dark');     // oposite color 
        newEl.classList.add('white');
    } else if (newEl.classList.contains('white')) {
        newEl.classList.remove('white');
        newEl.classList.add('dark');
    }
    currentPoint = nextPos;

}


function runLangtonAnt(speed) {
    initAntPosition();
    return setInterval(() => {
        getAntPosInfo(currentPoint);
        moveAnt(nextPos);
    }, speed);
}


module.exports = { setupPlayground, getAntPosInfo };