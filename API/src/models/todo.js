const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const schema = new Schema({
    usuarioId: {
        type: Number,
        required: false,
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        required: true
    }
}, {_id: false});
schema.plugin(AutoIncrement);

module.exports = mongoose.model('Todo', schema);