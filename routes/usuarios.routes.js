const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const {getUsuarios, crearUsuario, eliminarUsuario,actualizarUsuario} = require('../controladores/usuariocontroller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/',validarJWT,getUsuarios);
router.post('/', 
    [
        check ('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check ('password', 'El password es obligatorio').not().isEmpty(),
        check ('email', 'El email es obligatorio').isEmail(),
    ],
    crearUsuario);
router.put('/:id',
    [
        check ('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check ('email', 'El email es obligatorio').isEmail(),
        //check ('role', 'El rol es obligatorio').not().isEmpty(),
        validarCampos.apply,
    ],
    actualizarUsuario);
router.delete('/:id',validarJWT ,eliminarUsuario);

module.exports=router;