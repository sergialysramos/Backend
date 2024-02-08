const express = require('express');
const router = express.Router();


// Ruta para registrar un cliente
router.post('/registrar', async (req, res) => {
    const { nombre, apellido, DNI } = req.body;
    const clienteExistente = await req.app.locals.db.collection('Clientes').findOne({ DNI: DNI });
    if (clienteExistente) {
        return res.status(400).json({ message: 'El cliente ya está registrado' });
    }
    const nuevoCliente = { nombre, apellido, DNI };
    await req.app.locals.db.collection('Clientes').insertOne(nuevoCliente);
    res.send({ message: 'Cliente registrado exitosamente', nuevoCliente });
});

// Ruta para editar un cliente
router.put('/editar/:dni', async (req, res) => {
    const { dni } = req.params;
    const { nombre, apellido } = req.body;
    try {
        await req.app.locals.db.collection('Clientes').findOneAndUpdate({ DNI: dni }, { $set: { nombre, apellido } });
        res.send({ message: 'Cliente actualizado exitosamente' });
    } catch (error) {
        res.send({ mensaje: "Error al editar el cliente", error })
    }
});

module.exports = router;

