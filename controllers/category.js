var mongoose = require('mongoose'),
    Category = mongoose.model('Category');

exports.view = function (req, res, next) {
    var limit  = String(req.body.limit)  || 20; // Why String()? Because case req.body.limit = 0 is Number
    var offset = String(req.body.offset) || 0;
    var query  = req.body.query          || {};
    var sort   = req.body.sort           || {createdAt: 'desc'};
    var select = req.body.select         || '';

    var results = Category.find(query)
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
    var category = new Category(req.body.category);

    return category.save().then(results => {
        return res.json( { categorys: results } );

    }).catch( err => res.json( { errors: err.message } ));
};

exports.details = function (req, res, next) {
    Category.findOne( {id: req.params.id} ).exec().then(results => {
        if (!results) throw new Error('Category not found');

        return res.json( { categorys: results } );

    }).catch( err => res.json( { errors: err.message } ));
};

exports.update = function (req, res, next) {
    Category.findOne( {id: req.params.id} ).exec().then(category => {
        if (!category) throw new Error('Category not found');

        if (typeof req.body.category.id !== 'undefined') {
            category.id = req.body.category.id;
        }

        if (typeof req.body.category.name !== 'undefined') {
            category.name = req.body.category.name;
        }

        if (typeof req.body.category.description !== 'undefined') {
            category.description = req.body.category.description;
        }

        category.save().then(category => {
            return res.json( { categorys: category } );
            
        }).catch( err => res.json( { errors: err.message } ));

    }).catch( err => res.json( { errors: err.message } ));
};

exports.delete = function (req, res, next) {
    Category.findOneAndRemove( {id: req.params.id} ).exec().then(results => {
        if (!results) throw new Error('Category not found');

        return res.json( { categorys: results } );
        
    }).catch( err => res.json( { errors: err.message } ));
};
