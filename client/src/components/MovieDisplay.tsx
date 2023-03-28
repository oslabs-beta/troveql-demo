import React from "react";
import queries from '../utils/sample-queries';
import { Movie, MovieDisplayProps } from '../utils/types';

function MovieDisplay(props: MovieDisplayProps) {
  const [movieDetails, setMovieDetails] = React.useState<JSX.Element[]>([]);

  function getDetails (event: React.MouseEvent<HTMLButtonElement>) {
    const query: string = queries.getMovieDetails;
    const variables = { id: Number(event.currentTarget.id) };
    fetch('/troveql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        variables
      })
    })
    .then(response => response.json())
    .then(data => {
      const detailObj = data.data.movie;
      const detailArr: JSX.Element[] = [];
      for (const key in detailObj) {
        detailArr.push(
          <p key={key}>{key}: {detailObj[key]}</p>
        )
      }
      setMovieDetails(detailArr);
      return;
    })
    .catch(err => console.log(err));
  }

  let movieList: JSX.Element[] = [];
  props.movies.forEach((movie: Movie) => {
    movieList.push(
      <li key={movie.id}>
        {movie.title}
        <button id={String(movie.id)} onClick={getDetails}>Get Details</button>
      </li>
    )
  })

  return (
    <>
      <ul>
        {movieList}
      </ul>
      <div className="movie-details">
        {movieDetails}
      </div>
    </>
  )
}

export default MovieDisplay;