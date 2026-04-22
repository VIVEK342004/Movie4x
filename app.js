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
                if (endpoint === 'trending') return trendingMovies;
                if (endpoint === 'popular') return popularMovies;
                if (endpoint === 'search?query=') return [];
            }
            return [];
        }
    };

    // Render Movie Cards
    const renderMovies = (containerId, movieArray) => {
        const container = document.getElementById(containerId);
        container.innerHTML = ''; // Clear container

        if(!movieArray || movieArray.length === 0) {
            container.innerHTML = '<p style="color:#666; padding: 20px;">No movies found.</p>';
            return;
        }

        movieArray.forEach(movie => {
            const card = document.createElement('div');
            card.classList.add('movie-card');
            
            // Handle both TMDB API format and Local Mock Format
            const title = movie.title || movie.name;
            const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : movie.poster;
            const year = movie.release_date ? movie.release_date.split('-')[0] : movie.year;
            const rating = movie.vote_average ? movie.vote_average.toFixed(1) : movie.rating;

            card.innerHTML = `
                <img src="${posterPath}" alt="${title}" class="movie-poster" onerror="this.src='https://via.placeholder.com/200x300/1A1C23/FFFFFF?text=No+Poster'">
                <div class="movie-info">
                    <h3>${title}</h3>
                    <div class="movie-info-meta">
                        <span>${year}</span>
                        <span class="rating"><i data-lucide="star"></i> ${rating}</span>
                    </div>
                </div>
            `;
            
            // Add click event to open modal
            card.addEventListener('click', () => openModal(movie));
            container.appendChild(card);
        });
        
        lucide.createIcons();
    };

    // Initialize Rows asynchronously
    const initApp = async () => {
        const trending = await fetchMovies('trending');
        renderMovies('trendingMovies', trending);

        const popular = await fetchMovies('popular');
        renderMovies('popularMovies', popular);

        // For demo, we just duplicate for the others since TMDB endpoints can be added later
        renderMovies('topRatedMovies', popular.reverse());
        renderMovies('latestMovies', trending.slice(0, 5));
        renderMovies('oldMovies', trending.slice(5, 10));
    };

    initApp();

    // Modal Logic
    const modal = document.getElementById('movieModal');
    const closeModalBtn = document.getElementById('closeModal');

    const openModal = (movie) => {
        const title = movie.title || movie.name;
        const rating = movie.vote_average ? movie.vote_average.toFixed(1) : movie.rating;
        const year = movie.release_date ? movie.release_date.split('-')[0] : movie.year;
        const desc = movie.overview || movie.description;
        const backdropPath = movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : movie.backdrop;

        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalRating').innerHTML = `<i data-lucide="star"></i> ${rating}`;
        document.getElementById('modalYear').textContent = year || 'N/A';
        document.getElementById('modalGenre').textContent = movie.genre || 'Various';
        document.getElementById('modalDesc').textContent = desc || 'No description available.';
        
        // TMDB doesn't return cast/director in basic search/trending, so we mock it if missing
        document.getElementById('modalCast').textContent = movie.cast ? movie.cast.join(', ') : 'Not Available';
        document.getElementById('modalDirector').textContent = movie.director || 'Not Available';
        
        // Set Banner Image
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

    // Search functionality integrating with backend
    const searchInput = document.getElementById('searchInput');
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.trim();
        clearTimeout(searchTimeout);
        
        searchTimeout = setTimeout(async () => {
            if (term) {
                const results = await fetchMovies(`search?query=${encodeURIComponent(term)}`);
                renderMovies('trendingMovies', results);
                document.querySelector('.hero').style.display = 'none'; // hide hero when searching
                document.querySelectorAll('.movie-section').forEach((sec, idx) => {
                    if (idx > 0) sec.style.display = 'none'; // hide other rows
                });
                document.querySelector('.section-title').textContent = `Search Results for "${term}"`;
            } else {
                window.location.reload(); // reset back to normal
            }
        }, 500); // debounce
    });
});
