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
    `query {
      movie(id: "3") {
          id
          title
          genre
          year
      }
  }`
}

export default queries
