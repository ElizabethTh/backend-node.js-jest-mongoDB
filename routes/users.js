const { User, validate } = require('../models/user');
const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');
const app = express();
app.use(express.json());


app.use(session({
    secret: 'secretKey123',
    cookie: {
        maxAge: 3000
    },
    saveUninitialized: false
}))

app.post('/', async (req, res) => {
    // First Validate The Request
    let enteredEmail = req.body.email;
    let user = await User.findOne({ email: enteredEmail });
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    } else if (user) {
        return res.status(400).send('That user already exists');
    } else {
        user = new User({
            email: req.body.email,
            password: req.body.password
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        req.session.user = user;
        req.session.authenticated = true;
        await user.save();
        res.status(200).send(user);
    }
})

app.post('/signin', async (req, res) => {
    // First Validate The Request
    let user = await User.findOne({ email: req.body.email });
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    } else if (user) {
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (validPassword) {
            return res.status(201).send('Successfully logged In');
        } else {
            return res.status(400).send('Incorrect password.');
        }
    } else {
        return res.status(400).send('Usernot exist! Signup now');
    }
})

module.exports = app;