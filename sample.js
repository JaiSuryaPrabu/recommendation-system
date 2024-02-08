const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const app = express();

// Read the CSV file and store the movie data in an array
const movies = [];
fs.createReadStream('movies.csv')
  .pipe(csv())
  .on('data', (row) => {
    movies.push({ id: row.Index, name: row['Movie Name'] });
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

// Function to find movie ID by movie name
function findMovieIdByName(name) {
  const movie = movies.find((movie) => movie.name.toLowerCase() === name.toLowerCase());
  return movie ? movie.id : null;
}

// Route to handle movie search and return movie ID
app.get('/movie', (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: 'Movie name is required' });
  }

  // Find movie ID by name
  const movieId = findMovieIdByName(name);

  if (!movieId) {
    return res.status(404).json({ error: 'Movie not found' });
  }

  // Send movie ID back to the client
  res.json({ movieId });
});

// Test route to check if the server is working
app.get('/', (req, res) => {
  res.send('Server is running successfully!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
