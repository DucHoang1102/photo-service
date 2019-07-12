var s3 = require('./config'),
    deletePhotos = require('./deletePhotos');

var params = (oldName, newName) => {
    return {
        Bucket: process.env.AWS_BUCKET + '/' + process.env.AWS_FOLDER,
        CopySource: process.env.AWS_BUCKET + '/' + process.env.AWS_FOLDER + '/' + oldName,
        Key: newName
    };
};

// Rename object = Copy new object with new name and delete old object
var renamePhotos = function(oldName, newName, callback) {
    s3.copyObject(params(oldName + '-thumbnail', newName + '-thumbnail'), (s3Err, data) => {});

    s3.copyObject(params(oldName, newName), (s3Err, data) => {
       deletePhotos(oldName, callback);
    });
};

module.exports = renamePhotos;