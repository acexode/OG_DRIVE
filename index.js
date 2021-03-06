const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const passport = require('passport')
const cors = require('cors')
const routes = require('./routes/index')
const auth = require('./routes/auth')
const path = require('path');
const seed = require('./model/seed')

dotenv.config()

const app = express()
app.use(cors())
mongoose.connect(  process.env.MONGODBURI,{
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
  }, (err) =>{
      if(err){
          console.log(err)
      }else{
          console.log('connected to MongoDB')
      }
  })
  
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: false}))
  
  app.use(passport.initialize())
  app.use('/api', auth)
  app.use('/api', routes)

  if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*', function(req, res){
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }
  const port = process.env.PORT || 5000

  app.listen(port, ()=>{
      console.log(`OG Drive running on port ${port}...`)
  })

