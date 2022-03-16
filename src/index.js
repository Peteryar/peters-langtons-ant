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
     if(el.classList.contains('white')){
        el.classList.remove('white');
        el.classList.add('dark');
    }

    console.log('el++>', el);
}

function getAntPosInfo(pos) {
    const el = document.querySelector(`.no${pos}`);

    if (el.classList.contains('dark')) {
        antMovement = 'anticlockwise';
    } else  {
        antMovement = 'clockwise';
    }

    console.log('antOrient', antMovement);

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
            childOrient = 'right';
        } else {
            nextPos = pos + 10;
            childOrient = 'down';
        }
    }

    if(nextPos < 0){
        nextPos = nextPos + 100;
    }else if(nextPos > 100){
        nextPos = nextPos -100;
    }
  console.log('nextPos', nextPos);
}

function moveAnt(pos) {
    const el = document.querySelector(`.no${currentPoint}`);

    el.innerHTML = '';

    const newEl = document.querySelector(`.no${pos}`);

    let ant = document.createElement('img');
    ant.setAttribute('src', './assets/Red_ant.svg');

    ant.classList.add(childOrient);

    newEl.appendChild(ant);

    if(newEl.classList.contains('dark')){
        newEl.classList.remove('dark');
        newEl.classList.add('white');
    }else if(newEl.classList.contains('white')){
        newEl.classList.remove('white');
        newEl.classList.add('dark');
    }
    currentPoint = nextPos;

}


function langtonAnt() {
    start();
    return setInterval(() => {
        getAntPosInfo(currentPoint);
        moveAnt(nextPos);
    }, 1500);
}

langtonAnt();

// setTimeout(()=>clearInterval(langtonAnt()), 3000);