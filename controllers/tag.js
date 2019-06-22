var mongoose = require('mongoose'),
    Tag      = mongoose.model('Tag');

exports.view = function (req, res, next) {
    var limit  = String(req.body.limit)  || 20; // Why String()? Because case req.body.limit = 0 is Number
    var offset = String(req.body.offset) || 0;
    var query  = req.body.query          || {};
    var sort   = req.body.sort           || {createdAt: 'desc'};
    var select = req.body.select         || '';

    var results = Tag.find(query)
        .select(select)
        .limit(Number(limit))
        .skip(Number(offset))
        .sort(sort)
        .exec();

    Promise.all([results]).then(results => {
        var customers = results[0]
        return res.json({customers: customers});

    }).catch( err => res.json({ errors: err.message }) );
};

exports.new = function (req, res, next) {
    var tag = new Tag(req.body.tag);

    return tag.save().then(results => {
        return res.json( { tags: results } );

    }).catch( err => res.json( { errors: err.message } ));
};

exports.details = function (req, res, next) {
    Tag.findOne( {slug: req.params.slug} ).exec().then(results => {
        if (!results) throw new Error('Tag not found');

        return res.json( { tags: results } );

    }).catch( err => res.json( { errors: err.message } ));
};

exports.update = function (req, res, next) {
    Tag.findOne( {slug: req.params.slug} ).exec().then(tag => {
        if (!tag) throw new Error('Tag not found');

        if (typeof req.body.tag.name !== 'undefined') {
            tag.name = req.body.tag.name;
        }

        tag.save().then(category => {
            return res.json( { tags: tag } );
            
        }).catch( err => res.json( { errors: err.message } ));

    }).catch( err => res.json( { errors: err.message } ));
};

exports.delete = function (req, res, next) {
    Tag.findOneAndRemove( {slug: req.params.slug} ).exec().then(results => {
        if (!results) throw new Error('Tag not found');

        return res.json( { tags: results } );
        
    }).catch( err => res.json( { errors: err.message } ));
};
