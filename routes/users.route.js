const express = require('express')
const usersController = require('../controllers/users.controller')
const userValidationSchema = require('../middlewares/userValidationSchema')
const userRouter = express.Router()
const verifyToken = require('../middlewares/verifyToken')
const multer = require ('multer')
const appErorr = require('../utilities/appErorr')
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("FILE", file)
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1]
    const fileName = `user-${Date.now()}.${ext}`
    cb(null, fileName)
  }
})
const fileFilter = (req,file,cb)=>{
const imageType = file.mimetype.split('/')[0]
if(imageType === 'image'){
  return cb(null, true)
} else {
  return cb(appErorr.create('file must be an image',400), false)
}
}
const upload = multer({
    storage: diskStorage,
   fileFilter: fileFilter})
//----------------------------------------------------------------
userRouter.route('/')
  .get(verifyToken, usersController.getAllUsers)

userRouter.route('/register')
  .post(upload.single('avatar'),userValidationSchema, usersController.register)

userRouter.route('/login')
  .post(usersController.login)
//----------------------------------------------------------------
module.exports = userRouter; // this is not function