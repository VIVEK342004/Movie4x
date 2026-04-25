const User = require('../models/User');

exports.getWatchlist = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.json(user.watchlist);
    } catch (error) {
        res.status(500).json({ message: 'Server error fetching watchlist' });
    }
};

exports.addToWatchlist = async (req, res) => {
    try {
        const { movieId, title, poster_path, vote_average, release_date } = req.body;
        const user = await User.findById(req.user._id);

        const exists = user.watchlist.find(movie => movie.movieId === movieId.toString());
        if (exists) {
            return res.status(400).json({ message: 'Movie already in watchlist' });
        }

        user.watchlist.push({ movieId, title, poster_path, vote_average, release_date });
        await user.save();

        res.status(201).json(user.watchlist);
    } catch (error) {
        res.status(500).json({ message: 'Error adding to watchlist' });
    }
};

exports.removeFromWatchlist = async (req, res) => {
    try {
        const { movieId } = req.params;
        const user = await User.findById(req.user._id);

        user.watchlist = user.watchlist.filter(movie => movie.movieId !== movieId.toString());
        await user.save();

        res.json(user.watchlist);
    } catch (error) {
        res.status(500).json({ message: 'Error removing from watchlist' });
    }
};
