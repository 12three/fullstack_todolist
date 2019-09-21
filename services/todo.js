const Todo = require('../models/todo');

var ObjectId = require('mongoose').Types.ObjectId;

async function create(userId, title) {
    let todo = await _getUserTodo(userId);

    const task = { title };

    if (!todo) {
        const newTodo = new Todo({ user: userId, tasks: [task] });

        return newTodo.save();
    }

    todo.tasks.push(task);
    todo.save();
}

async function getAll(userId) {
    let todo = await _getUserTodo(userId);

    return todo ? todo.tasks : null;
}

async function removeById(userId, taskId) {
    let todo = await _getUserTodo(userId);

    if (todo) {
        todo.tasks.pull({ _id: taskId });
        todo.save();
    }
}

async function update(userId, taskId, updatedFields) {
    let todo = await _getUserTodo(userId);

     if (todo) {
        let task = todo.tasks.find(task => task._id.toString() === taskId);

        Object.entries(updatedFields)
            .forEach(([key, value]) => (task[key] = value));

        return todo.save();
    }
}

async function _getUserTodo(userId) {
    let todo = null;

    try {
        todo = await Todo.findOne({ user: new ObjectId(userId) });
    } catch (e) {
        throw e;
    }

    return todo;
}

module.exports = {
    create,
    getAll,
    removeById,
    update,
};

