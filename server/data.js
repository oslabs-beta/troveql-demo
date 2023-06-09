const Movie = require('../database/models/movieModel');
const Actor = require('../database/models/actorModel');
const ActorinMovies = require('../database/models/movie_actorModel');

// Get all movies
const getMovies = async () => {
  try {
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
      const actorList = [];
      const arrayOfActors = movie.dataValues.actors;
      arrayOfActors.forEach((actor) => actorList.push(actor.dataValues));
      movie.dataValues.actors = actorList;
      // push movie.dataValues object to allMovies
      allMovies.push(movie.dataValues);
    });
    return allMovies;
  } catch (error) {
    console.error('Error getting all movies with Sequelize: ', error);
    return;
  }
};

// Getting a movie's details
const getMovie = async (id) => {
  try {
    const movie = await Movie.findOne({
      where: {
        id: id,
      },
    });
    return movie.dataValues;
  } catch (error) {
    console.error('Error getting movie details with Sequelize: ', error);
    return;
  }
};

// get all actors for a movie
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
    return allActors;
  } catch (error) {
    console.error('Error getting actors for a movie with Sequelize: ', error);
    return;
  }
};

// Add a movie
const addMovie = async (title) => {
  const addMovie = await Movie.create({
    title: title,
  });
  return addMovie.dataValues;
};

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
    if (!movieToDelete) {
      console.log('Error deleting a movie: could not find movie in the database');
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
      console.log('Error deleting a movie: could not find  movie_actor join table for movie in the database');
    }
    
    // Delete the movie from the database
    await Movie.destroy({
      where: {
        id: id,
      },
    });
    return movieToDelete;
  } catch (error) {
    console.error('Error deleting a movie with Sequelize: ', error);
  }
};

// Edit a movie 
const editMovie = async (id, title) => {
  try {
    // Find the movie to edit
    const movieToEdit = await Movie.findOne({
      where: {
        id: id,
      },
    });
    if (!movieToEdit) {
      console.log('Error deleting a movie: could not find movie in the database');
      return;
    }
    // Edit the movie in the database
    const updatedMovie = await Movie.update(
      {title: title },
      {returning: true, where: {id: id}}
    );
    return updatedMovie[1][0];
  } catch (error) {
    console.error('Error deleting a movie with Sequelize: ', error);
  }
};


// Reset movies in the db
  // Delete all movies
  // Create default movies
  // Add movies to join table with actors
const resetMovies = async () => {
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
        return;
      }
  } catch (error) {
    console.error('Error resetting movies in the database with Sequelize: ', error);
  }
};

module.exports = {
  getMovies,
  getMovie,
  getActorsFromMovieID,
  addMovie,
  deleteMovie,
  editMovie,
  resetMovies,
};
