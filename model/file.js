const mongoose = require('mongoose')

const  bycrypt = require("bcrypt");

const Schema = mongoose.Schema

const FileSchema = Schema({
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    filename: String,
    location: String
  
})

module.exports = mongoose.model('Files', FileSchema)
