const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CaseStudy = new Schema({
    key: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
    counts: {
        type: [Number]
    }
})
module.exports = mongoose.model('records', CaseStudy);
