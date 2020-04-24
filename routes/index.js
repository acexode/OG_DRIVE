const express = require('express')
const mongoose = require('mongoose')
const passport = require("passport");
require("../config/auth")(passport);
const router = express.Router()
const dotenv = require('dotenv').config()
const User = require('../model/user')
const Files = require('../model/file')
const Folder = require('../model/folder')
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



/**
 * 
 * Get files belonging to  user 
 * 
 */
router.get('/files', (req, res) =>{
    var token = helper.getToken(req.headers)
   
    if (token) {
        if(req.file){  
            Files.find({user: req.user._id}, {}, (err, files)=>{
                if(err){
                    return res.json({success: false, msg: 'no file found'});
                }else{
                    return res.status(200).send({success: true, msg: `found ${files.length} belonging to user`, files});
                }
            }) 
        }
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
})

/**
 * 
 * Post single file  
 * 
 */

router.post('/file', passport.authenticate('jwt', { session: false}),storage.single('file'), function(req, res) {
    var token = helper.getToken(req.headers)
   
    if (token) {
        if(req.file){           
            let file =new Files({
                user: req.user._id,
                location: req.file.location,
                filename: req.file.originalname
            })
            file.save((err,file) =>{
                if(err){
                    return res.json({success: false, msg: 'unable to save file to db'});
                }else{
                    return res.status(200).send({success: true, msg: 'Saved to storage.', file});
                }
            })            
        }
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  });

/**
 *  
 * Post bulk array of files * 
 * 
 */
router.post('/files', passport.authenticate('jwt', { session: false}),storage.array('files'), function(req, res) {
    var token = helper.getToken(req.headers)
    console.log(req.files)
    if (token) {
        if(req.files){  
            let files = req.files.map(e =>{
                let obj = {
                    user: req.user._id,
                    location: e.location,
                    filename: e.originalname
                }
                return obj
            })
            Files.create(files).then(docs =>{
                return res.status(200).send({success: true, msg: 'Saved to storage.'});
            }).catch(err =>{
                return res.json({success: false, msg: 'unable to save file to db'});
            })  
            
        }
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  });


  /**
 * 
 * Create folder 
 * 
 */
router.post('/folder', passport.authenticate("jwt", { session: false }), function(req, res) {
    const token = helper.getToken(req.headers);   
    if(token){
        let folder = new Folder({
            user: req.user._id,
            name: req.body.name,
            files: []
        })
        folder.save((err,doc) =>{
            if(err){
                return res.json({success: false, msg: 'unable to create new folder'});
            }else{
                return res.status(200).send({success: true, msg: 'Folder created successfully', doc});
            }
        })
    }else{
        res.json({success: false, message: 'unauthorized'})
    }
})


/**
 * 
 * Get Folder
 * 
 */
router.get('/folder', passport.authenticate("jwt", { session: false }), function(req, res) {
    const token = helper.getToken(req.headers);   
    if(token){
       
        User.findOne({'folders.name': req.body.name}, (err, doc) =>{
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

/**
 * 
 * Move file from root to folder
 * 
 */
router.post('/root-to-folder', passport.authenticate("jwt", { session: false }), function(req, res) {
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
        Files.findByIdAndDelete({_id: req.body._id},(err, doc)=>{
            if(err){
                return res.json({success: false, err, msg: 'unable to move to folder'});
            }else{
                Folder.findOneAndUpdate({user: req.user._id, name: req.body.folder},{ '$addToSet': { 'files': file },}, (err, update) =>{
                    if(err){
                        return res.json({success: false, err, msg: 'unable to move to folder'});
                    }else{
                        return res.status(200).send({success: true, msg: `Moved file ${req.body.filename}  to ${req.body.folder} folder Succesfully`});
                        // return res.status(200).send({success: true, msg: `folder found`, doc});
                    }
                })

            }
        })
        
    }else{
        res.json({success: false, message: 'unathorized'})
    }
})
/**
 * 
 * Move file from folder to folder
 * 
 */
router.post('/folder-to-folder', passport.authenticate("jwt", { session: false }), function(req, res) {
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
       
        Folder.findOneAndUpdate
        ({user: req.user._id, name: req.body.from}, 
        {$pull : {'files': {user: req.user._id, filename: req.body.filename, location:  req.body.location}}},
        ((err, resp) =>{
            if(err){
                return res.json({success: false, err, msg: 'unable to move to file'}); 
            }else{
                Folder.findOneAndUpdate({user: req.user._id, name: req.body.dest},{ '$addToSet': { 'files': file },}, (err, update) =>{
                    if(err){
                        return res.json({success: false, err, msg: 'unable to move to folder'});
                    }else{
                        return res.status(200).send({success: true, msg: `Moved ${req.body.filename} from  ${req.body.from}  to ${req.body.dest} folder Succesfully`});
                        // return res.status(200).send({success: true, msg: `folder found`, doc});
                    }
                }) 
            }
        })
        )
        
    }else{
        res.json({success: false, message: 'unathorized'})
    }
})

/**
 * Move folder from one to another
 */
router.post('/move-folder', passport.authenticate("jwt", { session: false }), function(req, res) {
    const token = helper.getToken(req.headers);   
    if(token){    
        console.log(req.body.name)   
        console.log(req.user._id) 
        Folder.findOneAndRemove({user: req.user._id, name: req.body.name},         
        ((err, resp) =>{
            if(err){
                return res.json({success: false, err, msg: 'unable to move to file'}); 
            }else{
                
                Folder.findOneAndUpdate({user: req.user._id, name: req.body.dest},{ '$addToSet': { 'folders': resp },}, (err, update) =>{
                    if(err){
                        return res.json({success: false, err, msg: 'unable to move to folder'});
                    }else{
                        return res.status(200).send({success: true, msg: `Moved ${req.body.name} from  ${req.body.from}  to ${req.body.dest} folder Succesfully`});
                        // return res.status(200).send({success: true, msg: `folder found`, doc});
                    }
                }) 
            }
        })
        )
        
    }else{
        res.json({success: false, message: 'unathorized'})
    }
})
/**
 * 
 * Delete a a folder 
 * 
 */

router.post('/remove-folder', passport.authenticate("jwt", { session: false }), function(req, res) {
    const token = helper.getToken(req.headers);   
    if(token){     
        Folder.findByIdAndRemove({_id: req.body.file}, (err) =>{
            if(err){
                console.log(err)
                return res.json({success: false, err, msg: 'file deleted successfully'});
            }else{      
                return res.status(200).send({success: true, msg: `folder deleted`}); 
            }
        })        
        
    }else{
        res.json({success: false, message: 'unathorized'})
    }
})

/**
 * 
 * Share file  
 * 
 */
router.post('/share', passport.authenticate("jwt", { session: false }), function(req, res) {
    const token = helper.getToken(req.headers);   
    if(token){
       
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






module.exports = router


