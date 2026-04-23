// Initialize Lucide Icons
lucide.createIcons();

document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Check Auth State
    const userProfile = document.querySelector('.user-profile');
    const token = localStorage.getItem('movie4x_token');
    const userStr = localStorage.getItem('movie4x_user');

    if (token && userStr) {
        const user = JSON.parse(userStr);
        userProfile.innerHTML = `
            <div style="display:flex; align-items:center; gap: 10px; cursor:pointer;" id="userMenu">
                <img src="https://ui-avatars.com/api/?name=${user.username}&background=E50914&color=fff" alt="${user.username}">
            </div>
            <button id="logoutBtn" class="btn btn-secondary" style="display:none; position:absolute; right:4%; top:70px; padding: 8px 15px; font-size: 14px;">Logout</button>
        `;

        document.getElementById('userMenu').addEventListener('click', () => {
            const logoutBtn = document.getElementById('logoutBtn');
            logoutBtn.style.display = logoutBtn.style.display === 'none' ? 'block' : 'none';
        });

        document.getElementById('logoutBtn').addEventListener('click', () => {
            localStorage.removeItem('movie4x_token');
            localStorage.removeItem('movie4x_user');
            window.location.reload();
        });
    } else {
        userProfile.innerHTML = `<a href="login.html" class="btn btn-primary" style="padding: 8px 20px; font-size:14px;">Sign In</a>`;
    }

    const API_URL = 'http://localhost:5000/api/movies';

    // Helper: Convert movie name to a valid file name
    const formatImageName = (name) => {
        return name
            .toLowerCase()
            .replace(/[:']/g, '') // Remove specific special characters
            .replace(/[^a-z0-9\s-]/g, '') // Keep alphanumeric, spaces, and dashes
            .trim()
            .replace(/\s+/g, '_'); // Replace spaces with underscores
    };

    // Fetch Movies Function
    const fetchMovies = async (endpoint) => {
        try {
            const res = await fetch(`${API_URL}/${endpoint}`);
            if (!res.ok) throw new Error('Network response was not ok');
            const data = await res.json();
            return data;
        } catch (error) {
            console.error("Failed to fetch movies from backend, falling back to local data.", error);
            // Fallback for demo purposes if backend isn't running
            if (typeof movies !== 'undefined') {
                if (endpoint === 'action') return actionMovies;
                if (endpoint === 'comedy') return comedyMovies;
                if (endpoint === 'horror') return horrorMovies;
                if (endpoint === 'animation') return animationMovies;
                if (endpoint.startsWith('search?query=')) return [];
            }
            return [];
        }
    };

    // TMDB Poster Cache for performance optimization
    const posterCache = {};

    // Render Movie Cards
    const renderMovies = (containerId, movieArray) => {
        const container = document.getElementById(containerId);
        if (!container) return; // Prevent error if row missing
        container.innerHTML = ''; // Clear container

        if(!movieArray || movieArray.length === 0) {
            container.innerHTML = '<p style="color:#666; padding: 20px;">No movies found.</p>';
            return;
        }

        movieArray.forEach(movie => {
            const card = document.createElement('div');
            card.classList.add('movie-card');
            
            const title = movie.title || movie.name;
            const year = movie.release_date ? movie.release_date.split('-')[0] : movie.year;
            const rating = movie.vote_average ? movie.vote_average.toFixed(1) : movie.rating;

            // Generate local image path from movie name
            const localImagePath = `images/${formatImageName(title)}.jpg`;

            // Base fallback poster
            let initialPoster = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : localImagePath;
            
            // Generate a unique ID for the image to update it asynchronously
            const imgId = `poster-${Math.random().toString(36).substr(2, 9)}`;

            card.innerHTML = `
                <img id="${imgId}" src="${initialPoster}" alt="${title}" class="movie-poster" onerror="this.src='images/interstellar.jpg'">
                <div class="movie-info">
                    <h3>${title}</h3>
                    <div class="movie-info-meta">
                        <span>${year}</span>
                        <span class="rating"><i data-lucide="star"></i> ${rating}</span>
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => openModal(movie));
            container.appendChild(card);

            // Fetch dynamic poster using our Backend Proxy to bypass firewalls
            if (!movie.poster_path) {
                if (posterCache[title]) {
                    // Use cached URL
                    const img = document.getElementById(imgId);
                    if(img) img.src = posterCache[title];
                } else {
                    // Fetch from Node.js Backend Proxy (bypasses SSL errors)
                    fetch(`http://localhost:5000/api/movies/poster-image/${encodeURIComponent(title)}`)
                        .then(res => {
                            if (!res.ok) throw new Error('Proxy request failed');
                            return res.blob();
                        })
                        .then(blob => {
                            const objectURL = URL.createObjectURL(blob);
                            posterCache[title] = objectURL;
                            const img = document.getElementById(imgId);
                            if(img) img.src = objectURL;
                        })
                        .catch(err => {
                            console.warn(`Backend Proxy fetch failed for ${title}. Using local fallback.`, err);
                            posterCache[title] = initialPoster; // Cache the fallback to prevent retries
                        });
                }
            }
        });
        
        lucide.createIcons();
    };

    // Initialize Rows
    const initApp = async () => {
        renderMovies('actionMovies', await fetchMovies('action'));
        renderMovies('comedyMovies', await fetchMovies('comedy'));
        renderMovies('horrorMovies', await fetchMovies('horror'));
        renderMovies('animationMovies', await fetchMovies('animation'));
    };

    initApp();

    // Modal Logic
    const modal = document.getElementById('movieModal');
    const closeModalBtn = document.getElementById('closeModal');

    let currentModalMovie = null;
    const openModal = (movie) => {
        currentModalMovie = movie;
        const title = movie.title || movie.name;
        const rating = movie.vote_average ? movie.vote_average.toFixed(1) : movie.rating;
        const year = movie.release_date ? movie.release_date.split('-')[0] : movie.year;
        const desc = movie.overview || movie.description;
        
        // Generate local backdrop path from movie name
        const localBackdropPath = `images/${formatImageName(title)}_backdrop.jpg`;
        const backdropPath = movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : localBackdropPath;

        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalRating').innerHTML = `<i data-lucide="star"></i> ${rating}`;
        document.getElementById('modalYear').textContent = year || 'N/A';
        document.getElementById('modalGenre').textContent = movie.genre || 'Various';
        document.getElementById('modalDesc').textContent = desc || 'No description available.';
        
        document.getElementById('modalCast').textContent = movie.cast ? movie.cast.join(', ') : 'Not Available';
        document.getElementById('modalDirector').textContent = movie.director || 'Not Available';
        
        const banner = document.getElementById('modalBanner');
        banner.style.backgroundImage = `url('${backdropPath}')`;

        modal.classList.add('show');
        lucide.createIcons();
    };

    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    let searchTimeout;
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.trim();
            clearTimeout(searchTimeout);
            
            searchTimeout = setTimeout(async () => {
                if (term) {
                    const results = await fetchMovies(`search?query=${encodeURIComponent(term)}`);
                    renderMovies('actionMovies', results);
                    const hero = document.querySelector('.hero');
                    if(hero) hero.style.display = 'none';
                    document.querySelectorAll('.movie-section').forEach((sec, idx) => {
                        if (idx > 0) sec.style.display = 'none';
                    });
                    document.querySelector('.section-title').textContent = `Search Results for "${term}"`;
                } else {
                    window.location.reload();
                }
            }, 500);
        });
    }

    // Genre Filter Logic
    const genreFilter = document.getElementById('genreFilter');
    if (genreFilter) {
        genreFilter.addEventListener('change', (e) => {
            const val = e.target.value;
            const sections = {
                'Action': document.getElementById('actionMovies').parentElement,
                'Comedy': document.getElementById('comedyMovies').parentElement,
                'Horror': document.getElementById('horrorMovies').parentElement,
                'Animation': document.getElementById('animationMovies').parentElement
            };
            
            const hero = document.querySelector('.hero');
            if (val === 'all') {
                if(hero) hero.style.display = 'flex';
                Object.values(sections).forEach(sec => sec.style.display = 'block');
            } else {
                if(hero) hero.style.display = 'none';
                Object.entries(sections).forEach(([key, sec]) => {
                    sec.style.display = (key === val) ? 'block' : 'none';
                });
            }
        });
    }

    // Watchlist Logic
    const watchlistBtn = document.getElementById('watchlistBtn');
    if (watchlistBtn) {
        watchlistBtn.addEventListener('click', async () => {
            if (!token || !currentModalMovie) {
                alert('Please sign in to add to your watchlist.');
                window.location.href = 'login.html';
                return;
            }
            try {
                const res = await fetch(`http://localhost:5000/api/auth/watchlist`, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ movie: currentModalMovie })
                });
                const data = await res.json();
                if (res.ok) {
                    watchlistBtn.innerHTML = `<i data-lucide="check"></i> Added`;
                    watchlistBtn.style.backgroundColor = '#46D369';
                    lucide.createIcons();
                } else {
                    alert(data.message || 'Failed to add to watchlist.');
                }
            } catch(e) {
                console.error(e);
                watchlistBtn.innerHTML = `<i data-lucide="check"></i> Added (Demo)`;
                watchlistBtn.style.backgroundColor = '#46D369';
                lucide.createIcons();
            }
        });
    }
});