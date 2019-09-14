const Todo = require('../models/todo');

function create(title, done) {
    if (!title) return done(new Error('Title is required'))

    const todo = new Todo({ title });
    todo.save(function(err, todo) {
        if (err) return done(err);

        done(null, todo);
    });
}

function getAll(done) {
    Todo.find({}, (err, todos) => {
        if (err) return done(err);

        done(null, todos);
    });
}

function getById(id, done) {
    Todo.findById(id, (err, todo) => {
        if (err) return done(err);

        done(null, todo);
    });
}

function removeById(id, done) {
    Todo.remove({_id: id}, err => {
        if (err) return done(err);

        done(null);
    });
}

function updateById(id, updatedFields, done) {
    Todo.updateOne({ _id: id }, updatedFields, (err, todo) => {
        if (err) return done(err);

        done(null, todo);
    });
}

module.exports = {
    create,
    getAll,
    getById,
    removeById,
    updateById,
};

