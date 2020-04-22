const mongoose = require('mongoose')

const  bycrypt = require("bcrypt");

const Schema = mongoose.Schema

const FileSchema = Schema({
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    filename: String,
    location: String
  
})

const FolderSchema = Schema({
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    name: String,
    files: [FileSchema]
  
})
// const SharedSchema = Schema({
//     user: { type: mongoose.Schema.ObjectId, ref: 'User' },
//     filename: String
  
// })
const userSchema = Schema({
    ogID: String,
    password: String,
    fullname: String,  
    department: String,
    files: [FileSchema],
    folders: [FolderSchema],
    shared: [FileSchema]
})
userSchema.pre("save", function(next){
    
    const user = this;   
    if(this.isModified("password") ||this.isNew ){       
        bycrypt.genSalt(10,function(err,salt){           
            if(err){
                return next(err)
            }
            bycrypt.hash(user.password,salt,(err,hash)=>{
                console.log(err)
                if(err){
                    return next(err)
                }
                user.password = hash;               
                next()
            })
        })
    }else{
        return next()
    }
});

userSchema.methods.comparePassword = function(pwd,next){    
    bycrypt.compare(pwd,this.password,function(err,result){        
        if(err){
            return next(err)
        }
        next(null,result)
    })
};


module.exports = mongoose.model('User', userSchema)
