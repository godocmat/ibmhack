var express = require('express');
var app = express();
cors = require('cors');
app.use(cors());
var ExifImage = require('exif').ExifImage;


const request = require('request');
const fs = require('fs');
const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
var bodyParser = require('body-parser');

/*app.use(bodyParser.urlencoded({
  extended: true
}));*/
app.use(bodyParser.json()); // for parsing application/json



/**
 * Retrieve metaData from image
 */
// try {
//     request('https://firebasestorage.googleapis.com/v0/b/ftaciky-a27b6.appspot.com/o/test%2F1574926524530_4.jpeg?alt=media&token=5688157d-f08b-44d8-b965-fdb50ccd7913')
//         .pipe(fs.createWriteStream('image.jpeg'));
//
//     new ExifImage({image: 'image.jpeg'}, (error, exifData) => {
//         if (error) {
//             console.log('Error in metadata', error.message);
//         } else {
//             fs.unlink('image.jpeg', (res) => {
//                 console.log(res);
//             });
//             console.log(exifData);
//         }
//     });
// } catch (e) {
//     console.log('Error while getting META data from image: ' + e.message);
// }

/**
 * Endpoint for ANGULAR to retrieve IMAGE_URL
 */
 app.post('/images', (req, res) => {
   const visualRecognition = new VisualRecognitionV3({
     version: '2019-02-21',
     authenticator: new IamAuthenticator({
       apikey: 'L2MM30I-6bzosYbrTMFeFXofHrpH--nWUN5KCrLZ8Uab',
     }),
     url: 'https://gateway-seo.watsonplatform.net/visual-recognition/api',
   });

   const classifyParams = {
     imagesFile: fs.createReadStream(req.body.image),
     owners: ['me'],
     threshold: 0.6,
   };

   visualRecognition.classify(classifyParams)
     .then(response => {
       const classifiedImages = response.result;
       console.log(JSON.stringify(classifiedImages, null, 2));
     })
     .catch(err => {
       console.log('error:', err);
     });

res.send('ok');
 });


/**
 * VisualRecog
 */
var server = app.listen(3005, function () {

});


