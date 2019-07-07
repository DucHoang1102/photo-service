var s3 = require('./config');

// Rename object = Copy new object with new name and delete old object
var renameObject = function(oldName, newName, callback) {
    var params = {
        Bucket: process.env.AWS_BUCKET + '/' + process.env.AWS_FOLDER,
        CopySource: process.env.AWS_BUCKET + '/' + process.env.AWS_FOLDER + '/' + oldName,
        Key: newName
    };

    s3.copyObject(params, (s3Err, data) => {
        var params = {
            Bucket: process.env.AWS_BUCKET + '/' + process.env.AWS_FOLDER,
            Key: oldName
        };

        s3.deleteObject(params, callback);
    });
};

module.exports = renameObject;