const { MongoClient, ObjectID } = require('mongodb');

let obj = new ObjectID();

console.log(obj);
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect MongoDB server');
    }
    console.log('Connected to MongoDB server');
    // db.collection('Todo').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to connect MongoDB server', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // })

    // db.collection('User').insertOne({

    //     name: 'Eyo Elijah',
    //     age: 76,
    //     location: 'Minna'
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to connect MongoDB server', err);
    //     }
    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
    //     console.log(result.ops);
    // });

    db.close();
});