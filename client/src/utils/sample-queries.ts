import { Query } from "./types";

const queries: Query = {
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
    `query ($id: ID) {
      movie(id: $id) {
          id
          title
          genre
          year
      }
    }`
}

export default queries
