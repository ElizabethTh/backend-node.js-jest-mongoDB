const { Tweets } = require('../models/tweets');
const { ObjectId } = require('mongodb');
const express = require('express');
const e = require('express');
const app = express();
app.use(express.json());

// --------------create tweets api---------------------------
app.post('/', async (req, res) => {
    try {
        const tweets = new Tweets({
            username: req.body.username,
            tweet: req.body.tweet,
            image: req.body.image,
            timeStamp: req.body.timeStamp,
        });
        const newTweet = await Tweets.create(tweets);
        res.status(201).json(newTweet);
    } catch (e) {
        res.status(500).send(e.message);
    }
})

// --------------read tweets api---------------------------
app.get('/read', async (req, res) => {
    try {
        let tweetLists = await Tweets.find({
            username: {
                "$in": req.body.username
            }
        });
        if (tweetLists.length) {
            res.status(201).json(tweetLists);
        } else {
            res.status(201).send('no tweets found');
        }
    } catch (err) {
        res.status(400).send('Error found');
    }
});



// --------------updates tweets api---------------------------
app.put('/update', async (req, res) => {
    try {
        var data = { $set: { tweet: req.body.tweet } }
        Tweets.updateOne({ _id: req.body.userId }, data, (err, collection) => {
            if (err) {
                res.status(400).send('No records to update with userId');
            } else {
                res.status(201).send('Tweet updated!');
            }
        });
    } catch (err) {
        res.status(400).send('Error found');
    }
});

// --------------delete tweets api---------------------------
app.delete('/delete', async (req, res) => {
    try {
        Tweets.deleteOne({ _id: req.body.userId }, (err, collection) => {
            if (err) {
                console.log('hereeeee')
                res.status(400).send('No records to delete with userId');
            } else {
                console.log('or hereeeee')
                res.status(201).send('Tweet deleted!');
            }
        });
    } catch (err) {
        console.log('edvolddsvs')
        res.status(400).send('Error found');
    }
});

module.exports = app;