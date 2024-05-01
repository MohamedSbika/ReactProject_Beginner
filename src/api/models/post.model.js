const slugify = require('slugify');

module.exports = mongoose => {
    const Schema = mongoose.Schema;
    let PostSchema = new Schema({
        cadre: { type: String, required: true },
        roue: { type: Number, required: true },
        pedale: { type: Number, required: true },
        guidon: { type: Number, required: true },
        vises: { type: Number, required: true },
        temps: { type: Number, required: true },
    }, {
        timestamps: true
    });

    PostSchema.pre('save', function(next) {
        this.slug = slugify(this.cadre, '_');
        next();
    });

    PostSchema.method('toJSON', function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Post = mongoose.model('Post', PostSchema);
    return Post;
};
