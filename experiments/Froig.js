class Froig extends ReplicatorWithMutationRate {
  draw() {
    for (let x = 0; x < width; x+=density) {
      let y = displayWarp(this.action(x));
      rect(x,height/2,x+density,y);
    }
  }

  // the only phenotype is the output based on x
  action(x) {
    // get density bucket
    let geneIndex = round(map(x, 0, width, 0, this.DNA.length-1));
    // last DNA reserved for mutation rate
    if (geneIndex > this.DNA.length - 1) return 0;
    let gene = this.DNA[geneIndex];
    return this.decode(gene);
  }

  decode(gene) {
    // The phenotype can be a direct translation of the genes, as each is just a float
    return gene;
  }
}

function genesis() {
  let numGenesNeeded = width / density + 1;
  let protoDNA = [];
  for (let i = 0; i < numGenesNeeded; i++) {
    protoDNA[i] = random(-1, 1);
  }
  return new Froig(protoDNA);
}