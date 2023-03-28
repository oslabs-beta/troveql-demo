const queries = {
  getMovies:
    `query {
        movies {
            id
            title
            genre
            year
            actors
              {
                name
              }
        }
    }
    `,
    
  getMovieDetails: 
    `query ($id: Int) {
      movie(id: $id) {
          id
          title
          genre
          year
      }
  }`
}

export default queries
