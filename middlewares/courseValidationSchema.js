const {body} = require('express-validator')
const courseValidationSchema =
  [
    body('name').notEmpty().isLength({min: 2}).withMessage('Please enter a title carefully'),
    body('price').notEmpty().isLength({min:1}).withMessage('Please enter a price carefully')
  ]
//----------------------------------------------------------------
module.exports = courseValidationSchema