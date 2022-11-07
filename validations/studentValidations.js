const { check, body } = require('express-validator'); // Require express validator to add validations
const { existingDni, existingEmail, existingUser } = require('../helpers/db-validators');
// Require student model
module.exports = [
  // Export our validations
  check('fullName').notEmpty().withMessage('Ingrese su nombre y apellido'),
  check('email').isEmail().withMessage('Debe ingresar un email en el campo'),
  body('email') // This validation is to check if the email is already in our db
    .custom(existingEmail),
  check('phoneNumber')
    .notEmpty()
    .withMessage('Ingrese su número de celular')
    .isLength({ max: 50 })
    .withMessage('Máximo 50 números'),
  check('program').notEmpty().withMessage('Ingrese a qué programa ingresará'),
  check('dni')
    .notEmpty()
    .withMessage('Ingrese su número de DNI')
    .isInt()
    .withMessage('El dni solo tiene que tener números sin puntos')
    .isLength({ min: 7, max: 50 })
    .withMessage('El dni debe tener un minimo de 7 caracteres y un maximo de 50 caracteres'),
  body('dni') // This validation is to check if the dni is already in our db
    .custom(existingDni),
  check('school').notEmpty().withMessage('Ingrese su colegio'),
  check('age')
    .notEmpty()
    .withMessage('Ingrese su edad')
    .isInt({ min: 18, max: 99 })
    .withMessage('La edad debe de ser un numero con un minimo de 18 y un maximo de 99 años '),
  check('address').notEmpty().withMessage('Ingrese su dirección'),
  check('motive').notEmpty().withMessage('Ingrese el motivo por el cual se acerca a la institución'),
  check('pass').notEmpty().withMessage('Ingrese una contraseña'),
  body('confirmPass') // if the 'confirmpass' isn't the same entered in 'pass' will not leave the user register
    .custom((value, { req }) => {
      if (value !== req.body.pass) {
        return false;
      }
      return true;
    })
    .withMessage('Las constraseñas no coiciden'),
  check('user')
    .notEmpty()
    .withMessage('Ingrese un nombre de usuario')
    .isInt()
    .withMessage('El nombre de usuario solo tiene que tener números sin puntos'),
  body('user')
    .custom((value, { req }) => {
      if (value === req.body.dni) {
        return true;
      }
      return false;
    })
    .withMessage('El usuario y el dni deben coincidir'),
  body('user').custom(existingUser),
  body('avatar')
    .custom((value, { req }) => {
      /* eslint no-param-reassign: "off" */
      /* eslint prefer-destructuring: "off" */
      value = req.files[0];
      if (!value) {
        return false;
      }
      return true;
    })
    .withMessage('Tiene que ingresar una imagen'),
  body('avatar')
    .custom((value, { req }) => {
      value = req.files[0];
      return value.mimetype === 'image/png' || value.mimetype === 'image/jpg' || value.mimetype === 'image/jpeg';
    })
    .withMessage('El formato de la imagen debe ser: jpg, jpeg, png o gif'),
];
