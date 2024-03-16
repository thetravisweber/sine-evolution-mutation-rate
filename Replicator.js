class Replicator {
  constructor(DNA) {
    this.DNA = DNA;
    // Provide a place to cache fitness, since calculation is expensive
    this.fitness = undefined;
  }

  // interface should have makeClone and reproduceSexually, but not needed for this experiment
}

class ReplicatorWithMutationRate extends Replicator {
  makeClone() {
    let protoDNA = [];
    for (let i = 0; i < this.DNA.length; i++) {
      protoDNA[i] = this.mutate(this.DNA[i]);
    }
    // Use this.constructor to reference the constructor of the current instance
    return new this.constructor(protoDNA);
  }

  mutate(gene) {
    let mutationRate = this.DNA[this.DNA.length - 1];
    return gene + random(-mutationRate, mutationRate);
  }
}