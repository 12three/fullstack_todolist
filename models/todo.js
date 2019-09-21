const mongoose = require('../libs/mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    done: Boolean,
});

const scheme = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
    tasks: [taskSchema],
});

module.exports = mongoose.model('Todo', scheme);;

