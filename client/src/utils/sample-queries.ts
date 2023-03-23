const queries = {
  query1:
    `query
        {movies 
          {
            movie_id
            title
            vote_average
            vote_count
          }
        }
      `,
  query2: 
    `query
      { 
        favlist 
        {
          username
          movie 
          {
              title
              rating
          }
        }
      }
    `
}

export default queries
