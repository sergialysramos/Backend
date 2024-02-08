const express = require('express');
const router = express.Router();

// Ruta para hacer check-in
router.post('/reserva', async (req, res) => {
    const { DNI, numHabitacion } = req.body;

    let cliente = await req.app.locals.db.collection('Clientes').findOne({ DNI });
    if (!cliente) {
        return res.status(400).json({ message: 'El cliente no está registrado' });
    }

    let habitacion = await req.app.locals.db.collection('habitaciones').findOne({ numHabitacion, estado: 'libre' });
    if (!habitacion) {
        return res.status(400).json({ message: 'La habitación no está disponible' });
    }

    const reserva = {
        clienteId: DNI,
        habitacionId: numHabitacion,
        fechaCheckIn: new Date(),
        fechaCheckOut: null
    };

    await req.app.locals.db.collection('reservas').insertOne(reserva);
    await req.app.locals.db.collection('habitaciones').updateOne({ numHabitacion }, { $set: { estado: 'ocupado' } });

    res.send({ message: 'Check-in realizado exitosamente' });
});

router.post('/habitaciones', async (req, res) => {
    const { numHabitacion, estado } = req.body;
    try {
        let availableRoom = await req.app.locals.db.collection('habitaciones').findOne({ numHabitacion });
        if (availableRoom) {
            return res.status(400).send({ mensaje: 'La habitación ya existe' });
        }
        let newRoom = await req.app.locals.db.collection('habitaciones').insertOne({ numHabitacion, estado });

        res.status(201).send({ mensaje: 'Habitación añadida correctamente', newRoom });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al añadir la habitación', error });
    }
});

module.exports = router;

