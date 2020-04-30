const mongoose = require('mongoose')

const  bycrypt = require("bcrypt");

const Schema = mongoose.Schema

const FileSchema = Schema({
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    filename: String,
    location: String
  
})


const userSchema = Schema({
    ogID: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    fullname: {type: String, required: true},  
    department: String,
    role: {type:String, default: 'User'},    
    sharedFile: [FileSchema],
    sharedFolder: []
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


module.exports = mongoose.model('Users', userSchema)
