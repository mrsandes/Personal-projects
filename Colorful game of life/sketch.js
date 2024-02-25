let matrix;
let coluns;
let rows;
let resolution = 8;
let startSimulation = false;
let ColorValue = 1;

function make2DArray(coluns, rows) {
    let array = new Array(coluns);

    for (let i = 0; i < array.length; i++) {
        array[i] = new Array(rows);
    }

    return array;
}

function setup() {
    frameRate(30);

    createCanvas(1920, 1080);
    colorMode(HSB, 360, 255, 255);

    coluns = width / resolution;
    rows = height / resolution;

    matrix = make2DArray(coluns, rows);

    for (let i = 0; i < coluns; i++) {
        for (let j = 0; j < rows; j++){
            matrix[i][j] = 0;
        }
    }
}

function draw() {
    background(0);

    if (startSimulation) {
        for (let i = 0; i < coluns; i++) {
            for (let j = 0; j < rows; j++){
                let x = i * resolution;
                let y = j * resolution;

                if (matrix[i][j] > 0) {
                    noStroke();
                    fill(matrix[i][j], 255, 255);
                    square(x, y, resolution);
                }
            }
        }

        let nextMatrix = make2DArray(coluns, rows);

        for (let i = 0; i < coluns; i++) {
            for (let j = 0; j < rows; j++){
                nextMatrix[i][j] = 0;
            }
        }

        for (let i = 0; i < coluns; i++) {
            for (let j = 0; j < rows; j++) {
                let state;

                if (matrix[i][j] == 0) {
                    state = 0;
                }

                else {
                    state = matrix[i][j];
                }   

                let vizinhos = countNeighbors(matrix, i, j);

                if (state == 0 && vizinhos == 3) {
                    nextMatrix[i][j] = ColorValue;
                } 
                
                else if (state > 0 && (vizinhos < 2 || vizinhos > 3)) {
                    nextMatrix[i][j] = 0;
                } 
                
                else {
                    nextMatrix[i][j] = state;
                }

                updateColorValue(1);
            }
        }

        matrix = nextMatrix;
    } 
    
    else {
        for (let i = 0; i < coluns; i++) {
            for (let j = 0; j < rows; j++){
                let x = i * resolution;
                let y = j * resolution;

                if (matrix[i][j] > 0) {
                    noStroke();
                    fill(matrix[i][j], 255, 255);
                    square(x, y, resolution);
                }
            }
        }
    }
}

function countNeighbors(matrix, x, y) {
    let sum = 0;

    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + coluns) % coluns;
            let row = (y + j + rows) % rows;

            if (matrix[col][row] > 0) {
                sum++;
            }
       }
    }

    if (matrix[x][y] > 0) {
        sum--;
    }
    
    return sum;
}

function updateCellState() {
    let i = floor(mouseX / resolution);
    let j = floor(mouseY / resolution);

    if (i >= 0 && i < coluns && j >= 0 && j < rows) {
        if (mouseButton === LEFT && matrix[i][j] == 0) {
            matrix[i][j] = ColorValue;
        } 

        else {
            matrix[i][j] = 0; 
        }
    }

    updateColorValue(60);
}

function mousePressed() {
    updateCellState();
}

function clearMatrix() {
    for (let i = 0; i < coluns; i++) {
        for (let j = 0; j < rows; j++) {
            matrix[i][j] = 0;
        }
    }
}

function randomize() {
    for (let i = 0; i < coluns; i++) {
        for (let j = 0; j < rows; j++) {
            if (Math.round(Math.random())) {
                matrix[i][j] = ColorValue;

                updateColorValue(1);
            }

            else {
                matrix[i][j] = 0;
            }
        }
    }
}

function updateColorValue(value) {
    ColorValue += value;

    if (ColorValue > 360) {
        ColorValue = 1;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    var button1 = document.getElementById("button1");
    var button2 = document.getElementById("button2");
    var button3 = document.getElementById("button3");

    button1.addEventListener("click", function () {
        startSimulation = !startSimulation;
    });

    button2.addEventListener("click", function () {
        clearMatrix();
        startSimulation = false;
    });

    button3.addEventListener("click", function () {
        randomize();
        startSimulation = true;
    });
});