const express = require('express');
const app = express()
const arrayCeros = require('./module1.js')
const numRandom = require('./module2.js')


app.get('/numero', function (request, response) {
    let random = numRandom()
    arrayCeros[random] ++
    response.send(arrayCeros)

});

// ejercicio8

app.get('/borrar/:indice',function(request, response){
    if(request.params.indice < arrayCeros.length){
        arrayCeros[request.params.numero] = 0
    }else{
        response.send("el indice no esta en el array")
    }
})


app.listen(3000);