const density = 5;
let population = [];
let experimentDC = new DataCapture();
// set cycle time to 0 to get no change
let cycleTime = 0;

function setup() {
  let canvas = createCanvas(500, 400);
  // puts canvas before button in DOM
  canvas.parent("sketch-canvas");
  rectMode(CORNERS);
  for (let i = 0; i < 200; i++) {
    population[i] = genesis();
  }
}

function draw() {
  background(220);
  drawExpectedFunction();
  drawPopulation();
  nextGeneration();
  experimentDC.capture();
  stroke(0);
  let amr = experimentDC.averageMRLog[experimentDC.averageMRLog.length - 1];
  text(amr, 50, 50);
  let af = experimentDC.averageFitnessLog[experimentDC.averageFitnessLog.length - 1];
  text(af, 50, 90);
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
  let shift = 0;
  if (cycleTime) {
    shift = map(frameCount, 0, cycleTime, 0, TWO_PI);
  }
  return sin(larped + shift);
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