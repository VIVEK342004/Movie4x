const express = require('express');
const router = express.Router();
const axios = require('axios');

// Bypass SSL errors caused by local firewalls for outgoing TMDB requests
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Middleware to check auth (Optional for basic movie viewing, but good to have)
const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET || 'supersecretmovie4xkey');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

const GENRE_MAP = {
  'action': 28,
  'comedy': 35,
  'horror': 27,
  'animation': 16
};

// @route   GET /api/movies/poster-image/:title
// @desc    Proxy to fetch TMDB image data and bypass firewall
router.get('/poster-image/:title', async (req, res) => {
  try {
    const { title } = req.params;
    const API_KEY = process.env.TMDB_API_KEY || '15d2ea6d0dc1d476efbca3eba2428bab';
    
    // 1. Fetch poster path
    const searchRes = await axios.get(`${TMDB_BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(title)}`);
    
    if (searchRes.data.results && searchRes.data.results.length > 0 && searchRes.data.results[0].poster_path) {
      const posterPath = searchRes.data.results[0].poster_path;
      const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
      
      // 2. Fetch binary image data
      const imageRes = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      
      // 3. Send image data back to frontend
      res.set('Content-Type', 'image/jpeg');
      return res.send(imageRes.data);
    } else {
      return res.status(404).send('Poster not found');
    }
  } catch (err) {
    console.error("TMDB Proxy Error:", err.message);
    return res.status(500).send('Error fetching image');
  }
});

// @route   GET /api/movies/:category
// @desc    Get movies by category
router.get('/:category', async (req, res) => {
  const { category } = req.params;

  if (category === 'search') {
    try {
      const { query } = req.query;
      if (!query) return res.json([]);
      
      if (TMDB_API_KEY) {
        const response = await axios.get(`${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`);
        return res.json(response.data.results);
      } else {
        const all = getMockMovies('all');
        const filtered = all.filter(m => m.title.toLowerCase().includes(query.toLowerCase()));
        return res.json(filtered);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  // Handle genres
  try {
    if (TMDB_API_KEY && GENRE_MAP[category]) {
      const response = await axios.get(`${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${GENRE_MAP[category]}`);
      res.json(response.data.results);
    } else {
      // Fallback to mock data if no TMDB API key or genre not mapped
      res.json(getMockMovies(category));
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching movies' });
  }
});

// Mock Data Fallback function
function getMockMovies(category) {
  // Use the same mock dataset from movies.js here
  const movies = [
    { id: 1, title: "John Wick: Chapter 4", genre: "Action", year: 2023, rating: "7.7", description: "John Wick uncovers a path to defeating The High Table...", poster: "images/john_wick_4_poster.jpg", backdrop: "images/john_wick_4_backdrop.jpg" },
    { id: 7, title: "Superbad", genre: "Comedy", year: 2007, rating: "7.6", description: "Two co-dependent high school seniors are forced to deal with separation anxiety...", poster: "images/superbad_poster.jpg", backdrop: "images/superbad_backdrop.jpg" },
    { id: 13, title: "Get Out", genre: "Horror", year: 2017, rating: "7.7", description: "A young African-American visits his white girlfriend's parents for the weekend...", poster: "images/get_out_poster.jpg", backdrop: "images/get_out_backdrop.jpg" },
    { id: 19, title: "Spider-Man: Across the Spider-Verse", genre: "Animation", year: 2023, rating: "8.7", description: "Miles Morales catapults across the Multiverse...", poster: "images/spiderverse_poster.jpg", backdrop: "images/spiderverse_backdrop.jpg" }
    // A simplified version for mock fallback since the frontend already handles it if backend fails
  ];
  
  if (category === 'action') return movies.filter(m => m.genre === 'Action');
  if (category === 'comedy') return movies.filter(m => m.genre === 'Comedy');
  if (category === 'horror') return movies.filter(m => m.genre === 'Horror');
  if (category === 'animation') return movies.filter(m => m.genre === 'Animation');
  
  return movies;
}

module.exports = router;
