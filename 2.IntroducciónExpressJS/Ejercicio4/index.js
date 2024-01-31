const express = require('express');
const funcion = require('./module')

let app = express()

app.listen(3000);

app.get('/saludar/:nombre', function (request, response){
    response.send(funcion(request.params.nombre))
})