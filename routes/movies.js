const express = require('express');
const router = express.Router();
const axios = require('axios');

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

// @route   GET /api/movies/trending
// @desc    Get trending movies
router.get('/trending', async (req, res) => {
  try {
    if (TMDB_API_KEY) {
      const response = await axios.get(`${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`);
      res.json(response.data.results);
    } else {
      // Fallback to mock data if no TMDB API key
      res.json(getMockMovies('trending'));
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching movies' });
  }
});

// @route   GET /api/movies/popular
// @desc    Get popular movies
router.get('/popular', async (req, res) => {
  try {
    if (TMDB_API_KEY) {
      const response = await axios.get(`${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`);
      res.json(response.data.results);
    } else {
      res.json(getMockMovies('popular'));
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/movies/search
// @desc    Search for movies
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.json([]);
    
    if (TMDB_API_KEY) {
      const response = await axios.get(`${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`);
      res.json(response.data.results);
    } else {
      const all = getMockMovies('all');
      const filtered = all.filter(m => m.title.toLowerCase().includes(query.toLowerCase()));
      res.json(filtered);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mock Data Fallback function
function getMockMovies(category) {
  const movies = [
    {
      id: 1, title: "Interstellar Horizon", genre: "Sci-Fi", year: 2026, rating: "9.2",
      description: "A team of astronauts travels through a wormhole in search of a new habitable planet for humanity. A visually stunning and emotional journey.",
      poster: "images/poster1.png", backdrop: "images/hero_banner.png",
      cast: ["Matthew McConaughey", "Anne Hathaway"], director: "Christopher Nolan"
    },
    {
      id: 2, title: "Shadows of the City", genre: "Thriller", year: 2025, rating: "8.5",
      description: "A detective gets caught in a web of deceit while investigating a series of high-profile crimes in a neon-lit metropolis.",
      poster: "images/poster4.png", backdrop: "images/hero_banner.png",
      cast: ["Ryan Gosling", "Emma Stone"], director: "Denis Villeneuve"
    },
    {
      id: 7, title: "The Godfather", genre: "Crime", year: 1972, rating: "9.2",
      description: "The aging patriarch of an organized crime dynasty transfers control to his reluctant son.",
      poster: "images/godfather.png", backdrop: "images/hero_banner.png",
      cast: ["Marlon Brando", "Al Pacino"], director: "Francis Ford Coppola"
    }
  ];
  
  if (category === 'trending') return movies;
  if (category === 'popular') return movies.filter(m => m.rating > 8.0);
  return movies;
}

module.exports = router;
