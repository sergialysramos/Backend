const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
// Importar rutas
const checkinRoutes = require('./routes/checkin');
const checkoutRoutes = require('./routes/checkout');
const clientesRoutes = require('./routes/clientes');

// Usar las rutas

const client = new MongoClient('mongodb://127.0.0.1:27017');

async function connectMongo() {
    try {
        await client.connect().then((client) => app.locals.db = client.db('ejercicios10'));
        await client.db("admin").command({ ping: 1 });
        console.log("MongoDB está conectado");
    } catch (error) {
        console.error("MongoDB no conectado:", error);
    }
}

connectMongo()

app.use('/checkin', checkinRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/clientes', clientesRoutes);

    // Iniciar el servidor
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
