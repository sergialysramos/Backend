const objeto = require('./module.js');

const arrayA = objeto.paises.a;
const arrayB = objeto.paises.b;
const arrayC = objeto.paises.c;

const sumArray = arrayA.concat(arrayB, arrayC);

const favArray = objeto.favoritos.map(index => sumArray[index])

console.log(favArray);