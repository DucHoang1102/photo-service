var mongoose        = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator'),
    slug            = require('slug');

var CategorySchema = new mongoose.Schema({
    id:          { type: String, trim: true, uppercase: true, required: true, unique: true },
    name:        { type: String },
    description: { type: String, default: '' }

}, { timestamps: true } );

CategorySchema.plugin(uniqueValidator, 'is already exist.');

// Validation custom
CategorySchema.path('id').validate(function(id) {
    return id === slug( id, {replacement: '', remove: /[-_.]/g} );
}, 'Error, `{PATH}` cannot contain space and charmaps. Value: `{VALUE}`');

mongoose.model('Category', CategorySchema);