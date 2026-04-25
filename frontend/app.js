// Dynamically set API URL based on environment
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'http://localhost:5000/api' 
    : 'https://movie4x-backend.onrender.com/api'; // Replace with your actual deployed backend URL
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const FALLBACK_IMG = 'https://via.placeholder.com/500x750?text=No+Image';

// Authentication
function getToken() {
    return localStorage.getItem('token');
}

function getUser() {
    return JSON.parse(localStorage.getItem('user'));
}

function isLoggedIn() {
    return !!getToken();
}

function setupAuthUI() {
    const authButtons = document.getElementById('authButtons');
    const profileLink = document.getElementById('profileLink');
    const logoutBtn = document.getElementById('logoutBtn');

    if (isLoggedIn()) {
        if (authButtons) authButtons.style.display = 'none';
        if (profileLink) profileLink.style.display = 'block';
        if (logoutBtn) {
            logoutBtn.style.display = 'inline-flex';
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.reload();
            });
        }
    }
}

// Format Image
function getImageUrl(path) {
    return path ? `${IMG_BASE_URL}${path}` : FALLBACK_IMG;
}

// Generate Movie Card
function createMovieCard(movie, watchlist = []) {
    const isAdded = watchlist.find(m => m.movieId === movie.id.toString());
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
        <img class="movie-poster" src="${getImageUrl(movie.poster_path)}" alt="${movie.title}" loading="lazy">
        <button class="watchlist-btn ${isAdded ? 'added' : ''}" data-id="${movie.id}" data-title="${movie.title}" data-poster="${movie.poster_path}" data-rating="${movie.vote_average}" data-date="${movie.release_date}">
            ♥
        </button>
        <div class="movie-info">
            <h3 class="movie-title">${movie.title}</h3>
            <div class="movie-rating">⭐ ${movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</div>
        </div>
    `;

    card.addEventListener('click', (e) => {
        if(e.target.classList.contains('watchlist-btn')) return;
        window.location.href = `movie.html?id=${movie.id}`;
    });

    const btn = card.querySelector('.watchlist-btn');
    btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        if (!isLoggedIn()) {
            alert('Please login to add to watchlist');
            window.location.href = 'login.html';
            return;
        }
        
        const movieData = {
            movieId: btn.dataset.id,
            title: btn.dataset.title,
            poster_path: btn.dataset.poster !== 'null' ? btn.dataset.poster : '',
            vote_average: parseFloat(btn.dataset.rating),
            release_date: btn.dataset.date
        };

        if (btn.classList.contains('added')) {
            // Remove
            try {
                const res = await fetch(`${API_URL}/watchlist/${movieData.movieId}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${getToken()}` }
                });
                if (res.ok) btn.classList.remove('added');
            } catch (err) { console.error(err); }
        } else {
            // Add
            try {
                const res = await fetch(`${API_URL}/watchlist`, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getToken()}` 
                    },
                    body: JSON.stringify(movieData)
                });
                if (res.ok) btn.classList.add('added');
            } catch (err) { console.error(err); }
        }
    });

    return card;
}

// Fetch Watchlist
async function fetchUserWatchlist() {
    if (!isLoggedIn()) return [];
    try {
        const res = await fetch(`${API_URL}/watchlist`, {
            headers: { 'Authorization': `Bearer ${getToken()}` }
        });
        if (res.ok) return await res.json();
    } catch (err) { console.error(err); }
    return [];
}

