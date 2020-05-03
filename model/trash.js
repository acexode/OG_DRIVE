const mongoose = require('mongoose')

const  bycrypt = require("bcrypt");

const Schema = mongoose.Schema



const TrashSchema = Schema({   
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    files: {}
})




module.exports = mongoose.model('Trash', TrashSchema)