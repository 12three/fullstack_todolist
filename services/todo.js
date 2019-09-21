const Todo = require('../models/todo');
var ObjectId = require('mongoose').Types.ObjectId;

function create(userId, title, done) {
    if (!title) return done(new Error('Title is required'));

    _getUserTodo(userId, (err, todo) => {
        if (err) return done(err);

        const task = { title };

        if (!todo) {
            const newTodo = new Todo({ user: userId, tasks: [task] });

            return newTodo.save(done);
        }

        todo.tasks.push(task);
        todo.save(done);
    });
}

function getAll(userId, done) {
    _getUserTodo(userId, (err, todo) => {
        if (err) return done(err);

        if (!todo) {
            return done(null, null);
        }

        done(null, todo.tasks);
    });
}

function removeById(userId, taskId, done) {
    _getUserTodo(userId, (err, todo) => {
        if (err) return done(err);

        if (todo) {
            todo.tasks.pull({ _id: taskId });
            todo.save(done);
        }

        done(null);
    });
}

function update(userId, taskId, updatedFields, done) {
    _getUserTodo(userId, (err, todo) => {
        if (err) return done(err);

        if (todo) {
            let task = todo.tasks.find(task => task._id.toString() === taskId);

            Object.entries(updatedFields)
                .forEach(([key, value]) => (task[key] = value));

            return todo.save(done);
        }

        done(null)
    });



    // Todo.updateOne({ _id: id }, updatedFields, (err, todo) => {
    //     if (err) return done(err);

    //     done(null, todo);
    // });
}

function _getUserTodo(userId, done) {
    return Todo.findOne({ user: new ObjectId(userId) }, done);
}

module.exports = {
    create,
    getAll,
    removeById,
    update,
};

