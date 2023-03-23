// const db = {
//   movies: [
//   { title: 'Titanic', director: 'James Cameron' },
//   { title: 'Jurassic Park', director: 'Steven Spielberg' },
//   { title: 'Harry Potter', director: 'Chris Columbus' },
//   ],
// };

// module.exports = { db };


const Movie = require('../database/models/movieModel');
const User = require('../database/models/userModel');

// Creating new instances of movies to PostgreSQL
// const testMovies = [
//   {movie_id: 101, title: 'Titanic', vote_count: 1000},
//   {movie_id: 102, title: 'Jurassic Park', vote_count: 1000},
//   {movie_id: 103, title: 'Harry Potter I', vote_count: 3000},
//   {movie_id: 104, title: 'Harry Potter II', vote_count: 4000},
//   {movie_id: 105, title: 'Harry Potter III'},
//   {movie_id: 106, title: 'Harry Potter IV'},
// ];

// Movie.bulkCreate(testMovies)
//   .then(() => {
//     console.log('Movies created successfully');
//   })
//   .catch((error) => {
//     console.error('Error creating movies', error);
//   })

// Creating new instances of users to PostgreSQL
// const testUsers = [
//   {movie_id: 1, rating: 65, username: 'penelope'},
//   {movie_id: 2, rating: 34, username: 'oreo'},
//   {movie_id: 1, rating: 90, username: 'lunabar'},
//   {movie_id: 3, rating: 55, username: 'oreo'},
//   {movie_id: 4, rating: 80, username: 'lunabar'},
// ];

// User.bulkCreate(testUsers)
//   .then(() => {
//     console.log('Users created successfully');
//   })
//   .catch((error) => {
//     console.error('Error creating users', error);
//   })


// Getting all movies
const getMovies = async () => {
  const movies = await Movie.findAll();
  const allMovies = [];
  movies.forEach(movie => {
    allMovies.push(movie.dataValues);
  })
  // console.log(allMovies);
  return allMovies;
}

// getMovies();


// Getting a movie's detail
const getMovie = async (movie_id) => {
  const movie = await Movie.findOne({
    where: {
      movie_id
    }
  });
  // console.log(movie);
  // console.log(movie.dataValues);
  return [movie.dataValues];
}

// getMovie();



// Updating ratings of a movie from a user
const updateRating = async () => {
  const rate = await User.update({rating: 95}, {
    where: {
      username: 'oreo',
      movie_id: 2,
    }
  });
  console.log(rate);
  return;
}

// updateRating();


// Deleting a movie from a user's movie list 
const deleteItem = async () => {
  const itemDestroyed = await User.destroy({
    where: {
      username: 'oreo',
      movie_id: 3,
    }
  });
  console.log(itemDestroyed);
  return;
}

// deleteItem();
