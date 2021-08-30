const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');

const { Todo } = require('./../server/models/todo');

const { User } = require('./../server/models/user');

// first option to remove a doc
Todo.remove({}).then((todo) => {
    console.log(todo);
});

// second option to remove a doc
Todo.findOneAndRemove({
    _id: "612cf3fd8b0e5217286bbe2b"
}).then((todo) => {
    console.log(todo);
});

// third option to remove a doc
Todo.findByIdAndRemove("612cf37a8b0e5217286bbde6").then((todo) => {
    console.log(todo);
});