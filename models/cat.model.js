const mongoose = require('mongoose'); 

const catSchema = new mongoose.Schema({
  name: {
    type: String
  },
  price: {
    type: Number,
    required: true
  }
});
const catModel = mongoose.model('Cat', catSchema)
module.exports = catModel;