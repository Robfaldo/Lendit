const AWS = require('aws-sdk');
const Busboy = require('busboy');
const express = require('express');
const imageRoute = express();

imageRoute.post('/upload', function (req, res, next) {
    console.log("============ UPLOAD BEGIN ================");
    let busboy = new Busboy({ headers: req.headers });
    busboy.on('finish', function() {
      console.log('Upload finished');
      const file = req.files.image;
      console.log(file);
    });
    req.pipe(busboy);
  });

module.exports = imageRoute;