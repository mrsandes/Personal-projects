let matrix;
let coluns;
let rows;
let resolution = 8;
let colorValue = 1;

function make2DArray(coluns, rows) {
    let array = new Array(coluns);

    for (let i = 0; i < array.length; i++) {
        array[i] = new Array(rows);
    }

    return array;
}

function setup() {
    frameRate(60);

    createCanvas(1920, 1080);
    colorMode(HSB, 360, 255, 255);

    coluns = width / resolution;
    rows = height / resolution;

    matrix = make2DArray(coluns, rows);

    for (let i = 0; i < coluns; i++) {
        for (let j = 0; j < rows; j++) {
            matrix[i][j] = 0;
        }
    }
}

function draw() {
    background(0);

    if (mouseIsPressed) {
        updateState();
    }

    for (let i = 0; i < coluns; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;

            if (matrix[i][j] > 0) {
                noStroke();
                fill(matrix[i][j], 255, 255);
                rect(x, y, resolution, resolution); 
            }
        }
    }

    let nextMatrix = make2DArray(coluns, rows);

    for (let i = 0; i < coluns; i++) {
        for (let j = 0; j < rows; j++) {
            nextMatrix[i][j] = 0;
        }
    }

    for (let i = 0; i < coluns; i++) {
        for (let j = 0; j < rows; j++) {
            state = matrix[i][j];

            if (matrix[i][j] > 0 && j + 1 < rows && matrix[i][j + 1] == 0) {
                nextMatrix[i][j + 1] = state;
            } 
            
            else if (matrix[i][j] > 0 && j + 1 < rows && matrix[i][j + 1] > 0) {
                let leftRight = Math.round(Math.random());

                if (leftRight == 0 && i - 1 >= 0 && matrix[i - 1][j + 1] == 0) {
                    nextMatrix[i - 1][j + 1] = state;
                } 
                
                else if (leftRight == 1 && i + 1 < coluns && matrix[i + 1][j + 1] == 0) {
                    nextMatrix[i + 1][j + 1] = state;
                } 
                
                else {
                    nextMatrix[i][j] = state;
                }
            } 
            
            else if (matrix[i][j] > 0 && j + 1 == rows) {
                nextMatrix[i][j] = state;
            }
        }
    }

    matrix = nextMatrix;
    
}

function updateState() {
    let x = floor(mouseX / resolution);
    let y = floor(mouseY / resolution);

    if (x >= 2 && x < coluns - 2 && y >= 0 && y < rows - 2) {
        if (mouseButton === LEFT) {
            for (let i = -2; i < 3; i++) {
                for (let j = -2; j < 3; j++) {
                    if (Math.round(Math.random())) {
                        matrix[x + i][y + j] = colorValue;
                    }
                }
            }
        }
    }

    updateColorValue(1);
}

function clearMatrix() {
    for (let i = 0; i < coluns; i++) {
        for (let j = 0; j < rows; j++) {
            matrix[i][j] = 0;
        }
    }
}

function updateColorValue(value) {
    colorValue += value;

    if (colorValue > 360) {
        colorValue = 1;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    var button1 = document.getElementById("button1");

    button1.addEventListener("click", function () {
        clearMatrix();
    });
});