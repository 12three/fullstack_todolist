const mongoose = require('../libs/mongoose');

const scheme = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    done: Boolean,
});
const Todo = mongoose.model('Todo', scheme);

module.exports = Todo;

