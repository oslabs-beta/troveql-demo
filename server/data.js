const Movie = require('../database/models/movieModel');
const Actor = require('../database/models/actorModel');
const ActorinMovies = require('../database/models/movie_actorModel');
const sequelize = require('sequelize');

// Creating new instances of movies to PostgreSQL
// const testMovies = [
//   { title: 'Pulp Fiction', genre: 'Crime', year: 1994 },
//   { title: 'The Godfather', genre: 'Drama', year: 1972 },
//   { title: 'The Dark Knight', genre: 'Action', year: 2008 },
//   { title: 'The Lord of the Rings', genre: 'Fantasy', year: 2003 },
//   { title: 'The Matrix', genre: 'Action', year: 1999 },
//   { title: 'Forrest Gump', genre: 'Drama', year: 1994 },
//   { title: 'Star Wars', genre: 'Fiction', year: 1977 },
//   { title: 'Titanic', genre: 'Romance', year: 1997 },
//   { title: 'Jurassic Park', genre: 'Adventure', year: 1993 },
// ];

// UNCOMMENT THE FOLLOWING CODES TO CREATE MOVIES
// Movie.bulkCreate(testMovies)
//   .then(() => {
//     console.log('Movies created successfully');
//   })
//   .catch((error) => {
//     console.error('Error creating movies', error);
//   })

// Creating new instances of actors to PostgreSQL
// const testActors = [
//   { name: 'Tom Hanks', gender: 'Male', place_of_birth: 'USA' },
//   { name: 'Leonardo DiCaprio', gender: 'Male', place_of_birth: 'USA' },
//   { name: 'Kate Winslet', gender: 'Female', place_of_birth: 'USA' },
//   { name: 'Morgan Freeman', gender: 'Male', place_of_birth: 'USA' },
//   { name: 'Cate Blanchett', gender: 'Male', place_of_birth: 'USA' },
//   { name: 'Uma Thurman', gender: 'Female', place_of_birth: 'USA' },
//   { name: 'Carrie-Anne Moss', gender: 'Female', place_of_birth: 'Canada' },
// ];

// UNCOMMENT THE FOLLOWING CODES TO CREATE ACTORS
// Actor.bulkCreate(testActors)
//   .then(() => {
//     console.log('Actors created successfully');
//   })
//   .catch((error) => {
//     console.error('Error creating actors', error);
//   })

// const testMA = [
//   { movie_id: 129, actor_id: 2 },
//   { movie_id: 130, actor_id: 3 },
//   { movie_id: 128, actor_id: 5 },
//   { movie_id: 128, actor_id: 6 },
//   { movie_id: 130, actor_id: 7 },
// ];

