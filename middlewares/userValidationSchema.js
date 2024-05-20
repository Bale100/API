const {body} = require('express-validator')

  const userValidationSchema =
  [
    body('firstName').notEmpty().isLength({min: 2}).withMessage('Please enter a first name carefully'),
    body('lastName').notEmpty().isLength({min: 2}).withMessage('Please enter a last name carefully'),
    body('email').notEmpty().isLength({min: 2}).withMessage('Please enter a email carefully'),
    body('password').notEmpty().isLength({min: 2}).withMessage('Please enter a password carefully')
  ]
//----------------------------------------------------------------
module.exports = userValidationSchema