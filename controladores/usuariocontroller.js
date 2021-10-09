const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require("../models/usuario_model");

const getUsuarios = async(req, res)=>{

    const usuario = await Usuario.find({},'nombre email role google');

    res.json({
        ok:true,
        usuario
    });
}
const crearUsuario =async (req, res = response)=>{
    
    //Console.log(req.body)
    const {email, password, nombre} = req.body;

    try {

        const existeEmail = await Usuario.findOne({email});
        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg: 'El email ya ha sido registrado'
            });
        }
        //Crar un objeto de la clase model usuario
        const usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
    
        //Indicamos mongoose que registre el usuario en la BD
        await usuario.save();
        res.json({
            ok:true,
            usuario
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor, revisar logs'
        });
    }

}
const actualizarUsuario = async (req, res = response)=>{
    const uid = req.params.id;

    try{
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        //Codigo previo a la actualizacion
        const {password, google, email, ...campos} = req.body;
        if(usuarioDB.email !== email){
            const existeEmail = await Usuario.findOne({email});
            if (existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con este email'
                });
            }
        }
        campos.email = email;

        //actualizacion de datos
        const usuarioActualizado = await Usuario.findOneAndUpdate(uid,campos,{new:true});

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar usuario'
        });
    }
}

const eliminarUsuario = async(req, res=response) =>{
    const uid =req.params.id;
    try{
        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario eliminao de la DB'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No es posible eliminar usuario'
        });
    }
}
module.exports = {
    getUsuarios,
    crearUsuario,
    eliminarUsuario,
    actualizarUsuario,
}   