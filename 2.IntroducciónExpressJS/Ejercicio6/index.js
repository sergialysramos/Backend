const express = require('express');
const app = express()

let alumnos = ['Carlos','Maria','Ester','Nuria','Alexander','Antonio','Gloria','Marina','Mildry','Victor','Santigo','Sergialys']

app.get('/agregar/:nombre', function (request, response){
    alumnos.push(request.params.nombre)
    response.send(alumnos)
})



app.listen(process.env.PORT || 3000, (e)=>{
    e
    ? console.error("error")
    : console.log(" sin problemas en el puerto: " +(process.env.PORT || 3000))
});