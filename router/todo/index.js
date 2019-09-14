const express = require('express');
const router = express.Router();
const todoServices = require('../../services/todo');

router.post('/', (req, res) => {
    todoServices.create(req.body.title, (err, todo) => {
        if (err) throw err;

        res.end('Created');
    });
});


router.get('/', (req, res) => {
    todoServices.getAll((err, todos) => {
        if (err) throw err;

        res.json(todos);
    });
});


router.get('/:id', (req, res) => {
    const id = req.params.id;

    todoServices.getById(id, (err, todo) => {
        if (err) throw err;

        res.json(todo);
    });
});


router.put('/:id', (req, res) => {
    const id = req.params.id;
    const fields = req.body;

    todoServices.updateById(id, fields, (err, todo) => {
        if (err) throw err;

        res.end('Updated' , todo);
    });
});


router.delete('/:id', (req, res) => {
    const id = req.params.id;

    todoServices.removeById(id, (err, todo) => {
        if (err) throw err;

        res.end('Removed');
    });
});


module.exports = router;
