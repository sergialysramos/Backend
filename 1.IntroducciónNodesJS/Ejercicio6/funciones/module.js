const factorial = (num) => {
    let numFactor = 1;
    for (let i=1 ; i <= num; i++) {
      numFactor *= i; 
    }
    return numFactor;
}

module.exports = factorial;