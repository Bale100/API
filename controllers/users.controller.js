const User = require("../models/user.model") 
const {validationResult} = require('express-validator')
const httpStatusText = require("../utilities/httpStatusText")
const asyncWrapper = require ("../middlewares/asyncWrapper")
const appError = require("../utilities/appErorr")
const bcrypt = require("bcryptjs")
const generateJwt = require('../utilities/generateJwt')


const getAllUsers = asyncWrapper(
  async (req, res,next) => {
    //console.log(req.headers)
    const query = req.query;
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;
    const users = await User.find({}, {"__v":false, "password":false}).limit(limit).skip(skip);
    res.status(200).json({status: httpStatusText.SUCCESS, data: {users}})
  })

const register = asyncWrapper(
  async(req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const error = appError.create(errors.array(), 404, httpStatusText.FAIL)
      return next(error);
    }
 
    const {firstName, lastName, email, password, role} = req.body;
console.log('req.file: ', req.file)    
const oldUser = await User.findOne({ email: email});
    if (oldUser) {
      const error = appError.create("User already exists", 404, httpStatusText.FAIL)
      return next(error);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      avatar: req.file.filename
    }) // newUser is object 
    const token = await generateJwt({email: newUser.email, id: newUser._id, role: newUser.role})
    //console.log("token",token)
    newUser.token = token;
    await newUser.save()
    return res.status(201).json({status:httpStatusText.SUCCESS, data: {newUser, token}});
})
const login = asyncWrapper(async (req,res, next)=>{
  const {email, password} = req.body;
  const user = await User.findOne({email: email})
  if (!user) {
    const error = appError.create("User not found", 404, httpStatusText.FAIL)
    return next(error);
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    const error = appError.create("Incorrect password", 404, httpStatusText.FAIL)
    return next(error);
  }
  if (user.email && isMatch) {
    const token = await generateJwt({
      email: user.email,
      id: user._id, role: user.role, 
     // avatar: req.file.filename
    })
    return res.status(200).json({status: httpStatusText.SUCCESS, data: {user, token}})
  }
})

// const edit = ()=>{}
// const delete = ()=>{}


module.exports = {
  getAllUsers,
  register,
  login,
}
