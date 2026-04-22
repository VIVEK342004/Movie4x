const movies = [
  {
    id: 1,
    title: "Interstellar Horizon",
    genre: "Sci-Fi",
    year: 2026,
    rating: "9.2",
    description: "A team of astronauts travels through a wormhole in search of a new habitable planet for humanity. A visually stunning and emotional journey.",
    poster: "images/poster1.png",
    backdrop: "images/hero_banner.png",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    director: "Christopher Nolan"
  },
  {
    id: 2,
    title: "Shadows of the City",
    genre: "Thriller",
    year: 2025,
    rating: "8.5",
    description: "A detective gets caught in a web of deceit while investigating a series of high-profile crimes in a neon-lit metropolis.",
    poster: "images/poster4.png",
    backdrop: "images/hero_banner.png",
    cast: ["Ryan Gosling", "Emma Stone"],
    director: "Denis Villeneuve"
  },
  {
    id: 3,
    title: "The Lost Kingdom",
    genre: "Adventure",
    year: 2024,
    rating: "7.8",
    description: "An adventurous archaeologist embarks on a quest to find a legendary lost city deep within the uncharted jungle.",
    poster: "images/poster1.png",
    backdrop: "images/hero_banner.png",
    cast: ["Tom Holland", "Zendaya"],
    director: "Jon Watts"
  },
  {
    id: 4,
    title: "Neon Drift",
    genre: "Action",
    year: 2026,
    rating: "8.1",
    description: "In a futuristic city, an underground street racer must outrun a corrupt corporation to save his family.",
    poster: "images/poster4.png",
    backdrop: "images/hero_banner.png",
    cast: ["Keanu Reeves", "Charlize Theron"],
    director: "Chad Stahelski"
  },
  {
    id: 5,
    title: "Silent Echo",
    genre: "Horror",
    year: 2025,
    rating: "6.9",
    description: "A family moves into an isolated cabin only to discover that the silence around them hides a terrifying presence.",
    poster: "images/poster1.png",
    backdrop: "images/hero_banner.png",
    cast: ["Florence Pugh", "Ethan Hawke"],
    director: "Ari Aster"
  },
  {
    id: 6,
    title: "Cyber Pulse",
    genre: "Sci-Fi",
    year: 2027,
    rating: "8.8",
    description: "A rogue AI threatens to collapse the global network. Only a team of elite hackers can stop it.",
    poster: "images/poster4.png",
    backdrop: "images/hero_banner.png",
    cast: ["Oscar Isaac", "Alicia Vikander"],
    director: "Alex Garland"
  },
  {
    id: 7,
    title: "The Godfather",
    genre: "Crime",
    year: 1972,
    rating: "9.2",
    description: "The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.",
    poster: "images/godfather.png",
    backdrop: "images/hero_banner.png",
    cast: ["Marlon Brando", "Al Pacino", "James Caan"],
    director: "Francis Ford Coppola"
  },
  {
    id: 8,
    title: "Casablanca",
    genre: "Romance",
    year: 1942,
    rating: "8.5",
    description: "A cynical expatriate American cafe owner struggles to decide whether or not to help his former lover and her fugitive husband escape the Nazis in French Morocco.",
    poster: "images/casablanca.png",
    backdrop: "images/hero_banner.png",
    cast: ["Humphrey Bogart", "Ingrid Bergman"],
    director: "Michael Curtiz"
  },
  {
    id: 9,
    title: "Neon Horizon",
    genre: "Sci-Fi",
    year: 2027,
    rating: "8.6",
    description: "A visually striking look into a neon-drenched future where memories are currency.",
    poster: "images/poster1.png",
    backdrop: "images/hero_banner.png",
    cast: ["Ana de Armas", "Dev Patel"],
    director: "Bong Joon-ho"
  }
];

// Mocking backend processes to categorize movies
const trendingMovies = movies.filter(m => m.rating >= 8.5 && m.year >= 2025);
const popularMovies = movies.filter(m => m.id === 2 || m.id === 4 || m.id === 5);
const topRatedMovies = [...movies].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating)).slice(0, 3);
const latestMovies = movies.filter(m => m.year >= 2026);
const oldMovies = movies.filter(m => m.year < 2000);
