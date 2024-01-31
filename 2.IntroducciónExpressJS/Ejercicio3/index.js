const express = require('express');
const app = express()

const nombres = ["Maria","Jose","Alejandra","Juan","Carlos"]

app.listen(3000);

app.get('/persona', function (request, response){
    response.send(nombres.join())
})

app.get('/persona/:nombre', function (request, response){
        let {nombre} = request.params
        response.send(nombre)
        // let index = nombres.findIndex((e) => e === nombre)
        // response.send({
        //     result: nombres[index]
        // })
    })