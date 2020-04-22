const express = require('express')
const mongoose = require('mongoose')
const passport = require("passport");
require("../config/auth")(passport);
const router = express.Router()
const dotenv = require('dotenv').config()
const User = require('../model/user')
const AWS = require('aws-sdk');
const fs = require('fs')
const helper = require('../helper/helper');
const jwt = require("jsonwebtoken");
const multer  = require('multer'),
multerS3 = require('multer-s3')

console.log(process.env.AccessKeyID)
console.log(process.env.SecretAccessKey)
/**
 * AWS CONFIG
 */
const s3 = new AWS.S3({
    accessKeyId: process.env.AccessKeyID,
    secretAccessKey: process.env.SecretAccessKey
});
var storage =  multer({
    storage: multerS3({
      s3: s3,
      acl: 'public-read',
      bucket: 'outsourcedrive',   
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },   
      key: function (req, file, cb) {
          console.log(file, 'from multerS3')
        cb(null, file.originalname)
      }
    })
  })




router.get('/files', (req, res) =>{

})


router.post('/file', passport.authenticate('jwt', { session: false}),storage.single('file'), function(req, res) {
    var token = helper.getToken(req.headers)
   
    if (token) {
        if(req.file){           
            let file = {
                user: req.user._id,
                location: req.file.location,
                filename: req.file.originalname
            }
            User.findByIdAndUpdate({_id: req.user._id},{ '$addToSet': { 'files': file } }, (err, doc) =>{
                if(err){
                    return res.json({success: false, msg: 'unable to save file to db'});
                }else{
                    return res.status(200).send({success: true, msg: 'Saved to storage.'});
                }
            })
        }
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  });

router.post('/folder', passport.authenticate("jwt", { session: false }), function(req, res) {
    const token = helper.getToken(req.headers);   
    if(token){
        let folder = {
            user: req.user._id,
            name: req.body.name,
            files: []
        }
        User.findByIdAndUpdate({_id: req.user._id},{ '$addToSet': { 'folders': folder } }, (err, doc) =>{
            if(err){
                return res.json({success: false, msg: 'unable to create a new folder'});
            }else{
                return res.status(200).send({success: true, msg: `Created a new folder ${req.body.name}`});
            }
        }) 
    }else{
        res.json({success: false, message: 'unauthorized'})
    }
})

/// not yet working
router.post('/move', passport.authenticate("jwt", { session: false }), function(req, res) {
    const token = helper.getToken(req.headers);   
    if(token){
        let folder = req.body.folder        
        console.log(folder)
        console.log(req.body._id)
        console.log(req.body.user)
        let file = {
            user: req.user._id,
            location: req.body.location,
            filename: req.body.filename
        }        
        User.findOneAndUpdate(
            {_id: req.user._id},
            { 
                '$pull': { 'files': {_id: req.body._id} },
                       
            },             
            (err, doc) =>{
            if(err){
                console.log(err)
                return res.json({success: false, err, msg: 'unable to move to folder'});
            }else{               
                User.findOne({'folders.name': folder}, (err, doc) =>{
                    if(err){
                        return res.json({success: false, msg: 'unable to find folder'});
                    }else{
                        let obj = doc.folders.map(e => {
                            if(e.name == folder){
                                 e.files.push(file);
                            }
                            return e
                        })
                        console.log(obj)
                        doc.folders = obj
                        doc.save(err, updates =>{
                            if(err){
                                return res.json({success: false, err, msg: 'unable to move to folder'});
                            }else{
                                return res.status(200).send({success: true, msg: `Moved file ${req.body.filename}  to ${req.body.folder} folder Succesfully`});
                                // return res.status(200).send({success: true, msg: `folder found`, doc});
                            }
                        })
                    }
                }) 
                
            }
        }) 
    }else{
        res.json({success: false, message: 'unathorized'})
    }
})
router.post('/share', passport.authenticate("jwt", { session: false }), function(req, res) {
    const token = helper.getToken(req.headers);   
    if(token){
        let folder = `folders.${req.body.folder}`
        let file = {
            user: req.user._id,
            location: req.body.location,
            filename: req.body.filename
        }
        User.findByIdAndUpdate({_id: req.body.colleague},{ '$addToSet': { 'shared': file } }, (err, doc) =>{
            if(err){
                return res.json({success: false, msg: 'unable to share file'});
            }else{
                return res.status(200).send({success: true, msg: 'File shared successfully'});
            }
        })
    }else{
        res.json({success: false, message: 'unauthorized, token absent'})
    }
})
router.get('/folder', passport.authenticate("jwt", { session: false }), function(req, res) {
    const token = helper.getToken(req.headers);   
    if(token){
       
        User.findOne({'folders.name': 'React'}, (err, doc) =>{
            if(err){
                return res.json({success: false, msg: 'unable to find folder'});
            }else{
                return res.status(200).send({success: true, msg: `folder found`, doc});
            }
        }) 
    }else{
        res.json({success: false, message: 'unauthorized'})
    }
})

module.exports = router


