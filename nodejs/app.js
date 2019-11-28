var express = require('express');
var app = express();
cors = require('cors');
app.use(cors());
var ExifImage = require('exif').ExifImage;


const request = require('request');
const fs = require('fs');
const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
const VisualRecognitionV4 = require('ibm-watson/visual-recognition/v4');
const { IamAuthenticator } = require('ibm-watson/auth');
const {Firestore} = require('@google-cloud/firestore');


const db = new Firestore({
    projectId: 'ftaciky-a27b6',
    keyFilename: 'credentials.json',
});
let filesRef = db.collection('files');


/**
 * Get all images from Firestore
 */
// let allImages = filesRef.get()
//     .then(snapshot => {
//         snapshot.forEach(doc => {
//             console.log(doc.id, '=>', doc.data());
//         });
//     })
//     .catch(err => {
//         console.log('Error getting documents', err);
//     });

/**
 * UPDATE IMAGE METADATA
 */
let singleImageRef = filesRef.doc('1P5TCxkfAKQ9wpjJXStJ');

let updateValue = singleImageRef.update({long: 34.344, lat: 35.222, state: 'damaged', createDate: new Date()});


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
// app.post('/images', (req, res) => {
//     const image_url = req.body.image_url;
//     const classifyParams = {
//         imagesFile: fs.createReadStream(image_url as URL),
//         owners: ['me'],
//         threshold: 0.6,
//     };
//     visualRecognition.classify(classifyParams)
//         .then(response => {
//             const classifiedImages = response.result;
//             console.log(JSON.stringify(classifiedImages, null, 2));
//         })
//         .catch(err => {
//             console.log('error:', err);
//         });
// });


/**
 * VisualRecog
 */
var server = app.listen(3005, function () {
    const visualRecognition = new VisualRecognitionV3({
        version: '2019-02-21',
        authenticator: new IamAuthenticator({
            apikey: 'L2MM30I-6bzosYbrTMFeFXofHrpH--nWUN5KCrLZ8Uab',
        }),
        url: 'https://gateway-seo.watsonplatform.net/visual-recognition/api',
    });

    const visualRecognition4 = new VisualRecognitionV4({
        version: '2019-02-11',
        authenticator: new IamAuthenticator({
            apikey: 'L2MM30I-6bzosYbrTMFeFXofHrpH--nWUN5KCrLZ8Uab',
        }),
        url: 'https://gateway-seo.watsonplatform.net/visual-recognition/api',
    });

    const param = {
        name: 'my-collection',
        description: 'A description'
    };

    // visualRecognition4.createCollection(param)
    //     .then(response => {
    //         console.log(JSON.stringify(response.result, null, 2));
    //     })
    //     .catch(err => {
    //         console.log('error: ', err);
    //     });

    const params = {
        name : 'stlpyHackathon',
        positiveExamples: {
            first: fs.createReadStream('images/1.zip'),
            secondOK: fs.createReadStream('images/2dobre.zip'),
            secondBad: fs.createReadStream('images/2poskodene.zip'),
            thirdOk: fs.createReadStream('images/3dobre.zip'),
            thirdPoskodene: fs.createReadStream('images/3poskodene.zip'),
            fourthOk: fs.createReadStream('images/4dobre.zip'),
            five: fs.createReadStream('images/5.zip'),
            six: fs.createReadStream('images/6.zip'),
            seven: fs.createReadStream('images/7.zip'),
            nine: fs.createReadStream('images/9.zip'),
        }
    };

    const listparams = {
        verbose: true,
    };

    // visualRecognition.listClassifiers(listparams)
    //     .then(response => {
    //         const classifiers = response.result;
    //         console.log(JSON.stringify(classifiers,null,2));
    //     })
    //     .catch(err => {
    //         console.log('error happened: ', err);
    //     });

    // visualRecognition.createClassifier(params)
    //     .then(response => {
    //         const classifier = response.result;
    //         console.log(JSON.stringify(classifier,null,2));
    //     })
    //     .catch(err => {
    //         console.log('error', err);
    //     });

    // const classifyParams = {
    //     imagesFile: fs.createReadStream('074.jpg'),
    //     owners: ['me'],
    //     threshold: 0.6,
    // };
    //
    // visualRecognition.classify(classifyParams)
    //     .then(response => {
    //         const classifiedImages = response.result;
    //         console.log(JSON.stringify(classifiedImages, null, 2));
    //     })
    //     .catch(err => {
    //         console.log('error:', err);
    //     });
})


