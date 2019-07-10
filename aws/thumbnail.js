var imageThumbnail = require('image-thumbnail');

const images = [
    { width: 614, suffixes: '-a8', exp: 'jpg', ContentType: 'image/jpg' },
    { width: 437, suffixes: '-a9', exp: 'jpg', ContentType: 'image/jpg' },
    { width: 307, suffixes: '-a10', exp: 'jpg', ContentType: 'image/jpg' }
];

/*
 * name[string]
 * body[buffer]
 *
 * return[list]
 * 
 */
const thumbnailsGenerator = async (name, body) => {
    var results = [];

    for (let image of images) {
        var _body = await imageThumbnail( body, { width: image.width, height: 1, responseType: 'buffer' } );
        var _name = name + image.suffixes + '.' + image.exp;
        var _contentType = image.ContentType;

        results.push({
            name       : _name,
            body       : _body,
            ContentType: _contentType
        });
    }

    return results;
}

module.exports = thumbnailsGenerator;