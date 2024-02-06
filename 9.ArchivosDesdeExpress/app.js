const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const fileUpload = require('express-fileupload')
app.use(fileUpload({ createParentPath: true }))
app.use(express.static('public'));
fs = require('fs')
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use('/fotos', express.static('archivos'))

app.post('/subir', async (req, res) => {
    let date = new Date()
    let now = date.toISOString()
    now = now.replaceAll('-', '').replaceAll(':', '').replaceAll('.', '')

    if (!req.files) {
        res.send({
            status: false,
            message: 'No file uploaded',
        })
    } else {
        let file = req.files.file
        let md5 = file.md5
        file.mv('./archivos/' + now + md5 + file.name)

        res.send({
            status: true,
            message: 'File is uploaded',
            data: {
                name: now + md5 + file.name,
                mimetype: file.mimetype,
                size: file.size,
            }
        })
    }
})

app.get('/imagenes', (req, res) => {
    fs.readdir('./archivos/', (err, files) => {
        if (err) {
            res.send('error al leer los archivos', err);
        } else {
            const imgPaths = files.map(
                file => `http://localhost:3000/fotos/${file}`
                );
                res.send({
                    url: imgPaths,
                    name: files
                });
        }
    });
});












app.listen(port, err => {
    err
        ? console.error(err)
        : console.log(`Servidor iniciado en http://localhost: ${port}`)
})