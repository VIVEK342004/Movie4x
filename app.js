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

    // Render Movie Cards
    const renderMovies = (containerId, movieArray) => {
        const container = document.getElementById(containerId);
        container.innerHTML = ''; // Clear container

        movieArray.forEach(movie => {
            const card = document.createElement('div');
            card.classList.add('movie-card');
            card.innerHTML = `
                <img src="${movie.poster}" alt="${movie.title}" class="movie-poster" onerror="this.src='https://via.placeholder.com/200x300/1A1C23/FFFFFF?text=No+Poster'">
                <div class="movie-info">
                    <h3>${movie.title}</h3>
                    <div class="movie-info-meta">
                        <span>${movie.year}</span>
                        <span class="rating"><i data-lucide="star"></i> ${movie.rating}</span>
                    </div>
                </div>
            `;
            
            // Add click event to open modal
            card.addEventListener('click', () => openModal(movie));
            container.appendChild(card);
        });
        
        // Re-initialize icons for newly added elements
        lucide.createIcons();
    };

    // Initialize Rows
    renderMovies('trendingMovies', trendingMovies);
    renderMovies('popularMovies', popularMovies);
    renderMovies('topRatedMovies', topRatedMovies);
    renderMovies('latestMovies', latestMovies);
    renderMovies('oldMovies', oldMovies);

    // Modal Logic
    const modal = document.getElementById('movieModal');
    const closeModalBtn = document.getElementById('closeModal');

    const openModal = (movie) => {
        document.getElementById('modalTitle').textContent = movie.title;
        document.getElementById('modalRating').innerHTML = `<i data-lucide="star"></i> ${movie.rating}`;
        document.getElementById('modalYear').textContent = movie.year;
        document.getElementById('modalGenre').textContent = movie.genre;
        document.getElementById('modalDesc').textContent = movie.description;
        document.getElementById('modalCast').textContent = movie.cast.join(', ');
        document.getElementById('modalDirector').textContent = movie.director;
        
        // Set Banner Image
        const banner = document.getElementById('modalBanner');
        banner.style.backgroundImage = `url('${movie.backdrop}')`;

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

    // Search functionality (basic implementation)
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keyup', (e) => {
        const term = e.target.value.toLowerCase();
        // Since we are not on a separate search page, we could filter the rows
        // For simplicity in this demo, let's just filter the trending row based on search
        if (term) {
            const filtered = movies.filter(m => m.title.toLowerCase().includes(term));
            renderMovies('trendingMovies', filtered);
        } else {
            renderMovies('trendingMovies', trendingMovies);
        }
    });
});
