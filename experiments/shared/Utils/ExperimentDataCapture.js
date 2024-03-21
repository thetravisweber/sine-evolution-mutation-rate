class DataCapture {
  // MR being mutation rate
  alphaMRLog = [];
  averageMRLog = [];
  alphaFitnessLog = [];
  averageFitnessLog = [];
  frameCounter = 0;

  constructor() {
    this.id = crypto.randomUUID();
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
    const fs = require('fs');

    let jsonData = { key: 'value' };
    let jsonString = JSON.stringify(jsonData, null, 2);

    fs.writeFile('data.json', jsonString, (err) => {
        if (err) throw err;
        console.log('JSON data is saved.');
    });
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