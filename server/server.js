require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

let { mongoose } = require('./db/mongoose');
let { User } = require('./models/user');

let app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/user', (req, res) => {
    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    });

    user.save().then((doc) => {
        res.status(201).send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/user', (req, res) => {
    User.find().then((users) => {
        res.send({users});
    }, (e) => {
        res.status(400).send(e);
    });
});

// app.get('/todos/:id', (req, res) => {
//     let id = req.params.id
//     // res.send(req.params);
    
//     // Todo.findById({
//     //     _.id: id
//     // })

//     if(!ObjectID.isValid(id)){
//         return res.status(404).send('not a valid id');
//     }

//     Todo.findById(id).then((todo) => {
//         if(!todo){
//             return res.status(404).send('id not found');
//         }
//         res.send({todo});
//     }, (e) => {
//         res.status(400).send('ERROR!');
//     });
//     //.catch below the same thing?
//     //.catch((e) => {
//     //     res.status(400).send('ERROR!');
//     // });
// });

// app.delete('/todos/:id', (req, res) => {
//     let id = req.params.id;
//     if(!ObjectID.isValid(id)){
//         return res.status(404).send('not a valid id');
//     }
//     Todo.findByIdAndRemove({_id: id}).then((todo) => {
//         if(!todo){
//             return res.status(404).send('todo not found');
//         }
//         res.status(200).send({todo});
//     }).catch((e) => {
//         res.status(400).send('ERROR ERROR ERROR');
//     });
// });

// app.patch('/todos/:id', (req, res) => {
//     let id = req.params.id;
//     let body = _.pick(req.body, ['text', 'completed']);

//     if(!ObjectID.isValid(id)){
//         return res.status(404).send('not a valid id');
//     }

//     if(_.isBoolean(body.completed) && body.completed){
//         body.completedAt = new Date().getTime();
//     } else {
//         body.completed = false;
//         body.completedAt = null;
//     }

//     Todo.findByIdAndUpdate(id, {
//         $set: body
//     }, {new: true}).then((todo) => {
//         if(!todo){
//             return res.status(404).send();
//         }
//         res.send({todo});
//     }).catch((e) => {
//         res.status(400).send();
//     });
// })

app.listen(port, () => {
    console.log(`started on port ${port}`);
});

module.exports = {app};





