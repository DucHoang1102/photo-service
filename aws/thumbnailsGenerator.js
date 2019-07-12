var imageThumbnail = require('image-thumbnail');

const images = [
    { width: 307, height: 434, suffixes: '-thumbnail', ContentType: 'image/jpg' }
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

    for (let img of images) {
        var _body = await imageThumbnail( body, { width: img.width, height: img.height, responseType: 'buffer' } );
        var _name = name + img.suffixes;
        var _contentType = img.ContentType;

        results.push({
            name       : _name,
            body       : _body,
            contentType: _contentType
        });
    }

    return results;
}

module.exports = thumbnailsGenerator;