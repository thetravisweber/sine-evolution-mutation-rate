function nextGeneration() {
  let oldGeneration = [...population];
  population = [];
  oldGeneration.sort((a, b) => fitness(b) - fitness(a));
  // Each of top 50 percentile gets to make a baby
  for (let i = 0; i < oldGeneration.length / 2; i++) {
    // reset cache, forces fitness recalculation
    oldGeneration[i].fitness = undefined;
    // parent lives and makes a child
    population.push(oldGeneration[i]);
    population.push(oldGeneration[i].makeClone());
  }
}

function fitness(froig) {
  if (!froig.fitness) {
    let totalDistance = 0;
    for (let x = 0; x < width; x+=density) {
      totalDistance += abs(expected(x) - froig.action(x))**2;
    }
    let averageDistance = totalDistance / (width / density);
    // invert it, because higher fitness should have less average distance
    froig.fitness = -averageDistance;
  }
  return froig.fitness;
}