var mongoose        = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator');

var CategorySchema = new mongoose.Schema({
}, {timestamps: true});

CategorySchema.plugin(uniqueValidator, 'is already exist.');

CategorySchema.methods.getDoSomething = function() {
}

mongoose.model('Category', CategorySchema);