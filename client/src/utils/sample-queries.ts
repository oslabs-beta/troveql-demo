const queries = {
  getMovies:
    `query {
        movies {
            movie_id
            title
            vote_average
            vote_count
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
