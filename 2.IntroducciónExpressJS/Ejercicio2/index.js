const express = require('express');
const app = express()

app.listen(3000);

app.get('/aleatorio/:num', function (request, response) {
    let num = request.params.num;
    const numAleatorio = Math.floor(Math.random() * num) + 1;
    response.send ('numero aleatorio ' + numAleatorio)

});