const express = require('express');
const app = express();
const {MongoClient} = require ('mongodb');
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: false}))
app.use(express.json());


const  client = new MongoClient('mongodb://127.0.0.1:27017');

async function connectMongo(){
    try {
        await client.connect().then((client) => app.locals.db = client.db('ejercicios6'));
        await client.db("admin").command({ ping:1 });
        console.log("mongoDB esta conectado");
    } catch (error) {
        console.log("mongoDB no conectado", error);
    }
}

connectMongo();

app.get('/api/mesas', async (req, res)=>{
    try {
        let results = await app.locals.db.collection('mesas').find().toArray()
        res.status(200).send({mensaje: "petición correcta", results})

    } catch (error) {
        res.status(500).send({mensaje: "petición incorrecta", error})
    }
})

app.post('/api/anyadir', async (req, res)=>{

    try {
        let {tamanyo, color, material, patas} = req.body
        let results = await app.locals.db.collection('mesas').insertOne({tamanyo, material, color, patas})
        res.send({mensaje: "Documento insertado", results})
    } catch (error) {
        res.send({mensaje: "Inserción no realizada", error})
    }
})

app.put('/api/modificar/:color', async (req, res)=>{
    try {
        const results = await app.locals.db.collection('mesas').updateMany({color: req.params.color}, {$set: {color: "granate"}})
        res.send({mensaje: "Documentos actualizado", results})
    } catch (error) {
        res.send({mensaje: "Modifiación fallida", error})
    }
})

app.delete('/api/borrar/:patas', async (req, res)=>{
    try {
        const results = await app.locals.db.collection('mesas').deleteMany({patas: parseInt(req.params.patas)})
        res.send({mensaje: "Documentos borrados", results})
    } catch (error) {
        res.send({mensaje: "Borrado fallido", error})
    }
})


app.listen(PORT, (e) => {
    e
    ? console.error("express no conectado")
    : console.log("express conectado y a la escucha en el puerto: " + PORT)
})