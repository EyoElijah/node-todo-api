const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect MongoDB server');
    }
    console.log('Connected to MongoDB server');

    db.collection('Todo').findOneAndUpdate({
        _id: new ObjectID('61257522348255774ca57e3a')
    }, {
        $set: {
            completed: true,
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    db.collection('User').findOneAndUpdate({
        _id: new ObjectID('61264079e8102d17e06c8a8d')
    }, {
        $set: {
            name: 'Matthew Adeyemi',
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    // db.close();
});