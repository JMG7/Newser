const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let newsSchema = new Schema([{
    title: {
        type: String,
        required: [true, 'title is necessary'],
    },
    description: {
        type: String,
        required: [true, 'description is necessary']
    },
    date: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        required: [true, 'content is necessary']
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    archiveDate: { type: Date }
}]);

module.exports = mongoose.model('News', newsSchema);