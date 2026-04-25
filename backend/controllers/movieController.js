const axios = require('axios');

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_API_KEY;

exports.getMovies = async (req, res) => {
    try {
        const { type } = req.params; // trending, popular, top_rated
        let endpoint = '';
        
        switch(type) {
            case 'trending':
                endpoint = '/trending/movie/week';
                break;
            case 'popular':
                endpoint = '/movie/popular';
                break;
            case 'top_rated':
                endpoint = '/movie/top_rated';
                break;
            default:
                return res.status(400).json({ message: 'Invalid movie type' });
        }

        const response = await axios.get(`${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching movies:', error.message);
        res.status(500).json({ message: 'Error fetching from TMDB' });
    }
};

exports.searchMovies = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ message: 'Query is required' });
        }
        const response = await axios.get(`${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error searching movies' });
    }
};

exports.getMovieDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=videos`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching movie details' });
    }
};

exports.discoverMovies = async (req, res) => {
    try {
        const { genre, year, rating } = req.query;
        let url = `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}`;
        
        if (genre) url += `&with_genres=${genre}`;
        if (year) url += `&primary_release_year=${year}`;
        if (rating) url += `&vote_average.gte=${rating}`;

        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error discovering movies' });
    }
};
