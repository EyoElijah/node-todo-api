const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');

const { Todo } = require('./../server/models/todo');

const { User } = require('./../server/models/user');

let id = "612688894978003745dd8b9c";

if (ObjectID.isValid(id)) {
    console.log('ID not valid');
};
// console.log(ObjectID);
// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         // return console.log('id not Found');
//     }
//     console.log('Todo By Id', todo)
// }).catch((err) => {
//     console.log(err);
// });
User.find({ _id: id }).then((user) => {
    console.log(user);
});

User.findOne({ _id: id }).then((user) => {
    console.log(user);
})
User.findById(id).then((user) => {
    if (!user) {
        return console.log('User not found');
    }
    console.log(JSON.stringify(user, undefined, 2));
}).catch((err) => {
    console.log(err);
});