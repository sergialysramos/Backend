const express = require('express');
const app = express();

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const personas = [
    { nombre: 'Juan', apellido: 'Pérez', edad: 25 },
    { nombre: 'María', apellido: 'Gómez', edad: 30 },

];

app.get('/personas', (req, res) => {
    res.send(personas);
});

app.post('/sumar', (req, res) => {
    const { nombre, apellido, edad } = req.body
    personas.push({ nombre, apellido, edad })
    res.send(personas)
});

app.put('/modificar', function (request, response) {
    let index = personas.findIndex((person) => person.nombre === request.body.nombre)
    if (index < 0) response.send('El nombre ' + request.body.nombre + ' no existe en la BBDD')

    personas[index].apellido = request.body.apellido;
    personas[index].edad = request.body.edad;

    response.send(`${request.body.nombre} ha sido modificado correctamente`)
});

app.delete('/borrar', function (request, response) {
    let index = personas.findIndex((person) => person.nombre === request.body.nombre)

    if (index < 0){ response.send('El nombre ' + request.body.nombre + ' no existe en la BBDD')
    }else {
        personas.splice(index, 1)
        response.send(`${request.body.nombre} ha sido borrado correctamente`)
    }

    
});



app.listen(process.env.PORT || 3000, (e) => {
    e
        ? console.error("no se ha podido conectar con el servidor")
        : console.log("servidor conectado y a la escucha en el puerto: " + (process.env.PORT || 3000))
})
