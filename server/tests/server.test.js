const expect = require('expect'),
    request = require('supertest');

const { app } = require('./../server');

const { Todo } = require('./../models/todo');

let todoItem = [{
    text: 'First test todo'
}, {
    text: 'second test todo'
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todoItem);
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
            // .expect((res) => {
            //     expect(res.body.todoItem.length).toBe(2)
            // })
            .end(done)
    })
})