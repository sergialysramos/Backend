const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));


const connection = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
})


connection.connect((e) => {
    e
        ? console.error("No se ha podido conectar a MySQL")
        : console.log("MySQL conectado")
})

app.get('/api/menus', function (req, res) {
    connection.query('SELECT * FROM menu', function (error, results) {
        if (error) {
            console.error('Error al obtener menús:', error);
            res.status(500).json({ mensaje: 'Error al obtener menús de la base de datos' });
        } else {
            res.json(results);
        }
    });
});

app.post('/api/nuevoMenu', function (req, res) {
    const { numero_menu, primer_plato, segundo_plato, postre, precio } = req.body;

    connection.query('INSERT INTO menu (numero_menu, primer_plato, segundo_plato, postre, precio) VALUES (?, ?, ?, ?, ?)',
        [numero_menu, primer_plato, segundo_plato, postre, precio],
        function (error, results) {
            if (error) {
                console.error('Error al añadir nuevo menú: ' + error);
                res.send({ mensaje: 'Error al añadir nuevo menú a la base de datos' });
            } else {
                console.log('Nuevo menú añadido correctamente');
                res.send({ mensaje: 'Nuevo menú añadido correctamente' });
            }
        });
});

app.put('/api/editarMenu', function (req, res) {
    const { numero_menu, primer_plato, segundo_plato, postre, precio } = req.body;

    connection.query('UPDATE menu SET primer_plato = ?, segundo_plato = ?, postre = ?, precio = ? WHERE numero_menu = ?',
        [primer_plato, segundo_plato, postre, precio, numero_menu],
        function (error, results) {
            if (error) {
                console.error('Error al modificar menú:', error);
                res.status(500).json({ mensaje: 'Error al modificar menú en la base de datos' });
            } else {
                console.log('Menú modificado correctamente');
                res.json({ mensaje: 'Menú modificado correctamente' });
            }
        });
});

app.delete('/api/borrarMenu', function (req, res) {
    const { numero_menu } = req.body;

    connection.query('DELETE FROM menu WHERE numero_menu = ?',
        [numero_menu],
        function (error, results) {
            if (error) {
                console.error('Error al borrar menú:', error);
                res.status(500).json({ mensaje: 'Error al borrar menú en la base de datos' });
            } else {
                console.log('Menú borrado correctamente');
                res.json({ mensaje: 'Menú borrado correctamente' });
            }
        });
});














app.listen(PORT, (e) => {
    e
        ? console.error("🔴 Express no conectado")
        : console.log("🟢 Express conectado y a la escucha en el puerto: " + PORT)
})