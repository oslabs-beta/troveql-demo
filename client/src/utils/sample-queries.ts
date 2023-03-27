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
      movie(id: "3") {
          id
          title
          genre
          year
      }
  }`
}

export default queries
