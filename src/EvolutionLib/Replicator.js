class Replicator {
  // Provide a place to cache fitness, since calculation is expensive
  fitness = undefined;

  constructor(DNA) {
    this.DNA = DNA;
  }

  // interface should have makeClone and reproduceSexually, but not needed for this experiment
}

class ReplicatorWithMutationRate extends Replicator {
  makeClone() {
    let protoDNA = [];
    for (let i = 0; i < this.DNA.length; i++) {
      if (random() < this.mutationRate()) {
        protoDNA[i] = this.mutate(this.DNA[i]);
      } else {
        protoDNA[i] = this.DNA[i];
      } 
    }
    // Use this.constructor to reference the constructor of the current instance
    return new this.constructor(protoDNA);
  }

  mutate(gene) {
    let diff = random(-this.mutationRate(), this.mutationRate())
    return gene + diff;
  }

  mutate2(gene) {
    let diff = random(-.01, .01);
    return gene + diff;
  }

  mutationRate() {
    return this.DNA[this.DNA.length - 1];
  }
}