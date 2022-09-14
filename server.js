require("dotenv").config();
const Joi = require('joi');
const mongoose = require('mongoose');
const users = require('./routes/users');
const tweets = require('./routes/tweets');
const express = require('express');
const app = express();

mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

app.use(express.json());


//  Api for register user in the app
app.use('/api/users', users);

//  Api for SignIn to the app
app.use('/api/users/signin', users);

// Api for creating tweets
app.use('/api/tweets', tweets);

// Api for creating tweets
app.use('/api/tweets/read', tweets);

// Api for updating the tweet
app.use('/api/tweets/update', tweets);

// Api for deleting the tweet
app.use('/api/tweets/delete', tweets);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app;