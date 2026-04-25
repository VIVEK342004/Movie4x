# Movie4x

A fully functional, production-ready movie web application with Node.js, Express, MongoDB and Vanilla JS.

## Features
- User Authentication (JWT, bcrypt)
- TMDB API Integration for real-time movie data
- Interactive Watchlist (saved to MongoDB per user)
- Home page with Trending, Popular, Top Rated sections
- Real-time Search functionality with TMDB API
- Filters (Genre, Year, Rating)
- Movie Details page with YouTube Trailer embed
- Fully Responsive Modern UI with glassmorphism effects
- Graceful Image handling (fallback for null TMDB images)

## Project Structure
- `/backend`: Node.js, Express, Mongoose
- `/frontend`: HTML, CSS, JS

## Environment Variables (.env)
Create a `.env` file in the root directory:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/movie4x
JWT_SECRET=supersecretjwtkey123
TMDB_API_KEY=your_tmdb_api_key_here
```

## How to Run

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Backend Server**
   ```bash
   node backend/server.js
   ```
   The backend will run on `http://localhost:5000`.

3. **Start the Frontend**
   Use any live server (e.g., VS Code Live Server) to serve the `frontend` folder, or just double-click `frontend/index.html`.

## API Endpoints
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/movies/list/:type`
- `GET /api/movies/search?query=`
- `GET /api/movies/discover`
- `GET /api/movies/:id`
- `GET /api/watchlist` (Protected)
- `POST /api/watchlist` (Protected)
- `DELETE /api/watchlist/:movieId` (Protected)
