const mongoose = require('mongoose'); // const {schema} = require('mongoose'); const Course= new schema; y3ny schema dh class
const courseSchema = new mongoose.Schema({
  name: {
    type: String, // String is upercase
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});
// to compile schema to model
//----------------------------------------------------------------
const model = mongoose.model('Program', courseSchema)
module.exports = model;
//----------------------------------------------------------------