const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // deleteMany
    // db.collection('Todo').deleteMany({
    //     text: 'Eat lunch'
    // }).then((result) => {
    //     console.log(result);
    // });

    // deleteOne
    // db.collection('Todo').deleteOne({
    //     text: 'Eat lunch'
    // }).then((result) => {
    //     console.log(result);
    // });

    // findOneAndDelete
    db.collection('Todo').findOneAndDelete({
        completed: false
    }).then((result) => {
        console.log(result);
    });
    // user collection
    db.collection('User').findOneAndDelete({
        name: 'Eyo Elijah'
    }).then((result) => {
        console.log(result);
    });

    db.collection.deleteMany({
            name: 'Eyo Elijah'
        })
        // db.close();

});