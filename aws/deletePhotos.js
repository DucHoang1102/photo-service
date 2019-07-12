var s3 = require('./config');

var params = (name) => {
    return {
        Bucket: process.env.AWS_BUCKET + '/' + process.env.AWS_FOLDER,
        Key: name
    };
};

var deletePhotos = (name, callback) => {
    s3.deleteObject(params(name + '-thumbnail'), () => {});
    s3.deleteObject(params(name), callback);
};

module.exports = deletePhotos;