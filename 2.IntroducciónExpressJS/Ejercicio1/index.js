const express = require('express');
const app = express()

app.listen(3000);

app.get('/', function (request, response) {
    response.send('<h1>Hola Mundo</h1><h2>desde express</h2>');

});