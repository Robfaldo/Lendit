const AWS = require('aws-sdk');
const Busboy = require('busboy');
const express = require('express');
const imageRoute = express();

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const AWS_USER_KEY = process.env.AWS_USER_KEY;
const AWS_USER_SECRET = process.env.AWS_USER_SECRET;

function uploadToS3(file) {
  let s3bucket = new AWS.S3({
    accessKeyId: AWS_USER_KEY,
    secretAccessKey: AWS_USER_SECRET,
    Bucket: AWS_BUCKET_NAME,
  });

  s3bucket.createBucket(function () {
    var params = {
      Bucket: AWS_BUCKET_NAME,
      Key: file.name,
      Body: file.data,
    };
    s3bucket.upload(params, function (err, data) {
      if (err) {
        console.log('error in callback');
        console.log(err);
      }
      console.log('success');
      console.log(data);
    });
  });
}

imageRoute.post('/upload', async (req, res, next) => {
    console.log("============ UPLOAD BEGIN ================");
    let busboy = new Busboy({ headers: req.headers });
    busboy.on('finish', async () => {
      console.log('============ UPLOAD FINISH ================');
      const file = req.files.image;
      console.log(file);
      console.log('============ UPLOAD TO AWS S3 ================');
      await uploadToS3(file);
      console.log('============ FINISH UPLOAD TO AWS S3 ================');
    });
    req.pipe(busboy);
    res.json({message: "image was uploaded successfully"});
  });

module.exports = imageRoute;