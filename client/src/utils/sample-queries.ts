import { Query } from "./types";

const queries: Query = {
  getMovies:
    `query {
        movies {
            id
            title
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
    }`,
  addMovie: 
    `mutation CreateMovie($title: String!) {
      createMovie(title: $title) {
        title
      }
    }`,
}

export default queries
