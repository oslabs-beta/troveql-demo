import { Query } from "./types";

const queries: Query = {
  getMovies:
    `query {
        movies {
            id
            title
            actors 
            {
              name
            }
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
          actors 
            {
              name
            }
      }
    }`
}

export default queries
