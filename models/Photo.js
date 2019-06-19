var mongoose        = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator');

var PhotoSchema = new mongoose.Schema({
}, {timestamps: true});

PhotoSchema.plugin(uniqueValidator, 'is already exist.');

PhotoSchema.methods.getDoSomething = function() {
}

mongoose.model('Photo', PhotoSchema);