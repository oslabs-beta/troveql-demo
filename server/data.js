const Movie = require('../database/models/movieModel');
const Actor = require('../database/models/actorModel');
const ActorinMovies = require('../database/models/movie_actorModel');

// Creating new instances of movies to PostgreSQL
const testMovies = [
  {title: 'Pulp Fiction', genre: 'Crime', year: 1994},
  {title: 'The Godfather', genre: 'Drama' , year: 1972},
  {title: 'The Dark Knight', genre: 'Action', year: 2008},
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

// example of output: 
// [
  // {
  //   id: 7,
  //   title: 'Forrest Gump',
  //   genre: 'Drama',
  //   year: 1994,
  //   actors: [ 
      // {
//       id: 2,
//       name: 'Leonardo DiCaprio',
//       gender: 'Male',
//       place_of_birth: 'USA',
//       createdAt: 2023-03-25T23:57:39.571Z,
//       updatedAt: 2023-03-25T23:57:39.571Z,
//       movie_actor: [movie_actor]
//     },
    //  ]
  // },
  // {
  //   id: 9,
  //   title: 'Titanic',
  //   genre: 'Romance',
  //   year: 1997,
  //   actors: [ [Object], [Object] ]
  // },
// ]

const getMovies = async () => {
  try {
    const movies = await Movie.findAll({
      attributes: ['id', 'title', 'genre', 'year'],
      include: [{
        model: Actor,
        through: {
          model: ActorinMovies,
          attributes: ['id']
        },
        required: false,
      }]
    });
    const allMovies = [];
    movies.forEach(movie => {
      // refine actor.dataValues.movies list
      const actorList = [];
      const arrayOfActors = movie.dataValues.actors;
      arrayOfActors.forEach(actor => actorList.push(actor.dataValues));
      movie.dataValues.actors = actorList;
      // push movie.dataValues object to allMovies
      allMovies.push(movie.dataValues);
    })
    // console.log(allMovies);
    console.log('Got all movies from db')
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
    console.log('Got a movie from db');
    // console.log('singleMovie', movie.dataValues);
    return movie.dataValues;
  } catch (error) {
    console.error(error);
    return;
  }
}

// getMovie(3);


// Getting all actors with movie they are in
// example output of data:
// [
//   {
//     name: 'Tom Hanks',
//     gender: 'Male',
//     place_of_birth: 'USA',
//     movies: [{
    //   id: 7,
    //   title: 'Forrest Gump',
    //   genre: 'Drama',
    //   year: 1994,
    //   createdAt: 2023-03-25T23:24:21.012Z,
    //   updatedAt: 2023-03-25T23:24:21.012Z,
    //   movie_actor: movie_actor {
    //     dataValues: [Object],
    //     _previousDataValues: [Object],
    //     uniqno: 1,
    //     _changed: Set(0) {},
    //     _options: [Object],
    //     isNewRecord: false
    //   }
    // }]
//   },
//   {
//     name: 'Leonardo DiCaprio',
//     gender: 'Male',
//     place_of_birth: 'USA',
//     movies: []
//   }
// ]

const getActors = async () => {
  try {
    const actors = await Actor.findAll({
      attributes: ['id', 'name', 'gender', 'place_of_birth'],
      include: [{
        model: Movie,
        through: {
          model: ActorinMovies,
          attributes: ['movie_id']
        },
        required: false,
      }]
    });
    // console.log(actors);
    const allActors = [];
    actors.forEach(actor => {
      // refine actor.dataValues.movies list
      const movieList = [];
      const arrayOfMovies = actor.dataValues.movies;
      arrayOfMovies.forEach(movie => movieList.push(movie.dataValues));
      actor.dataValues.movies = movieList;
      // push actor.dataValues object to allActors
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


const getActorsFromMovieID = async (id) => {
  try {
    const actors = await Actor.findAll({
      attributes: ['id', 'name', 'gender', 'place_of_birth'],
      include: [{
        model: Movie,
        through: {
          model: ActorinMovies,
          where: {
            movie_id: id,
          }
        },
        required: true,
      }]
    });
    console.log('Got actors for a movie from db');
    const allActors = [];
    actors.forEach(actor => {
      // refine actor.dataValues.movies list
      const movieList = [];
      const arrayOfMovies = actor.dataValues.movies;
      arrayOfMovies.forEach(movie => movieList.push(movie.dataValues));
      actor.dataValues.movies = movieList;
      // push actor.dataValues object to allActors
      allActors.push(actor.dataValues);
    })
    return allActors;
  } catch (error) {
    console.error(error);
    return;
  }
}

// getActorsFromMovieID(9);


// Adding a movie to movie list
const addMovie = async (title) => {
  const addMovie = await Movie.create({
    title: title,
  });
  console.log('addMovie', addMovie);
  return;
}

// addMovie('test');




// Updating ratings of a movie from a user
// const updateRating = async () => {
//   const rate = await User.update({rating: 95}, {
//     where: {
//       username: 'oreo',
//       movie_id: 2,
//     }
//   });
//   console.log(rate);
//   return;
// }

// updateRating();


// Deleting a movie from a user's movie list 
const deleteMovie = async (id) => {
  const itemDestroyed = await Movie.destroy({
    where: {
      id: id,
    }
  });
  console.log(itemDestroyed);
  return;
}

// deleteMovie(11);

module.exports = { getMovies, getMovie, getActorsFromMovieID, addMovie, deleteMovie };


