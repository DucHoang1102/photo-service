var mongoose        = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator');

var PhotoSchema = new mongoose.Schema({
    name    :  { type: String, required: true, unique: true }, // Primary key
    url     :  { type: String }, // Link image thumbnail
    src     :  { type: String }, // Link image original
    size    :  { type: Number, default: 0 },
    category:  { type: String, trim: true, uppercase: true, default: null }, // Foreign key
    tags    : [{ type: String, trim: true, lowercase: true }], // Foreign key
    note    :  { type: String, default: '' }

}, {timestamps: true});

PhotoSchema.plugin(uniqueValidator, 'is already exist.');

mongoose.model('Photo', PhotoSchema);