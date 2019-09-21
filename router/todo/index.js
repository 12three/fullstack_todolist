const express = require('express');
const router = express.Router();
const todoServices = require('../../services/todo');
const { check, validationResult } = require('express-validator');

router.post('/', async (req, res) => {
    // TODO: check title existence
    const title = req.body.title;
    const userId = req.user._id;

    try {
        await todoServices.create(userId, title)
    } catch (e) {
        throw e;
    }

    res.status(201).end('Created');
});


router.get('/', async (req, res) => {
    const userId = req.user._id;
    let todos = [];

    try {
        todos = await todoServices.getAll(userId);
    } catch (e) {
        throw e
    }

    res.json(todos);
});


router.put('/:id', async (req, res) => {
    const userId = req.user._id;
    const todoId = req.params.id;
    const fields = req.body;

    try {
        await todoServices.update(userId, todoId, fields);
    } catch (e) {
        throw e
    }

    res.end('Updated', todo);
});


router.delete('/:id', async (req, res) => {
    const todoId = req.params.id;
    const userId = req.user._id;

    try {
        await todoServices.removeById(userId, todoId);
    } catch (e) {
        throw e
    }

    res.end('Removed');
});

module.exports = router;
