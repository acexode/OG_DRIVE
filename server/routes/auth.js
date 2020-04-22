const express = require("express");
const passport = require("passport");
require("../config/auth")(passport);
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../model/user");

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
          .json({ success: false, message: "User already exist!!" });
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
          res.json({success: true, token:'JWT '+token});
        } else {
          res
            .status(401)
            .send({ success: false, message: "Incorrect password!!" });
        }
      });
    }
  });
});


module.exports = router;
