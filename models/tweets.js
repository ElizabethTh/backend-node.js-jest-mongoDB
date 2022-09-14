const { date } = require('joi');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Tweets = mongoose.model('Tweets', new Schema({
    username: {
        type: String,
        required: true
    },
    tweet: {
        type: String,
    },
    image: {
        type: String
    },
    timeStamp: {
        type: Date,
        required: true,
    }
}));
exports.Tweets = Tweets;