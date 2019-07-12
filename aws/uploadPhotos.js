var s3                  = require('./config'),
    thumbnailsGenerator = require('./thumbnailsGenerator');

var params = (name, body, contentType) => {
    return {
        Bucket: process.env.AWS_BUCKET + '/' + process.env.AWS_FOLDER,
        Key: name,
        Body: body,
        ContentType: contentType
    };
};

/*
 * opts[list]{ name[string], body[buffer], contentType['image/jpeg' || 'image/png'], thumbnail[boolean] }
 *
 * callback[function]
 *
 * return[undefined]
 * 
 */
var upload = (opts, callback) => {
    var _name        = opts.name      ? opts.name      : '';
    var _body        = opts.body      ? opts.body      : '';
    var _thumbnail   = opts.thumbnail ? opts.thumbnail : false;
    var _contentType = opts.contentType === 'image/jpeg' ? 'image/jpeg' : 'image/png';

    if (_thumbnail === true) {
        thumbnailsGenerator(_name, _body).then(listThumbnails => {
            for (img of listThumbnails) {
                s3.upload( params(img.name, img.body, img.contentType), function(){} );
            }
        });
    }

    s3.upload(params(_name, _body, _contentType), callback);
}

module.exports = upload;