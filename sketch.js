const density = 5;
let population = [];
let experimentDC = new DataCapture();

function setup() {
  createCanvas(500, 400);
  rectMode(CORNERS);
  for (let i = 0; i < 100; i++) {
    population[i] = genesis();
  }
  frameRate(20);
}

function draw() {
  background(220);
  drawExpectedFunction();
  drawPopulation();
  nextGeneration();
  // experimentDC.capture();
}


// Yes, it only returns even numbers of population
function nextGeneration() {
  let oldGeneration = [...population];
  population = [];
  oldGeneration.sort((a, b) => fitness(b) - fitness(a));
  // Each of top 50 percentile gets to make a baby
  for (let i = 0; i < oldGeneration.length / 2; i++) {
    population.push(oldGeneration[i]);
    population.push(oldGeneration[i].makeClone());
  }
}

function fitness(froig) {
  if (!froig.fitness) {
    let totalDistance = 0;
    for (let x = 0; x <= width; x+=density) {
      totalDistance += abs(expected(x) - froig.action(x))**2;
    }
    let averageDistance = totalDistance / (width / density);
    // invert it, because higher fitness should have less average distance
    froig.fitness = -averageDistance;
  }
  return froig.fitness;
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
  // We want 1 full cycle every minute
  // let shift = (frameCount % 100) * TWO_PI;
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