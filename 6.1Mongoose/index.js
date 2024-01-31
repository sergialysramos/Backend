const mongoose = require('mongoose');
const express = require('express')
let app = express();
let { artista, disco } = require('./schemas')

mongoose
    .connect('mongodb://127.0.0.1:27017/tienda')
    .then(console.log('🟢 MongoDB está conectado'))
    .catch(err => {
        console.log('🔴 MongoDB no conectado: ' + err)
    })

    const beyonceArtista = new artista({
        _id: new mongoose.Types.ObjectId(),
        nombre: "Beyoncé Giselle Knowles-Carter",
        genero: "pop",
        fechaNacimiento:  "04-09-1981",
        nacionalidad: "estadounidense",
        nombreArtistico: "beyonce"
    });
    
    const lemonadeDisco = new disco({
        _id: new mongoose.Types.ObjectId(),
        titulo: "Lemonade",
        artista:  beyonceArtista._id,
        anyo: 2016,
        genero: "pop",
        stock: 25,
        formato: "vinilo"
    });

    // beyonceArtista.save().then(console.log("beyonce añadida")).catch(e=>console.error("beyonce no guardado: " + e))
    
    // lemonadeDisco.save().then(console.log("Disco guardado")).catch(e=>console.error("Disco no guardado: " + e))

    app.get('/discos', async (req, res) => {
        try {
            let results = await disco.find({stock: {$gt: 0}});
            res.send({ mensaje: "Se ha completado la petición", results })
        } catch (error) {
            res.send({ mensaje: "No se ha podido completar la petición", error })
        }
    })

    app.get('/discos/:parametro', async (req, res) => {
        try {
            const parametro = req.params.parametro;
    
            let results;
            if (mongoose.Types.ObjectId.isValid(parametro)) {
                results = await disco.findById(parametro);
            }
    
            if (!results) {
                results = await disco.findOne({ titulo: parametro });
            }
    
            if (!results) {
                res.status(404).send({ mensaje: 'Disco no encontrado' });
            } else {
                res.send({ mensaje: 'Se ha completado la petición', results });
            }
        } catch (error) {
            res.status(500).send({ mensaje: 'No se ha podido completar la petición', error });
        }
    });


    app.listen(process.env.PORT || 3000, (e) => {
        e
            ? console.error("no se ha podido conectar con el servidor")
            : console.log("servidor conectado y a la escucha en el puerto: " + (process.env.PORT || 3000))
    })