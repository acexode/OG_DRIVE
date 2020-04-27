const getToken = function (headers) {    
  console.log(headers.authorization)
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ');  
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

module.exports  = {getToken}


// const params = {
//     Bucket: 'outsourcedrive',
//     CreateBucketConfiguration: {
//         // Set your region here
//         LocationConstraint: process.env.region
//     }
// };
// const uploadFile = () => {
//     const fileContent = fs.readFileSync(__dirname +'/me.jpg')
//     const params = {
//         Bucket: 'outsourcedrive',
//         Key: 'me.jpg',
//         Body: fileContent
//     };
//     s3.upload(params, function(err, data){
//         if(err){
//             throw err
//         }
//         console.log(`file uploaded successfully`)
//         console.log(data)
//     })
// }
// let me = fs.readFileSync(__dirname +'/me.jpg')
// //  uploadFile()

// create bucket
// s3.createBucket(params, function(err, data) {
//     if (err) console.log(err, err.stack);
//     else console.log('Bucket Created Successfully', data.Location);
// });
