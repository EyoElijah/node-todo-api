const expect = require('expect'),
    request = require('supertest');

const { ObjectID } = require('mongodb');
const { app } = require('./../server');

const { Todo } = require('./../models/todo');

let todo = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'second test todo'
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todo);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        let text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({ text }).then((todo) => {
                    expect(todo.length).toBe(1);
                    expect(todo[0].text).toBe(text);
                    done();
                }).catch((error) => {
                    done(error);
                });
            });
    });
    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todo) => {
                    expect(todo.length).toBe(2);
                    done();
                }).catch((error) => {
                    done(error);
                });
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.length).toBe(2)
            })
            .end(done)
    })
});

describe('Get /todos/:id', function() {
    it('should return todo item', function(done) {
        request(app)
            .get(`/todos/${todo[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todo[0].text);
            })
            .end(done);
    });

    it('Should return 404 if todo not found', function(done) {
        let hexId = new ObjectID().toHexString();
        request(app)
            .get(`/todo/${hexId}`)
            .expect(404)
            .end(done)
    });
    it('should return 404 for non-object ids', (done) => {
        request(app)
            .get('/todos/123abd')
            .expect(400)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        let hexId = todo[0]._id.toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.findById(hexId).then((todo) => {
                    expect(todo).toNotExist();
                    done();
                }).catch((err) => done(err));
            })

    });

    it('should return 404 if todo is not found', (done) => {
        let hexId = new ObjectID().toHexString();
        request(app)
            .delete(`/todo/${hexId}`)
            .expect(404)
            .end(done)
    });

    it('should return 404 if object id is not invalid', (done) => {
        request(app)
            .delete('/todos/123abd')
            .expect(400)
            .end(done);
    });
});