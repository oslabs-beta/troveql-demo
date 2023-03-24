import React from "react";
import queries from '../utils/sample-queries';

function MovieDisplay(props) {
  let movieList = [];
  const [movieDetails, setMovieDetails] = React.useState([]);
  // console.log(props.movies)

  function getDetails (event) {
    const query = queries.getMovieDetails;
    // const variables = { movie_id: 101 };
    fetch('/troveql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        // variables
      })
    })
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      const movieTitle = [];
      movieTitle.push(
        <p>{data.data.movie[0].title}</p>
      )
      setMovieDetails(movieTitle);
      console.log(data.data.movie[0]);
      })
    .catch(err => console.log(err));
  }

  props.movies.forEach(movie => {
    movieList.push(
      <li key={movie.movie_id}>
        {movie.title}
        <button id={movie.movie_id} onClick={getDetails}>Get Details</button>
      </li>
    )
  })

  return (
    <>
      <ul>
        {movieList}
      </ul>
      <div>
        {movieDetails}
      </div>
    </>
  )
}

export default MovieDisplay