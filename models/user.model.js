const mongoose = require('mongoose');
const validator = require('validator');
const userRoles = require('../utilities/userRoles');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"]
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String, // ["user", "administ", "manager"]
    enum: [userRoles.USER, userRoles.ADMIN, userRoles.MANAGER],
    required: true,
    default: "user"
  },
  avatar: {
    type: String,
    default: "upload/profile.png" // bn3ml save l2sm el image f el database msh el image nfsha
  }
});
module.exports = mongoose.model("User", userSchema)