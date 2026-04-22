# Movie4x - Full Stack Movie Streaming Application

Movie4x is a premium movie streaming web application built with a modern dark-themed UI (similar to Netflix), now upgraded to a fully functional full-stack architecture using Node.js, Express, MongoDB, and TMDB API integration.

## Features

*   **Responsive Dark-Themed UI:** A beautiful, cinematic interface built with HTML, CSS, and Vanilla JavaScript.
*   **User Authentication:** Secure Sign Up and Login functionality using JSON Web Tokens (JWT) and bcrypt password hashing.
*   **Dynamic Data:** Fetches trending, popular, and search results dynamically from the backend (with fallback to mock data).
*   **TMDB Integration:** Backend is set up to communicate with The Movie Database (TMDB) for real-world movie posters, trailers, and metadata.
*   **Search & Filtering:** Real-time search implementation interacting with the REST API.
*   **Interactive Modals:** Detailed movie views showcasing release dates, ratings, and descriptions.

## Tech Stack

*   **Frontend:** HTML5, CSS3 (Vanilla), JavaScript
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB
*   **Authentication:** JWT (JSON Web Tokens), bcryptjs
*   **External APIs:** TMDB (The Movie Database)

## Local Development Setup

### Prerequisites
*   [Node.js](https://nodejs.org/) installed on your machine.
*   A MongoDB database (local instance or MongoDB Atlas URI).
*   A TMDB API Key (optional, but recommended for real data).

### Installation Steps

1.  **Install Dependencies:**
    Open your terminal in the project root (`Movie9x`) and run:
    ```bash
    npm install
    ```

2.  **Environment Configuration:**
    Create a `.env` file in the root directory and add the following variables:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/movie4x  # Or your MongoDB Atlas URI
    JWT_SECRET=your_super_secret_jwt_key
    TMDB_API_KEY=your_tmdb_api_key_here
    ```

3.  **Run the Server:**
    ```bash
    npm run dev
    ```
    This will start the backend server on `http://localhost:5000` and automatically serve the frontend files.

4.  **Access the Application:**
    Open your browser and navigate to `http://localhost:5000`.

## Deployment Instructions

To deploy this full-stack application to the internet, follow these general steps:

### 1. Database Hosting (MongoDB Atlas)
If you haven't already, host your MongoDB database on MongoDB Atlas. Get your connection string (URI) to use in the deployment environment variables.

### 2. Backend Deployment (Render / Railway / Heroku)
*   Create an account on Render or Railway.
*   Connect your GitHub repository containing this code.
*   Set the **Build Command** to `npm install`.
*   Set the **Start Command** to `npm start`.
*   Crucially, add the following Environment Variables in the platform's dashboard:
    *   `MONGO_URI`
    *   `JWT_SECRET`
    *   `TMDB_API_KEY`
*   Deploy! The platform will provide you with a live URL (e.g., `https://movie4x-api.onrender.com`).

### 3. Frontend Configuration (Optional)
Currently, the backend serves the frontend statically (`app.use(express.static(__dirname));`). This means you only need to deploy the backend, and it will serve the entire website perfectly.
If you wish to separate them (e.g., frontend on Vercel, backend on Render):
1.  Update `API_URL` in `app.js` and `login.html` from `http://localhost:5000/api/...` to your live backend URL.
2.  Deploy the root directory (excluding Node backend files) to Vercel or Netlify.

## Authors
Developed as a fully functional streaming template.
