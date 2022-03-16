let antMovement;

let currentPoint = 61;
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

setupPlayground();


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

    console.log('el++>', el);
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
            nextPos = pos + 1;
            childOrient = 'right';
        } else if (childOrient == 'right') {
            nextPos = pos + 11;
            childOrient = 'down';
        } else if (childOrient == 'down') {
            nextPos = pos - 1;
            childOrient = 'left';
        } else {
            nextPos = pos - 11;
            childOrient = 'up';
        }
    } else {
        if (childOrient == 'up') {
            nextPos = pos - 1;
            childOrient = 'left';
        } else if (childOrient == 'right') {
            nextPos = pos - 11;
            childOrient = 'up';
        } else if (childOrient == 'down') {
            nextPos = pos + 1;
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
    const el = document.querySelector(`.no${currentPoint}`);

    el.innerHTML = '';

    const newEl = document.querySelector(`.no${pos}`);

    let ant = document.createElement('img');
    ant.setAttribute('src', './assets/Red_ant.svg');

    ant.classList.add(childOrient);

    newEl.appendChild(ant);

    if (newEl.classList.contains('dark')) {
        newEl.classList.remove('dark');
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
inputEl.addEventListener('keyup', function (e) {
    speed = Number(e.target.value) ;
});

let runningAnt;

startButton.onclick = function () {
    if(runningAnt){
        alert('stop running ant first');
        return;
    }
    if(!speed){
        alert('please enter speed');
        return;
    }
    runningAnt = runLangtonAnt(speed);
};

stopButton.onclick = function () {
    clearInterval(runningAnt);
    runningAnt = null;
};


// langtonAnt();
