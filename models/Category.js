var mongoose        = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator');

var CategorySchema = new mongoose.Schema({
    id:          { type: String, trim: true, uppercase: true, required: true, unique: true },
    name:        { type: String },
    description: { type: String, default: '' },

}, {timestamps: true});

CategorySchema.plugin(uniqueValidator, 'is already exist.');

mongoose.model('Category', CategorySchema);