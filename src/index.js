function setupPlayground() {
    for (let i = 0; i < 100; i++) {
        let childBox = document.createElement('div');
        childBox.className = 'child';
        const rootEl = document.getElementById('langton-box');
        rootEl.appendChild(childBox);

    }
}

setupPlayground();

const rootEl = document.getElementById('langton-box');
console.log(rootEl);