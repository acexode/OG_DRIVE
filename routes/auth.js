const express = require("express");
const passport = require("passport");
require("../config/auth")(passport);
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../model/user");
const helper = require('../helper/helper')


router.get('/users', (req,res)=>{
  User.find({}).then(data =>{
    return res.json({success: true, msg: `${data.length} users found`, data})
  }).catch(err =>{
    return res.json({success: true, msg: `error getting user from database`, err })

  })
})

/*
POST REQUEST
SIGNUP, LOGIN 
*/

router.post("/signup", (req, res) => {
 
  if (!req.body.ogID ||  !req.body.fullname || !req.body.password || !req.body.department) {
    res.json({
      success: false,
      message: "ogID, firstname, lastname, department, and password are required!!"
    });
  } else {
    const newUser = new User({
      ogID: req.body.ogID,
      fullname: req.body.fullname,      
      password: req.body.password,
      department: req.body.department
    });
    newUser.save(err => {
      if (err) {
        return res
          .status(401)
          .json({ success: false, message: "User already exist!!", err });
      }
      res.json({
        success: true,
        message: "User created!!"
      });
    });
  }
});



//LOGIN
router.post("/login", (req, res) => {  
  const {ogID, password} = req.body;
  User.findOne({ ogID: req.body.ogID }, function(err, user) {
    if (err) {
      throw err;
    }
    if (!user) {
      res.status(401).send({ success: false, message: "User does not exist" });
    } else {
      // console.log(user);
      // console.log(process.env.SECRET);
      user.comparePassword(password, function(err, match) {        
        if (match && !err) {
          let token = jwt.sign(user.toJSON(), process.env.SECRET,{expiresIn:'24hr'});
          res.json({success: true, token, user});
        } else {
          res
            .status(401)
            .send({ success: false, message: "Incorrect password!!" });
        }
      });
    }
  });
});

// modify account details
router.put("/user/:id", passport.authenticate("jwt", {session: false}), (req, res) => {
  const id = req.params.id;
  const token = helper.getToken(req.headers)
  if(token){
    User.findOne({ _id: id }, {}, (err, user) => {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        if (!user) {
          res.json({ success: false, message: "user not found" });
        } else {
          user.fullname = req.body.fullname;
          user.department = req.body.department;        
          user.password = req.body.password;        
          user.ogID = req.body.ogID; 
          if(req.user.role == "Admin"){
            user.role = req.body.role 
          }    
          user.save(err => {
            if (err) {
              res.json({ success: false, message: err });
            } else {
              res.json({ success: true, message: "user  details updated" });
            }
          });
        }
      }
    });
  }else{
    res.json({ success: false, message: 'unauthorized access denied' });
  }
});
/**
 * Delte Account
 */

 router.delete('/delete-user/:id', passport.authenticate('jwt', {session: false}), (req,res) =>{
   const token = helper.getToken(req.headers)
   if(token && req.user.role == 'Admin'){
     User.findByIdAndDelete({_id: req.params.id }, ((err,doc)=>{
       if(err){
         return res.json({success: false, msg: 'unable to delete user account', doc})
        }else{
          return res.json({success: true, msg: 'user deleted successfully', doc})

       }
     }))

   }
 })

module.exports = router;
