require('./config/config');

const validator = require('validator');
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

    if(!validator.isEmail(user.email)){
        return res.status(404).send('not a valid email');
    }

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

app.get('/user/:id', (req, res) => {
    let id = req.params.id

    if(!ObjectID.isValid(id)){
        return res.status(404).send('not a valid id');
    }

    User.findById(id).then((user) => {
        if(!user){
            return res.status(404).send('id not found');
        }
        res.send({user});
    }, (e) => {
        res.status(400).send('ERROR with request');
    });
    //.catch below the same thing?
    //.catch((e) => {
    //     res.status(400).send('ERROR!');
    // });
});

app.delete('/user/:id', (req, res) => {
    let id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send('not a valid id');
    }
    User.findByIdAndRemove({_id: id}).then((user) => {
        if(!user){
            return res.status(404).send('user not found');
        }
        res.status(200).send({user});
    }).catch((e) => {
        res.status(400).send('ERROR with request');
    });
});

app.patch('/user/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['firstName', 'lastName', 'email']);

    if(!ObjectID.isValid(id)){
        return res.status(404).send('not a valid id');
    } else if (!validator.isEmail(body.email)) {
        return res.status(404).send('not a valid email');
    }

    User.findByIdAndUpdate(id, {
        $set: body
    }, {new: true}).then((user) => {
        if(!user){
            return res.status(404).send('user not found');
        }
        res.send({user});
    }).catch((e) => {
        res.status(400).send('ERROR with request');
    });
});

app.listen(port, () => {
    console.log(`started on port ${port}`);
});

module.exports = {app};





