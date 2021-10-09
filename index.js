const express = require ('express'); // sintaxis para importar modulos en nodejs
require('dotenv').config();
const {dbConection} = require('./config/db')
const cors = require('cors');
//crear el servidor
const app = express();

//Configurando cors
app.use(cors());

//parciar objetos json
app.use(express.json());

//Crear la conexion DB
dbConection();

//Rutas de la API
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/login',require('./routes/auth.routes'));

//codigo para desplegar el servidor
app.listen(process.env.PORT,()=>{
    console.log('Servidor Node.js desplegado en el puerto: '+process.env.PORT);
})


// passwor DB  adminproject
// h4Ioj9bc0dMnZT80
//mongocompas    mongodb+srv://adminproject:h4Ioj9bc0dMnZT80@cluster0.phxov.mongodb.net/test

