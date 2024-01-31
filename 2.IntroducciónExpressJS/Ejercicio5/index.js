const express = require('express')
let app = express()

let persona = {
    nombre: "",
    apellido: "",
    edad: 0
}


app.get('/nombre/:nombre', function(request, response){
    persona.nombre = request.params.nombre
    response.send(persona)
})

app.get('/apellido/:apellido', function(request, response){
    persona.apellido = request.params.apellido
    response.send(persona)
})

app.get('/edad/:edad', function(request, response){
    persona.edad = request.params.edad
    response.send(persona)
})


app.listen(3000);