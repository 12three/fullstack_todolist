const express = require('express');
const router = express.Router();
const todoServices = require('../../services/todo');
const { check, validationResult } = require('express-validator');

router.post('/', (req, res) => {
    // TODO: check title existence
    const title = req.body.title;
    const userId = req.user._id;

    todoServices.create(userId, title, err => {
        if (err) throw err;

        res.status(201).end('Created');
    });
});


router.get('/', (req, res) => {
    const userId = req.user._id;

    todoServices.getAll(userId, (err, todos) => {
        if (err) throw err;

        res.json(todos);
    });
});


router.put('/:id', (req, res) => {
    const userId = req.user._id;
    const todoId = req.params.id;
    const fields = req.body;

    todoServices.update(userId, todoId, fields, (err, todo) => {
        if (err) throw err;

        res.end('Updated', todo);
    });
});


router.delete('/:id', (req, res) => {
    const todoId = req.params.id;
    const userId = req.user._id;

    todoServices.removeById(userId, todoId, (err, todo) => {
        if (err) throw err;

        res.end('Removed');
    });
});


module.exports = router;
