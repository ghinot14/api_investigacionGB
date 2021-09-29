const express = require ('express'); // sintaxis para importar modulos en nodejs
require('dotenv').config();
const {dbConection} = require('./config/db')
const cors = require('cors');
//crear el servidor
const app = express();

//Configurando cors
app.use(cors());

//Crear la conexion DB
dbConection();

//Creando las rutas de mi app
app.get('/',(req,res)=>{
    res.status(400).json({
        ok: true,
        msg: 'Bienvenidos a la App Proyectos'
    })
})

//Codigo para desplegar el servidor
app.listen(process.env.PORT,()=>{
    console.log('Servidor Nodejs desplegado en el puerto: ' + 3000)
})

// passwor DB  adminproject
// h4Ioj9bc0dMnZT80
//mongocompas    mongodb+srv://adminproject:h4Ioj9bc0dMnZT80@cluster0.phxov.mongodb.net/test

