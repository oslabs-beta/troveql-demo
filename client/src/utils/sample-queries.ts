const queries = {
  getMovies:
    `query {
        movies {
            id
            title
            genre
            year
        }
      }
    `,
    
  getMovieDetails: 
    `query {
      movie(movie_id: 101) {
          movie_id
          title
      }
  }`
}

export default queries