// Load Home Page Data
async function loadHome() {
    if (!document.getElementById('trendingGrid')) return;

    const watchlist = await fetchUserWatchlist();

    const fetchAndRender = async (type, gridId) => {
        try {
            const res = await fetch(`${API_URL}/movies/list/${type}`);
            const data = await res.json();
            const grid = document.getElementById(gridId);
            grid.innerHTML = '';
            data.results.slice(0, 12).forEach(movie => {
                grid.appendChild(createMovieCard(movie, watchlist));
            });
        } catch (err) { console.error(err); }
    };

    fetchAndRender('trending', 'trendingGrid');
    fetchAndRender('popular', 'popularGrid');
    fetchAndRender('top_rated', 'topRatedGrid');

    // Load Hero
    try {
        const res = await fetch(`${API_URL}/movies/list/trending`);
        const data = await res.json();
        const heroMovie = data.results[0];
        if (heroMovie) {
            document.getElementById('heroTitle').innerText = heroMovie.title;
            document.getElementById('heroDesc').innerText = heroMovie.overview.substring(0, 150) + '...';
            document.querySelector('.hero').style.backgroundImage = `linear-gradient(to right, rgba(13,13,18,1) 10%, rgba(13,13,18,0) 80%), url('https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}')`;
            document.getElementById('heroPlayBtn').onclick = () => window.location.href = `movie.html?id=${heroMovie.id}`;
        }
    } catch (err) { console.error(err); }
}

// Search Logic
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
let searchTimeout;

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        clearTimeout(searchTimeout);
        if (!query) {
            searchResults.style.display = 'none';
            return;
        }

        searchTimeout = setTimeout(async () => {
            try {
                const res = await fetch(`${API_URL}/movies/search?query=${encodeURIComponent(query)}`);
                const data = await res.json();
                
                searchResults.innerHTML = '';
                if (data.results.length === 0) {
                    searchResults.innerHTML = '<div style="padding: 10px; text-align:center;">No results found</div>';
                } else {
                    data.results.slice(0, 5).forEach(movie => {
                        const item = document.createElement('div');
                        item.className = 'search-item';
                        item.innerHTML = `
                            <img src="${getImageUrl(movie.poster_path)}" alt="Poster">
                            <div class="search-item-info">
                                <h4>${movie.title}</h4>
                                <p>${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>
                            </div>
                        `;
                        item.onclick = () => window.location.href = `movie.html?id=${movie.id}`;
                        searchResults.appendChild(item);
                    });
                }
                searchResults.style.display = 'block';
            } catch (err) { console.error(err); }
        }, 500);
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-bar')) {
            searchResults.style.display = 'none';
        }
    });
}

// Filters Logic
async function applyFilters() {
    const genre = document.getElementById('genreFilter')?.value;
    const year = document.getElementById('yearFilter')?.value;
    const rating = document.getElementById('ratingFilter')?.value;

    if (!genre && !year && !rating) {
        // reload default
        loadHome();
        return;
    }

    let query = '?';
    if (genre) query += `genre=${genre}&`;
    if (year) query += `year=${year}&`;
    if (rating) query += `rating=${rating}&`;

    try {
        const res = await fetch(`${API_URL}/movies/discover${query}`);
        const data = await res.json();
        const grid = document.getElementById('trendingGrid'); // Replace trending with filter results
        if(grid) {
            document.getElementById('trending').innerText = 'Filter Results';
            document.getElementById('popularGrid').parentElement.style.display = 'none'; // hide others
            document.getElementById('topRatedGrid').parentElement.style.display = 'none';
            
            grid.innerHTML = '';
            if (data.results.length === 0) {
                grid.innerHTML = '<p>No results found</p>';
            } else {
                const watchlist = await fetchUserWatchlist();
                data.results.forEach(movie => {
                    grid.appendChild(createMovieCard(movie, watchlist));
                });
            }
        }
    } catch (err) { console.error(err); }
}

['genreFilter', 'yearFilter', 'ratingFilter'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', applyFilters);
});

// Login / Signup Logic
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const errDiv = document.getElementById('loginError');

        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data));
                window.location.href = 'index.html';
            } else {
                errDiv.innerText = data.message;
                errDiv.style.display = 'block';
            }
        } catch (err) { errDiv.innerText = 'Server error'; errDiv.style.display = 'block'; }
    });
}

