const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');
const { Todo } = require('./../../models/todo');
const { User } = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
let user = [{
    _id: userOneId,
    email: 'userOne@gmail.com',
    password: 'userOnePassword',
    tokens: [{
        access: 'auth',
        token: jwt.sign({ _id: userOneId, access: 'auth' }, 'abc123').toString()
    }]
}, {
    _id: userTwoId,
    email: 'userTwo@gmail.com',
    password: 'userTwoPassword',
    tokens: [{
        access: 'auth',
        token: jwt.sign({ _id: userTwoId, access: 'auth' }, 'abc123').toString()
    }]
}];

let todo = [{
    _id: new ObjectID(),
    text: 'First test todo',
    _creator: userOneId
}, {
    _id: new ObjectID(),
    text: 'second test todo',
    completed: true,
    completedAt: 323,
    _creator: userTwoId
}];


const populateTodo = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todo);
    }).then(() => done());
};

const populateUser = (done) => {
    User.remove({}).then(() => {
        let userOne = new User(user[0]).save();
        let userTwo = new User(user[1]).save();

        return Promise.all([userOne, userTwo])
    }).then(() => done());
};

module.exports = { todo, populateTodo, user, populateUser };