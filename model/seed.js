const User = require('./user')
const dotenv = require('dotenv').config()
console.log(process.env.ADMIN_PASSWORD)
User.find({}).then((doc) =>{
    if(doc.length ==0){
        let admin = new User({           
             ogID: 'OG2000',
             fullname: 'Mallam Adamu',
             password: process.env.ADMIN_PASSWORD,
             department: 'Software Development',
             role: 'Admin',
             shared: [],
               
           })
        admin.save(err =>{
            if(err){
                console.log(err)
            }
        })
    }
  console.log(`${doc.length} users found`)
});

// spaces.push(...work.flat(Infinity), ...event.flat(Infinity), ...bed.flat(Infinity), ...fun.flat(Infinity))
// console.log(spaces.slice(1,10))
// Space.create(spaces).then(spaces =>{
//     console.log(`${spaces.length} spaces have been created`)
// }).catch(err =>{
//     console.error(err)
// })