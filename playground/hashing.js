const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

var password = '123abc!';

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     });
// });

let hashedPassword = "$2a$10$6wwUxZBjyRakatRjVsWeIutwpUQbhWSMxvqe9BfTP9ABit.oNURUO";

bcrypt.compare('password', hashedPassword, (err, result) => {
    console.log(result);
});
// let data = {
//     id: 10
// };

// let token = jwt.sign(data, '123abc');

// console.log(token)

// let decoded = jwt.verify(token, '123abc');

// console.log('decoded', decoded);

// let message = 'i am user number three';

// let harsh = SHA256(message).toString();

// console.log(`message before harsh is ${message} after harsh ${harsh}`)

// let data = {
//     id: 4
// };

// let token = {
//     data,
//     harsh: SHA256(JSON.stringify(data) + 'someSecret').toString()
// }

// // token.data.id = 5;
// // token.harsh = SHA256(JSON.stringify(token.data)).toString();



// let resultHarsh = SHA256(JSON.stringify(token.data) + 'someSecret').toString()


// if (resultHarsh === token.harsh) {
//     console.log('Data was not changed');
// } else {
//     console.log('Data was changed. Do not Trust!!');
// }