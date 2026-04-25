const express = require('express');
const router = express.Router();
const { getMovies, searchMovies, getMovieDetails, discoverMovies } = require('../controllers/movieController');

router.get('/list/:type', getMovies); // /api/movies/list/trending
router.get('/search', searchMovies);
router.get('/discover', discoverMovies);
router.get('/:id', getMovieDetails);

module.exports = router;
