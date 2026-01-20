const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }, email: {
    type: String,
    required: true,
    unique: true
  }, profileUrl: {
    type: String, 
    default: null
  }, password: {
    type: String,
    required: true
  }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema);