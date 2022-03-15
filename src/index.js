function setupPlayground() {
    for (let i = 1; i <= 100; i++) {
        let childBox = document.createElement('div');
        childBox.className = `child no${i} white`;
        // childBox.setAttribute('u')
        const rootEl = document.getElementById('langton-box');
        rootEl.appendChild(childBox);
    }
}

setupPlayground();



let antMovement;

let currentPoint = 45;
let nextPos;

let childOrient = 'right';


function start() {

    const el = document.querySelector(`.no${currentPoint}`);

    let ant = document.createElement('img');
    ant.setAttribute('src', './assets/Red_ant.svg');
    ant.classList.add(childOrient);

    el.appendChild(ant);
    el.classList.remove('white');
    el.classList.add('dark');

    // console.log(el);
}

function getAntPosInfo(pos) {
    const el = document.querySelector(`.no${pos}`);

    if (el.classList[el.classList.length - 1] == 'dark') {
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
            nextPos = pos + 10;
            childOrient = 'down';
        } else if (childOrient == 'down') {
            nextPos = pos - 1;
            childOrient = 'left';
        } else {
            nextPos = pos - 10;
            childOrient = 'up';
        }
    } else {
        if (childOrient == 'up') {
            nextPos = pos - 1;
            childOrient = 'left';
        } else if (childOrient == 'right') {
            nextPos = pos - 10;
            childOrient = 'up';
        } else if (childOrient == 'down') {
            nextPos = pos + 1;
            childOrient = 'left';
        } else {
            nextPos = pos + 10;
            childOrient = 'down';
        }
    }
    
}

function moveAnt(pos) {
    const el = document.querySelector(`.no${currentPoint}`);
    // let newImg = document.createElement('');

    el.innerHTML = '';

    const newEl = document.querySelector(`.no${pos}`);


    let ant = document.createElement('img');
    ant.setAttribute('src', './assets/Red_ant.svg');

    ant.classList.add(childOrient);

    newEl.appendChild(ant);

    // childOrient = el.firstChild.classList[0];

    if (newEl.classList[newEl.classList.length - 1] == 'dark') {
        newEl.classList.remove('black');
        newEl.classList.add('white');
    } else {
        newEl.classList.remove('white');
        newEl.classList.add('dark');
    }

    currentPoint = nextPos;

}
// start();
// getAntPosInfo(currentPoint);
// moveAnt(nextPos);

function langtonAnt() {
    start();
    return setInterval(() => {
        getAntPosInfo(currentPoint);
        moveAnt(nextPos);
    }, 500);
}

langtonAnt();

// setTimeout(()=>clearInterval(langtonAnt()), 3000);