const express = require("express")
const hacerParejas = express()
const port = 3000

// registramos el contenido estatico: asi se sirven los ficheros al navegador
hacerParejas.use(express.static('static/html'))
hacerParejas.use(express.static('static/js'))
hacerParejas.use(express.static('static/css'))

// Escuchamos, si no escuchamos el servidor no responde
hacerParejas.listen(port, () => {
    console.log(`Parejas escuchando en http://localhost:${port}`)
})
