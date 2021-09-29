const mongoose = require('mongoose');
const dbConection = async() => {
try {
    //Debemos utilizar la cadena de conexion que tenemos en mongocompass
    //mongodb+srv://adminproject:h4Ioj9bc0dMnZT80@cluster0.phxov.mongodb.net/
    
    await mongoose.connect(process.env.DB_CNN);
console.log('Conexion exitosa a la BD')
} catch (error) {
console.log(error);
throw new Error('Error al conectar a la BD');
}
}
module.exports ={
dbConection
}