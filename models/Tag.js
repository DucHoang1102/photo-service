var mongoose        = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator'),
    slug            = require('slug');

var TagSchema = new mongoose.Schema({
    name: { type: String, trim: true, lowercase: true, required: true },
    slug: { type: String, trim: true, lowercase: true, required: true, unique: true }

}, { timestamps: true } );

TagSchema.plugin(uniqueValidator, 'is already exist.');

TagSchema.pre('validate', function(){
    this.slug = slug(this.name);
});

mongoose.model('Tag', TagSchema);