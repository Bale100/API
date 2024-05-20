const jwt = require('jsonwebtoken');
const appError = require('../utilities/appErorr')
const httpStatusText = require('../utilities/httpStatusText')
const verifyToken = (req,res,next)=>{
  const authHeader = req.headers['Authorization'] || req.headers['authorization'];
  if(!authHeader){
    const error = appError.create("token is required", 404, httpStatusText.FAIL)
    return next(error)  }
  const token = authHeader.split(' ')[1]
  try {
    const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.currentUser = currentUser;
      console.log('decodeToken',currentUser)
    next()
  }
  catch (err) {
    const error = appError.create("invalid token", 404, httpStatusText.FAIL)
  return next(error)
  }
  console.log('token', token)
}

module.exports = verifyToken;