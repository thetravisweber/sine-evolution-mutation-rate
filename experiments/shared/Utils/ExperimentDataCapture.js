class DataCapture {
  // MR being mutation rate
  alphaMRLog = [];
  averageMRLog = [];
  alphaFitnessLog = [];
  averageFitnessLog = [];
  frameCounter = 0;

  constructor() {
    this.id = crypto.randomUUID();
    this.started = Date.now();
  }

  capture() {
    // Mutation Rates
    let alpha = findAlpha();
    this.alphaMRLog.push(alpha.mutationRate());
    this.averageMRLog.push(averageMutationRate());

    // Fitness levels
    this.alphaFitnessLog.push(fitness(alpha));
    this.averageFitnessLog.push(averageFitness());
  }

  writeToDisk() {
    const jsonString = JSON.stringify(this, null, 2);

    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    // naming file by timestamp ensures chronological order
    a.download = `exp-${this.started}.json`
    a.click();

    URL.revokeObjectURL(url);
  }

  toJSON() {
    return {
      "timestamp": new Date().toISOString(),
      ...this
    }
  }
}

/***
 * Helpers
 */
function findAlpha() {
  let highestFitness = fitness(population[0]);
  let alpha = population[0];
  for (let i = 1; i < population.length; i++) {
    if (fitness(population[i]) > highestFitness) {
      highestFitness = fitness(population[i]);
      alpha = population[i];
    }
  }
  return alpha;
}

function averageMutationRate() {
  let acc = 0;
  for (const entity of population) {
    acc += entity.mutationRate();
  }
  return acc / population.length;
}

function averageFitness() {
  let acc = 0;
  for (const entity of population) {
    acc += fitness(entity);
  }
  return acc / population.length;
}