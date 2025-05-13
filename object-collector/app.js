"use strict";
class Shape {
    type;
    color;
    element;
    constructor(type, color) {
        this.type = type;
        this.color = color;
        this.element = document.createElement('div');
        this.element.classList.add('shape', type);
        this.setPosition();
        this.element.addEventListener('click', () => this.collect());
    }
    setPosition() {
        const gameArea = document.getElementById('game-area');
        const x = Math.random() * (gameArea.clientWidth - 50);
        const y = Math.random() * (gameArea.clientHeight - 50);
        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
    }
    collect() {
        this.element.remove();
        shapeScores[this.type]++;
        updateScores();
    }
    render(parent) {
        parent.appendChild(this.element);
    }
}
const shapeScores = {
    circle: 0,
    square: 0,
    triangle: 0
};
function updateScores() {
    document.getElementById('circle-score').textContent = shapeScores.circle.toString();
    document.getElementById('square-score').textContent = shapeScores.square.toString();
    document.getElementById('triangle-score').textContent = shapeScores.triangle.toString();
}
const gameArea = document.getElementById('game-area');
const startObjectCollector = document.getElementById('start-button');
function spawnShape() {
    const types = ['circle', 'square', 'triangle'];
    const colors = ['red', 'blue', 'green'];
    const index = Math.floor(Math.random() * types.length);
    const shape = new Shape(types[index], colors[index]);
    shape.render(gameArea);
}
startObjectCollector.addEventListener('click', () => {
    shapeScores.circle = 0;
    shapeScores.square = 0;
    shapeScores.triangle = 0;
    updateScores();
    gameArea.innerHTML = '';
    const interval = setInterval(() => {
        spawnShape();
        const total = shapeScores.circle + shapeScores.square + shapeScores.triangle;
        if (total >= 10) {
            clearInterval(interval);
            alert(`You collected 10 shapes!`);
        }
    }, 800);
});
