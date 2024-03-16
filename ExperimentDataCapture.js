class DataCapture {
  // MR being mutation rate
  alphaMRLog = [];
  averageMRLog = [];
  alphaFitnessLog = [];
  averageFitnessLog = [];

  constructor() {
    this.id = crypto.randomUUID();
  }

  capture() {
    // Mutation Rates
    let alpha = findAlpha();
    this.alphaMRLog.push(alpha.DNA[alpha.DNA.length - 1]);
    this.averageMRLog.push(averageMutationRate());

    // Fitness levels
    this.alphaFitnessLog.push(fitness(alpha));
    this.averageFitnessLog.push(averageFitness());
  }
}

//  Define helper functions
function findAlpha() {
  let highestFitness = fitness(population[0]);
  let alpha = population[0];
  for (let i = 1; i < population.length; i++) {
    if (fitness(population[i]) > highestFitness) {
      highestFitness = fitness(population[i]);
      alpha = population[i];
    }
  }
  return 
}