var express = require('express');
var router = express.Router();
var createError = require('http-errors')


const todos = [{ id: 1, name: 'Some name', completed: false }]

router.get('/', function (req, res, next) {
    res.json(todos);
});

router.get('/:id', function (req, res, next) {
    const todoFound = todos.find(todo => todo.id === Number(req.params.id))

    if (!todoFound) {
        return next(createError(404, 'Not Found'))
    }

    res.json(todoFound);
});

router.post('/', function (req, res, next) {
    const { body } = req

    if (typeof body.name !== 'string') {
        return next(createError(422, 'Validation Error'))
    }

    const newTodo = {
        id: todos.length + 1,
        name: body.name,
        completed: false
    }

    todos.push(newTodo)

    res.status(201).json(newTodo)
});

module.exports = router;
