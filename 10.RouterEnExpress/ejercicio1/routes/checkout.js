const express = require('express');
const router = express.Router();

// Ruta para hacer check-out
router.post('/salida', async (req, res) => {
    const { DNI } = req.body;
    try {
        const cliente = await req.app.locals.db.collection('Clientes').findOne({ DNI });
        if (!cliente) {
            return res.status(400).json({ message: 'El cliente no está registrado' });
        }

        const reserva = await req.app.locals.db.collection('reservas').findOneAndUpdate({ clienteId: DNI, fechaCheckOut: null }, { $set: { fechaCheckOut: new Date() } });
        if (!reserva) {
            return res.status(400).json({ message: 'El cliente no tiene ninguna reserva activa' });
        }

        await req.app.locals.db.collection('habitaciones').updateOne({ numHabitacion: reserva.habitacionId }, { $set: { estado: 'libre' } });

        res.send({ message: 'Check-out realizado exitosamente' });
    } catch (error) {
        res.send({ message: 'Error al hacer el checkout', error });
    }
});

module.exports = router;
