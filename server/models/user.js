let mongoose = require('mongoose');

let User = mongoose.model('User', {
    firstName: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});


// let Billy = new User({
//     email: 'example@example.com'
// });

// Billy.save().then((doc) => {
//     console.log('success', doc);
// }, (err) => {
//     console.log('failure', err);
// });

module.exports = {
    User
}


