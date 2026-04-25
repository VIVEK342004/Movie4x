const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    watchlist: [{
        movieId: String,
        title: String,
        poster_path: String,
        vote_average: Number,
        release_date: String
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
