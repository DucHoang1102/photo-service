var mongoose        = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator');

var TagSchema = new mongoose.Schema({
}, {timestamps: true});

TagSchema.plugin(uniqueValidator, 'is already exist.');

TagSchema.methods.getDoSomething = function() {
}

mongoose.model('Tag', TagSchema);