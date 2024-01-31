const mongoose = require('mongoose');


const artistaSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nombre: { type: String, required: true },
    genero: { type: String, required: true },
    fechaNacimiento: { type: Date },
    nacionalidad: { type: String, required: true },
    nombreArtistico: { type: String }
});

const discoSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    titulo: { type: String, required: true },
    artista: { type: mongoose.Schema.Types.ObjectId, ref: 'Artista', required: true },
    anyo: { type: Number, required: true },
    genero: { type: String },
    stock: { type: Number, required: true },
    formato: { type: String }
});

const artista = mongoose.model('artista', artistaSchema)
const disco = mongoose.model('disco', discoSchema)

module.exports = {artista, disco}