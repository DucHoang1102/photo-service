s3 = require('./config');

var getUrl = function (name) {
    var params = {
        Bucket: process.env.AWS_BUCKET + '/' + process.env.AWS_FOLDER,
        Key: name,
        Expires: parseInt(process.env.AWS_OBJECT_EXP)
    };

    var url = s3.getSignedUrl('getObject', params);

    return url;
};

module.exports = getUrl;
