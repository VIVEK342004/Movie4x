const fs = require('fs');
const path = require('path');

const moviesContent = fs.readFileSync('movies.js', 'utf8');
const moviesStr = moviesContent.substring(moviesContent.indexOf('['), moviesContent.indexOf('];') + 1);
const movies = eval(moviesStr);

const formatImageName = (name) => {
    return name
        .toLowerCase()
        .replace(/[:']/g, '') // Remove specific special characters
        .replace(/[^a-z0-9\s-]/g, '') // Keep alphanumeric, spaces, and dashes
        .trim()
        .replace(/\s+/g, '_'); // Replace spaces with underscores
};

movies.forEach(movie => {
    const title = movie.title;
    const oldPoster = movie.poster;
    const oldBackdrop = movie.backdrop;

    const newPosterName = `${formatImageName(title)}.jpg`;
    const newBackdropName = `${formatImageName(title)}_backdrop.jpg`;

    const oldPosterPath = path.join(__dirname, oldPoster);
    const newPosterPath = path.join(__dirname, 'images', newPosterName);
    
    if (fs.existsSync(oldPosterPath)) {
        fs.renameSync(oldPosterPath, newPosterPath);
        console.log(`Renamed ${oldPoster} to images/${newPosterName}`);
    } else {
        console.log(`Not found: ${oldPosterPath}`);
    }

    const oldBackdropPath = path.join(__dirname, oldBackdrop);
    const newBackdropPath = path.join(__dirname, 'images', newBackdropName);

    if (fs.existsSync(oldBackdropPath)) {
        fs.renameSync(oldBackdropPath, newBackdropPath);
        console.log(`Renamed ${oldBackdrop} to images/${newBackdropName}`);
    } else {
        console.log(`Not found: ${oldBackdropPath}`);
    }
});

console.log("Rename completed.");