// UNCOMMENT THE FOLLOWING CODES TO CREATE ACTORS IN JOIN TABLE
// ActorinMovies.bulkCreate(testMA)
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
    // for new users, // if actor table is empty,
      // add actors to actors table, if not, do nothing
      // add movies to movies table, if not, do nothing
      // add movie and actor to join table
    const actorCount = await Actor.count();
    const testActors = [
      { name: 'Tom Hanks', gender: 'Male', place_of_birth: 'USA' },
      { name: 'Leonardo DiCaprio', gender: 'Male', place_of_birth: 'USA' },
      { name: 'Kate Winslet', gender: 'Female', place_of_birth: 'USA' },
      { name: 'Morgan Freeman', gender: 'Male', place_of_birth: 'USA' },
      { name: 'Cate Blanchett', gender: 'Male', place_of_birth: 'USA' },
      { name: 'Uma Thurman', gender: 'Female', place_of_birth: 'USA' },
      { name: 'Carrie-Anne Moss', gender: 'Female', place_of_birth: 'Canada' },
    ];
    const testMovies = [
      { title: 'Pulp Fiction', genre: 'Crime', year: 1994 },
      { title: 'The Godfather', genre: 'Drama', year: 1972 },
      { title: 'The Dark Knight', genre: 'Action', year: 2008 },
      { title: 'The Lord of the Rings', genre: 'Fantasy', year: 2003 },
      { title: 'The Matrix', genre: 'Action', year: 1999 },
      { title: 'Forrest Gump', genre: 'Drama', year: 1994 },
      { title: 'Star Wars', genre: 'Fiction', year: 1977 },
      { title: 'Titanic', genre: 'Romance', year: 1997 },
      { title: 'Jurassic Park', genre: 'Adventure', year: 1993 },
    ];

    if (actorCount === 0) {
      await Actor.bulkCreate(testActors);
      await Movie.bulkCreate(testMovies);

      // add join table back in via movie title
      const movie1 = await Movie.findOne({ where: { title: 'Forrest Gump' } });
      const movie2 = await Movie.findOne({ where: { title: 'Pulp Fiction' } });
      const movie3 = await Movie.findOne({ where: { title: 'Titanic' } });
      const movie4 = await Movie.findOne({ where: { title: 'Titanic' } });
      const movieArr = [movie1, movie2, movie3, movie4];

      const actor1 = await Actor.findOne({ where: {name: 'Morgan Freeman'} });
      const actor2 = await Actor.findOne({ where: {name: 'Uma Thurman'} });
      const actor3 = await Actor.findOne({ where: {name: 'Leonardo DiCaprio'} });
      const actor4 = await Actor.findOne({ where: {name: 'Kate Winslet'} });
      const actorArr = [actor1, actor2, actor3, actor4]

      const testMA = [];

      for (let i = 0; i < 4; i++) {
        testMA.push({
          movie_id: movieArr[i].dataValues.id,
          actor_id: actorArr[i].dataValues.id
        })
      }

      await ActorinMovies.bulkCreate(testMA);

    } else if (actorCount !== 0) {
      await ActorinMovies.destroy({ where: {} });
      await Movie.destroy({ where: {} });
      await Movie.bulkCreate(testMovies);
      // add join table back in via movie title
      const movie1 = await Movie.findOne({ where: { title: 'Forrest Gump' } });
      const movie2 = await Movie.findOne({ where: { title: 'Pulp Fiction' } });
      const movie3 = await Movie.findOne({ where: { title: 'Titanic' } });
      const movie4 = await Movie.findOne({ where: { title: 'Titanic' } });
      const movieArr = [movie1, movie2, movie3, movie4];

      const actor1 = await Actor.findOne({ where: {name: 'Morgan Freeman'} });
      const actor2 = await Actor.findOne({ where: {name: 'Uma Thurman'} });
      const actor3 = await Actor.findOne({ where: {name: 'Leonardo DiCaprio'} });
      const actor4 = await Actor.findOne({ where: {name: 'Kate Winslet'} });
      const actorArr = [actor1, actor2, actor3, actor4]

      const testMA = [];

      for (let i = 0; i < 4; i++) {
        testMA.push({
          movie_id: movieArr[i].dataValues.id,
          actor_id: actorArr[i].dataValues.id
        })
      }

      await ActorinMovies.bulkCreate(testMA);
    }

    const movies = await Movie.findAll({
      attributes: ['id', 'title', 'genre', 'year'],
      include: [
        {
          model: Actor,
          through: {
            model: ActorinMovies,
            attributes: ['id'],
          },
          required: false,
        },
      ],
    });
    const allMovies = [];
    movies.forEach((movie) => {
      // refine actor.dataValues.movies list
      const actorList = [];
      const arrayOfActors = movie.dataValues.actors;
      arrayOfActors.forEach((actor) => actorList.push(actor.dataValues));
      movie.dataValues.actors = actorList;
      // push movie.dataValues object to allMovies
      allMovies.push(movie.dataValues);
    });
    // console.log(allMovies);
    console.log('Got all movies from db');
    return allMovies;
  } catch (error) {
    console.error(error);
    return;
  }
};

// getMovies();

// Getting a movie's detail
const getMovie = async (id) => {
  try {
    const movie = await Movie.findOne({
      where: {
        id: id,
      },
    });
    console.log('Got a movie from db');
    // console.log('singleMovie', movie.dataValues);
    return movie.dataValues;
  } catch (error) {
    console.error(error);
    return;
  }
};

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
      include: [
        {
          model: Movie,
          through: {
            model: ActorinMovies,
            attributes: ['movie_id'],
          },
          required: false,
        },
      ],
    });
    // console.log(actors);
    const allActors = [];
    actors.forEach((actor) => {
      // refine actor.dataValues.movies list
      const movieList = [];
      const arrayOfMovies = actor.dataValues.movies;
      arrayOfMovies.forEach((movie) => movieList.push(movie.dataValues));
      actor.dataValues.movies = movieList;
      // push actor.dataValues object to allActors
      allActors.push(actor.dataValues);
    });
    console.log(allActors);
    return allActors;
  } catch (error) {
    console.error(error);
    return;
  }
};

// getActors();

const getActorsFromMovieID = async (id) => {
  try {
    const actors = await Actor.findAll({
      attributes: ['id', 'name', 'gender', 'place_of_birth'],
      include: [
        {
          model: Movie,
          through: {
            model: ActorinMovies,
            where: {
              movie_id: id,
            },
          },
          required: true,
        },
      ],
    });
    console.log('Got actors for a movie from db');
    const allActors = [];
    actors.forEach((actor) => {
      // refine actor.dataValues.movies list
      const movieList = [];
      const arrayOfMovies = actor.dataValues.movies;
      arrayOfMovies.forEach((movie) => movieList.push(movie.dataValues));
      actor.dataValues.movies = movieList;
      // push actor.dataValues object to allActors
      allActors.push(actor.dataValues);
    });
    console.log(allActors);
    return allActors;
  } catch (error) {
    console.error(error);
    return;
  }
};

// getActorsFromMovieID(9);

// Adding a movie to movie list
const addMovie = async (title) => {
  const addMovie = await Movie.create({
    title: title,
  });
  console.log('addMovie', addMovie.dataValues);
  return addMovie.dataValues;
};

// addMovie('test');

