const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const app = express()

//Capturar body

app.use(bodyparser.urlencoded({
    extendeWd: false
}))
app.use(bodyparser.json())

//Configuracion CORS
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

//Conexion a BD
const url = `mongodb+srv://NotoriusOkay:NotoriusOkay@cluster0.cxh28xh.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Conectado a la Base de datos'))
.catch((error) => console.log('Error de conexion: ' + error))



//Importar las rutas
const authRoutes = require('./routes/auth')


//ruta para el middleware
app.use('/api/user', authRoutes)

app.get('/', (req, res) =>{
    res.json({
        estado: true,
        mensaje: 'Funciona correcto'
    })
})



//Arrancar el servidor
const PORT = process.env.PORT || 3005
app.listen(PORT, () => {
    console.log(`Servidor en Ejecucion: ${PORT}`)
})

