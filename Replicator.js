class ReplicatorWithMutationRate {
  constructor(DNA) {
    // last DNA spot retained for being the mutation rate
    this.DNA = DNA;
  }

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