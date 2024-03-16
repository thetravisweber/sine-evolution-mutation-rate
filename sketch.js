const density = 5;
let population = [];

function setup() {
  createCanvas(500, 400);
  rectMode(CORNERS);
  for (let i = 0; i < 5; i++) {
    population[i] = genesis();
  }
  frameRate(1);
}

function draw() {
  background(220);
  drawExpectedFunction();
  drawPopulation();
  nextGeneration();
}

function nextGeneration() {
  for (let i = 0; i < population.length; i++) {
    population[i] = population[i].makeClone();
  }
}

function drawExpectedFunction() {
  noFill();
  strokeWeight(2);
  stroke(0);
  beginShape();
  for (let x = 0; x <= width; x+=density) {
    let y = displayWarp(expected(x));
    vertex(x, y);
  }
  endShape();
}

function expected(x) {
  let larped = map(x, 0, width, 0, TWO_PI);
  return sin(larped);
}

function displayWarp(y) {
  return (y * height/2) + height/2;
}

function drawPopulation() {
  noStroke();
  fill(255, 100);
  for (const entity of population) {
    entity.draw();
  }
}


// function fitness(froig) {
//   for (let x = 0; x <= width; x+=density) {

//   }
// }