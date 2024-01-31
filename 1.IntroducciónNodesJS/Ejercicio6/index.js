const factorial = require('./funciones/module.js')
let supervillains = require ("supervillains")

for (let i = 0; i < 4; i++) {
    const numeroAleatorio = Math.floor(Math.random() * 5) + 1;
    let numFact = factorial(numeroAleatorio);
    console.log(supervillains.all[numFact]);
}
