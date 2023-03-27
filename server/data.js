// const db = {
//   movies: [
//   { title: 'Titanic', director: 'James Cameron' },
//   { title: 'Jurassic Park', director: 'Steven Spielberg' },
//   { title: 'Harry Potter', director: 'Chris Columbus' },
//   ],
// };

// module.exports = { db };


const Movie = require('../database/models/movieModel');
const Actor = require('../database/models/actorModel');
const movieActors = require('../database/models/movie_actorModel');

// Creating new instances of movies to PostgreSQL
const testMovies = [
  {title: 'Pulp Fiction', genre: 'Crime', year: 1994},
  {title: 'The Godfather', genre: 'Drama' , year: 1972},
  {title: 'The Dark Knight', genre: 'Action', year: 2008},
  {title: 'Pulp Fiction', genre: 'Crime', year: 1994},
  {title: 'The Lord of the Rings', genre: 'Fantasy', year: 2003},
  {title: 'The Matrix', genre: 'Action', year: 1999},
  {title: 'Forrest Gump', genre: 'Drama', year: 1994},
  {title: 'Star Wars', genre: 'Fiction', year: 1977},
  {title: 'Titanic', genre: 'Romance', year: 1997},
  {title: 'Jurassic Park', genre: 'Adventure', year: 1993},
];

// UNCOMMENT THE FOLLOWING CODES TO CREATE MOVIES
// Movie.bulkCreate(testMovies)
//   .then(() => {
//     console.log('Movies created successfully');
//   })
//   .catch((error) => {
//     console.error('Error creating movies', error);
//   })

// Creating new instances of actors to PostgreSQL
const testActors = [
  {name: "Tom Hanks", gender: "Male", place_of_birth: "USA"},
  {name: "Leonardo DiCaprio", gender: "Male", place_of_birth: "USA"},
  {name: "Kate Winslet", gender: "Female", place_of_birth: "USA"},
  {name: "Morgan Freeman", gender: "Male", place_of_birth: "USA"},
  {name: "Cate Blanchett", gender: "Male", place_of_birth: "USA"},
  {name: "Uma Thurman", gender: "Female", place_of_birth: "USA"},
  {name: "Carrie-Anne Moss", gender: "Female", place_of_birth: "Canada"}
];

// UNCOMMENT THE FOLLOWING CODES TO CREATE ACTORS
// Actor.bulkCreate(testActors)
//   .then(() => {
//     console.log('Actors created successfully');
//   })
//   .catch((error) => {
//     console.error('Error creating actors', error);
//   })


const testMA = [
  {movie_id: 7, actor_id: 1},  
  {movie_id: 9, actor_id: 2},
  {movie_id: 9, actor_id: 3},
];

// UNCOMMENT THE FOLLOWING CODES TO CREATE ACTORS
// movieActors.bulkCreate(testMA)
//   .then(() => {
//     console.log('join table data created successfully');
//   })
//   .catch((error) => {
//     console.error('Error creating actors in join table', error);
//   })


// Getting all movies
const getMovies = async () => {
  try {
    const movies = await Movie.findAll();
    const allMovies = [];
    movies.forEach(movie => {
      allMovies.push(movie.dataValues);
    })
    console.log(allMovies);
    return allMovies;
  } catch (error) {
    console.error(error);
    return;
  }
}

// getMovies();


// Getting a movie's detail
const getMovie = async (id) => {
  try {
    const movie = await Movie.findOne({
      where: {
        id: id
      }
    });
    // console.log(movie);
    console.log('singleMovie', movie.dataValues);
    return movie.dataValues;
  } catch (error) {
    console.error(error);
    return;
  }
}

// getMovie(3);


// Getting all actors
const getActors = async () => {
  try {
    const actors = await Actor.findAll(
      // include: [
      //   model: movieActors,
      //   attibutes: ['']
      // ]
    );
    const allActors = [];
    actors.forEach(actor => {
      allActors.push(actor.dataValues);
    })
    console.log(allActors);
    return allActors;
  } catch (error) {
    console.error(error);
    return;
  }
}

// getActors();



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

module.exports = { getMovies, getMovie, getActors };