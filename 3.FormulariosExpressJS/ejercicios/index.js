const express = require('express');
const app = express();
let animales = require('./animales')

app.use(express.static('public'))

app.get('/lista', function (req, res) {
    res.send(animal("Lista de Animales", animales))
})

// ejercicio2

app.get('/sumar-animal', function (req, res) {
    let { nombre, tipo, edad } = req.query
    edad = parseInt(edad)
    animales.push({ nombre, tipo, edad })
    res.send({ mensaje: `${nombre} añadido`, resultado: animales })
})

app.get('/adoptar', function (req, res) {
    animales = animales.filter((anima) => anima.nombre != req.query.nombre)
    res.send(animal(`adoptado`, animales))
})



function animal(mensaje, animales) {
    let salida = ""
    for (let index = 0; index < animales.length; index++) {
        salida +=
            ` <tr>
        <td>${animales[index].nombre}</td>
        <td>${animales[index].tipo}</td>
        <td>${animales[index].edad}</td>
        <td>   
            <form action="/adoptar">
            <input type="text" hidden name= "nombre" value="${animales[index].nombre}" id="nombre">
            <button type="submit">enviar</button>
            </form>
        </td>
</tr>`

    }
    return `
        <h3> ${mensaje}</h3>
    <table> 
<tr>  
    <th>nombre</th>
    <th>tipo</th>
    <th>edad</th>
</tr>
    ${salida}
    </table>`
}


app.listen(process.env.PORT || 3000, (e) => {
    e
        ? console.error("no se ha podido conectar con el servidor")
        : console.log("servidor conectado y a la escucha en el puerto: " + (process.env.PORT || 3000))
})