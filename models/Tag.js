var mongoose        = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator');

var TagSchema = new mongoose.Schema({
    name: String,
    slug: { type: String, trim: true, lowercase: true, required: true, unique: true}
}, {timestamps: true});

TagSchema.plugin(uniqueValidator, 'is already exist.');

mongoose.model('Tag', TagSchema);