// Deleting a movie from a user's movie list
// Deleting movie_id row also from join table
const deleteMovie = async (id) => {
  try {
    //first find the movie and await the result, then destroy
    //return the result of the find querey;
    //shape should be similar to add movie

    /**
     *     id: ID!
           title: String!
           genre: String
           year: Int
          actors: [Actor]
     */
    // Find the movie to delete
    const movieToDelete = await Movie.findOne({
      where: {
        id: id,
      },
    });

    console.log('MOVIE TO DELETE IN DATA.JS', movieToDelete);

    if (!movieToDelete) {
      console.log(`Movie with id ${id} not found`);
      return;
    }

    // Delete the movie from join table first
    const movieInJoinTable = await ActorinMovies.destroy(
      { 
        where: { 
          movie_id: id,
        } 
    });
    
    if (movieInJoinTable === 0) {
      console.log(`Movie with id ${id} is not found in movie_actor join table`);
    }
    
    // Delete the movie from the database
    await Movie.destroy({
      where: {
        id: id,
      },
    });

    console.log(movieToDelete);
    return movieToDelete;
    console.log(`Movie with id ${id} deleted from db`);
  } catch (error) {
    console.error(error);
  }
};

// deleteMovie(14);


// Editing a movie 
const editMovie = async (id, title) => {
  try {
    // Find the movie to edit
    const movieToEdit = await Movie.findOne({
      where: {
        id: id,
      },
    });
    console.log('MOVIE TO EDIT IN DATA.JS', movieToEdit);
    if (!movieToEdit) {
      console.log(`Movie with id ${id} not found`);
      return;
    }
    // Edit the movie in the database
    console.log('THIS IS THE NEW TITLE', title)
    const updatedMovie = await Movie.update(
      {title: title },
      {returning: true, where: {id: id}}
    );
    console.log('UPDATED MOVIE', updatedMovie)
    return updatedMovie[1][0];
  } catch (error) {
    console.error(error);
  }
};


// Reset movies 
  // Delete all movies
  // Create default movies
  // Add movies to join table with actors

const resetMovie = async () => {
  try {
    // delete all join table rows
    // delete all movies
    await Movie.destroy({ 
      where: {},
      truncate: {
        cascade: true
      }
    });

    // add default movies
    const testMovies = [
      { title: 'Pulp Fiction', genre: 'Crime', year: 1994 },
      { title: 'The Godfather', genre: 'Drama', year: 1972 },
      { title: 'The Dark Knight', genre: 'Action', year: 2008 },
      { title: 'The Lord of the Rings', genre: 'Fantasy', year: 2003 },
      { title: 'The Matrix', genre: 'Action', year: 1999 },
      { title: 'Forrest Gump', genre: 'Drama', year: 1994 },
      { title: 'Star Wars', genre: 'Fiction', year: 1977 },
      { title: 'Titanic', genre: 'Romance', year: 1997 },
      { title: 'Jurassic Park', genre: 'Adventure', year: 1993 },
    ];

    await Movie.bulkCreate(testMovies);

    // add join table back in via movie title
    const movie1 = await Movie.findOne({ where: { title: 'Forrest Gump' } });
    const movie2 = await Movie.findOne({ where: { title: 'Pulp Fiction' } });
    const movie3 = await Movie.findOne({ where: { title: 'Titanic' } });
    const movie4 = await Movie.findOne({ where: { title: 'Titanic' } });
    const movieArr = [movie1, movie2, movie3, movie4];

    const actor1 = await Actor.findOne({ where: {name: 'Morgan Freeman'} });
    const actor2 = await Actor.findOne({ where: {name: 'Uma Thurman'} });
    const actor3 = await Actor.findOne({ where: {name: 'Leonardo DiCaprio'} });
    const actor4 = await Actor.findOne({ where: {name: 'Kate Winslet'} });
    const actorArr = [actor1, actor2, actor3, actor4];

    const testMA = [];

    for (let i = 0; i < 4; i++) {
      testMA.push({
        movie_id: movieArr[i].dataValues.id,
        actor_id: actorArr[i].dataValues.id
      })
    }
    
    await ActorinMovies.bulkCreate(testMA);
    
    // return movie list
    const movies = await Movie.findAll({
      attributes: ['id', 'title'],
      include: [
        {
          model: Actor,
          through: {
            model: ActorinMovies,
            attributes: ['id'],
          },
          required: false,
        },
      ],
    });
    const allMovies = [];
    movies.forEach((movie) => {
      // refine actor.dataValues.movies list
      const actorList = [];
      const arrayOfActors = movie.dataValues.actors;
      arrayOfActors.forEach((actor) => actorList.push(actor.dataValues));
      movie.dataValues.actors = actorList;
      // push movie.dataValues object to allMovies
      allMovies.push(movie.dataValues);
    });

    console.log('allMovies', movies);
    console.log('Reset all movies from db');
    return allMovies;
  } catch (error) {
    console.error(error);
  }

};





module.exports = {
  getMovies,
  getMovie,
  getActorsFromMovieID,
  addMovie,
  deleteMovie,
  editMovie,
  resetMovie,
};
