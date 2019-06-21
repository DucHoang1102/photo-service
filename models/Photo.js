var mongoose        = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator');

var PhotoSchema = new mongoose.Schema({
    name    :  { type: String, trim: true, uppercase: true, required: true, unique: true },
    ext     :  { type: String, trim: true, lowercase: true },
    src     :  { type: String, trim: true, lowercase: true },
    size    :  { type: Number, default: 0 },
    category:  { type: String, trim: true, uppercase: true },
    tags    : [{ type: String, trim: true, lowercase: true } ],
    note    :  { type: String, default: '' }

}, {timestamps: true});

PhotoSchema.plugin(uniqueValidator, 'is already exist.');

mongoose.model('Photo', PhotoSchema);