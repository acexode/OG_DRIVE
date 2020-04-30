const mongoose = require('mongoose')

const  bycrypt = require("bcrypt");

const Schema = mongoose.Schema



const FolderSchema = Schema({
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    name: {type: String, unique: true},
    files: [],
    folders: [],
    sharedWith: []
  
})




module.exports = mongoose.model('Folders', FolderSchema)