const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('signupUsername').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const errDiv = document.getElementById('signupError');

        try {
            const res = await fetch(`${API_URL}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data));
                window.location.href = 'index.html';
            } else {
                errDiv.innerText = data.message;
                errDiv.style.display = 'block';
            }
        } catch (err) { errDiv.innerText = 'Server error'; errDiv.style.display = 'block'; }
    });
}

// Profile Page Logic
async function loadProfileData() {
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }
    const user = getUser();
    const profileUsername = document.getElementById('profileUsername');
    const profileEmail = document.getElementById('profileEmail');
    if (profileUsername) profileUsername.innerText = user.username;
    if (profileEmail) profileEmail.innerText = user.email;

    const logoutBtn = document.getElementById('profileLogoutBtn');
    if(logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = 'index.html';
        });
    }
}

async function loadWatchlist() {
    const grid = document.getElementById('watchlistGrid');
    if (!grid) return;

    const watchlist = await fetchUserWatchlist();
    grid.innerHTML = '';
    
    if (watchlist.length === 0) {
        grid.innerHTML = '<p>Your watchlist is empty.</p>';
        return;
    }

    watchlist.forEach(movie => {
        // map to match tmdb structure for createMovieCard
        const tmdbMovie = {
            id: parseInt(movie.movieId),
            title: movie.title,
            poster_path: movie.poster_path,
            vote_average: movie.vote_average,
            release_date: movie.release_date
        };
        grid.appendChild(createMovieCard(tmdbMovie, watchlist));
    });
}

// Movie Details Page Logic
async function loadMovieDetailsPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
    if (!movieId) return;

    try {
        const res = await fetch(`${API_URL}/movies/${movieId}`);
        const movie = await res.json();

        document.getElementById('detailTitle').innerText = movie.title;
        document.getElementById('detailDesc').innerText = movie.overview;
        document.getElementById('detailRating').innerText = movie.vote_average.toFixed(1);
        document.getElementById('detailPoster').src = getImageUrl(movie.poster_path);
        
        // Background
        document.body.style.backgroundImage = `linear-gradient(rgba(13,13,18,0.9), rgba(13,13,18,1)), url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundAttachment = 'fixed';

        // Trailer
        const trailer = movie.videos?.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
        if (trailer) {
            document.getElementById('detailTrailer').src = `https://www.youtube.com/embed/${trailer.key}`;
        } else {
            document.getElementById('trailerContainer').style.display = 'none';
        }

        // Watchlist Btn
        const watchlistBtn = document.getElementById('detailWatchlistBtn');
        const watchlist = await fetchUserWatchlist();
        let isAdded = watchlist.find(m => m.movieId === movie.id.toString());
        
        if (isAdded) {
            watchlistBtn.innerText = 'Remove from Watchlist';
            watchlistBtn.classList.replace('btn-primary', 'btn-outline');
        }

        watchlistBtn.addEventListener('click', async () => {
            if (!isLoggedIn()) {
                window.location.href = 'login.html';
                return;
            }

            if (isAdded) {
                // Remove
                await fetch(`${API_URL}/watchlist/${movie.id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${getToken()}` }
                });
                watchlistBtn.innerText = 'Add to Watchlist';
                watchlistBtn.classList.replace('btn-outline', 'btn-primary');
                isAdded = false;
            } else {
                // Add
                await fetch(`${API_URL}/watchlist`, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getToken()}` 
                    },
                    body: JSON.stringify({
                        movieId: movie.id,
                        title: movie.title,
                        poster_path: movie.poster_path,
                        vote_average: movie.vote_average,
                        release_date: movie.release_date
                    })
                });
                watchlistBtn.innerText = 'Remove from Watchlist';
                watchlistBtn.classList.replace('btn-primary', 'btn-outline');
                isAdded = true;
            }
        });

    } catch (err) { console.error(err); }
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    setupAuthUI();
    loadHome();
});
