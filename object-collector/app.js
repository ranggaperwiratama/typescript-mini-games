"use strict";
class Shape {
    color;
    type;
    element;
    constructor(color, type) {
        this.color = color;
        this.type = type;
        this.element = document.createElement('div');
        this.element.classList.add('shape', type);
        this.element.style.backgroundColor = color;
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
    render(parent) {
        parent.appendChild(this.element);
    }
}
class Circle extends Shape {
    constructor(color) {
        super(color, 'circle');
    }
    collect() {
        this.element.remove();
        shapeScores.circle += 6;
        updateScores();
    }
}
class Square extends Shape {
    constructor(color) {
        super(color, 'square');
    }
    collect() {
        this.element.remove();
        shapeScores.square += 2;
        updateScores();
    }
}
class Triangle extends Shape {
    constructor(color) {
        super(color, 'triangle');
    }
    collect() {
        this.element.remove();
        shapeScores.triangle += 5;
        updateScores();
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
    let shape;
    switch (types[index]) {
        case 'circle':
            shape = new Circle(colors[index]);
            break;
        case 'square':
            shape = new Square(colors[index]);
            break;
        case 'triangle':
            shape = new Triangle(colors[index]);
            break;
    }
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
        if (total >= 50) {
            clearInterval(interval);
            alert(`You collected 50 points worth of shapes!`);
        }
    }, 800);
});
