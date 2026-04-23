const movies = [
  // Action
  {
    id: 1,
    title: "John Wick: Chapter 4",
    genre: "Action",
    year: 2023,
    rating: "7.7",
    description: "John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.",
    poster: "images/john_wick_4_poster.jpg",
    backdrop: "images/john_wick_4_backdrop.jpg",
    cast: ["Keanu Reeves", "Donnie Yen", "Bill Skarsgård"],
    director: "Chad Stahelski"
  },
  {
    id: 2,
    title: "Mad Max: Fury Road",
    genre: "Action",
    year: 2015,
    rating: "8.1",
    description: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max.",
    poster: "images/mad_max_poster.jpg",
    backdrop: "images/mad_max_backdrop.jpg",
    cast: ["Tom Hardy", "Charlize Theron", "Nicholas Hoult"],
    director: "George Miller"
  },
  {
    id: 3,
    title: "The Dark Knight",
    genre: "Action",
    year: 2008,
    rating: "9.0",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    poster: "images/dark_knight_poster.jpg",
    backdrop: "images/dark_knight_backdrop.jpg",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    director: "Christopher Nolan"
  },
  {
    id: 4,
    title: "Gladiator",
    genre: "Action",
    year: 2000,
    rating: "8.5",
    description: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
    poster: "images/gladiator_poster.jpg",
    backdrop: "images/gladiator_backdrop.jpg",
    cast: ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen"],
    director: "Ridley Scott"
  },
  {
    id: 5,
    title: "Mission: Impossible - Fallout",
    genre: "Action",
    year: 2018,
    rating: "7.7",
    description: "Ethan Hunt and his IMF team, along with some familiar allies, race against time after a mission gone wrong.",
    poster: "images/mi_fallout_poster.jpg",
    backdrop: "images/mi_fallout_backdrop.jpg",
    cast: ["Tom Cruise", "Henry Cavill", "Ving Rhames"],
    director: "Christopher McQuarrie"
  },
  {
    id: 6,
    title: "Die Hard",
    genre: "Action",
    year: 1988,
    rating: "8.2",
    description: "An NYPD officer tries to save his wife and several others taken hostage by German terrorists during a Christmas party at the Nakatomi Plaza in Los Angeles.",
    poster: "images/die_hard_poster.jpg",
    backdrop: "images/die_hard_backdrop.jpg",
    cast: ["Bruce Willis", "Alan Rickman", "Bonnie Bedelia"],
    director: "John McTiernan"
  },

  // Comedy
  {
    id: 7,
    title: "Superbad",
    genre: "Comedy",
    year: 2007,
    rating: "7.6",
    description: "Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry.",
    poster: "images/superbad_poster.jpg",
    backdrop: "images/superbad_backdrop.jpg",
    cast: ["Jonah Hill", "Michael Cera", "Christopher Mintz-Plasse"],
    director: "Greg Mottola"
  },
  {
    id: 8,
    title: "The Hangover",
    genre: "Comedy",
    year: 2009,
    rating: "7.7",
    description: "Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing. They make their way around the city in order to find their friend before his wedding.",
    poster: "images/hangover_poster.jpg",
    backdrop: "images/hangover_backdrop.jpg",
    cast: ["Bradley Cooper", "Ed Helms", "Zach Galifianakis"],
    director: "Todd Phillips"
  },
  {
    id: 9,
    title: "Step Brothers",
    genre: "Comedy",
    year: 2008,
    rating: "6.9",
    description: "Two aimless middle-aged losers still living at home are forced against their will to become roommates when their parents marry.",
    poster: "images/step_brothers_poster.jpg",
    backdrop: "images/step_brothers_backdrop.jpg",
    cast: ["Will Ferrell", "John C. Reilly", "Mary Steenburgen"],
    director: "Adam McKay"
  },
  {
    id: 10,
    title: "21 Jump Street",
    genre: "Comedy",
    year: 2012,
    rating: "7.2",
    description: "A pair of underachieving cops are sent back to a local high school to blend in and bring down a synthetic drug ring.",
    poster: "images/21_jump_street_poster.jpg",
    backdrop: "images/21_jump_street_backdrop.jpg",
    cast: ["Jonah Hill", "Channing Tatum", "Ice Cube"],
    director: "Phil Lord, Christopher Miller"
  },
  {
    id: 11,
    title: "Deadpool",
    genre: "Comedy",
    year: 2016,
    rating: "8.0",
    description: "A fast-talking mercenary with a morbid sense of humor is subjected to a rogue experiment that leaves him with accelerated healing powers and a quest for revenge.",
    poster: "images/deadpool_poster.jpg",
    backdrop: "images/deadpool_backdrop.jpg",
    cast: ["Ryan Reynolds", "Morena Baccarin", "T.J. Miller"],
    director: "Tim Miller"
  },
  {
    id: 12,
    title: "Dumb and Dumber",
    genre: "Comedy",
    year: 1994,
    rating: "7.3",
    description: "After a woman leaves a briefcase at the airport terminal, a dumb limo driver and his dumber friend set out on a hilarious cross-country road trip to Aspen to return it.",
    poster: "images/dumb_and_dumber_poster.jpg",
    backdrop: "images/dumb_and_dumber_backdrop.jpg",
    cast: ["Jim Carrey", "Jeff Daniels", "Lauren Holly"],
    director: "Peter Farrelly"
  },

  // Horror
  {
    id: 13,
    title: "Get Out",
    genre: "Horror",
    year: 2017,
    rating: "7.7",
    description: "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.",
    poster: "images/get_out_poster.jpg",
    backdrop: "images/get_out_backdrop.jpg",
    cast: ["Daniel Kaluuya", "Allison Williams", "Bradley Whitford"],
    director: "Jordan Peele"
  },
  {
    id: 14,
    title: "A Quiet Place",
    genre: "Horror",
    year: 2018,
    rating: "7.5",
    description: "In a post-apocalyptic world, a family is forced to live in silence while hiding from monsters with ultra-sensitive hearing.",
    poster: "images/quiet_place_poster.jpg",
    backdrop: "images/quiet_place_backdrop.jpg",
    cast: ["Emily Blunt", "John Krasinski", "Millicent Simmonds"],
    director: "John Krasinski"
  },
  {
    id: 15,
    title: "The Shining",
    genre: "Horror",
    year: 1980,
    rating: "8.4",
    description: "A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence, while his psychic son sees horrific forebodings from both past and future.",
    poster: "images/the_shining_poster.jpg",
    backdrop: "images/the_shining_backdrop.jpg",
    cast: ["Jack Nicholson", "Shelley Duvall", "Danny Lloyd"],
    director: "Stanley Kubrick"
  },
  {
    id: 16,
    title: "Hereditary",
    genre: "Horror",
    year: 2018,
    rating: "7.3",
    description: "A grieving family is haunted by tragic and disturbing occurrences after the death of their secretive grandmother.",
    poster: "images/hereditary_poster.jpg",
    backdrop: "images/hereditary_backdrop.jpg",
    cast: ["Toni Collette", "Alex Wolff", "Milly Shapiro"],
    director: "Ari Aster"
  },
  {
    id: 17,
    title: "It",
    genre: "Horror",
    year: 2017,
    rating: "7.3",
    description: "In the summer of 1989, a group of bullied kids band together to destroy a shape-shifting monster, which disguises itself as a clown and preys on the children of Derry, their small Maine town.",
    poster: "images/it_poster.jpg",
    backdrop: "images/it_backdrop.jpg",
    cast: ["Bill Skarsgård", "Jaeden Martell", "Finn Wolfhard"],
    director: "Andy Muschietti"
  },
  {
    id: 18,
    title: "The Conjuring",
    genre: "Horror",
    year: 2013,
    rating: "7.5",
    description: "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.",
    poster: "images/conjuring_poster.jpg",
    backdrop: "images/conjuring_backdrop.jpg",
    cast: ["Vera Farmiga", "Patrick Wilson", "Ron Livingston"],
    director: "James Wan"
  },

  // Animation
  {
    id: 19,
    title: "Spider-Man: Across the Spider-Verse",
    genre: "Animation",
    year: 2023,
    rating: "8.7",
    description: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
    poster: "images/spiderverse_poster.jpg",
    backdrop: "images/spiderverse_backdrop.jpg",
    cast: ["Shameik Moore", "Hailee Steinfeld", "Oscar Isaac"],
    director: "Joaquim Dos Santos"
  },
  {
    id: 20,
    title: "Toy Story",
    genre: "Animation",
    year: 1995,
    rating: "8.3",
    description: "A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy's room.",
    poster: "images/toy_story_poster.jpg",
    backdrop: "images/toy_story_backdrop.jpg",
    cast: ["Tom Hanks", "Tim Allen", "Don Rickles"],
    director: "John Lasseter"
  },
  {
    id: 21,
    title: "Spirited Away",
    genre: "Animation",
    year: 2001,
    rating: "8.6",
    description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
    poster: "images/spirited_away_poster.jpg",
    backdrop: "images/spirited_away_backdrop.jpg",
    cast: ["Rumi Hiiragi", "Miyu Irino", "Mari Natsuki"],
    director: "Hayao Miyazaki"
  },
  {
    id: 22,
    title: "Up",
    genre: "Animation",
    year: 2009,
    rating: "8.3",
    description: "78-year-old Carl Fredricksen travels to Paradise Falls in his house equipped with balloons, inadvertently taking a young stowaway.",
    poster: "images/up_poster.jpg",
    backdrop: "images/up_backdrop.jpg",
    cast: ["Ed Asner", "Jordan Nagai", "John Ratzenberger"],
    director: "Pete Docter"
  },
  {
    id: 23,
    title: "The Lion King",
    genre: "Animation",
    year: 1994,
    rating: "8.5",
    description: "Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.",
    poster: "images/lion_king_poster.jpg",
    backdrop: "images/lion_king_backdrop.jpg",
    cast: ["Matthew Broderick", "Jeremy Irons", "James Earl Jones"],
    director: "Roger Allers, Rob Minkoff"
  },
  {
    id: 24,
    title: "Ratatouille",
    genre: "Animation",
    year: 2007,
    rating: "8.1",
    description: "A rat who can cook makes an unusual alliance with a young kitchen worker at a famous Paris restaurant.",
    poster: "images/ratatouille_poster.jpg",
    backdrop: "images/ratatouille_backdrop.jpg",
    cast: ["Patton Oswalt", "Ian Holm", "Lou Romano"],
    director: "Brad Bird"
  }
];

// Mocking backend processes to categorize movies
const actionMovies = movies.filter(m => m.genre === 'Action');
const comedyMovies = movies.filter(m => m.genre === 'Comedy');
const horrorMovies = movies.filter(m => m.genre === 'Horror');
const animationMovies = movies.filter(m => m.genre === 'Animation');
