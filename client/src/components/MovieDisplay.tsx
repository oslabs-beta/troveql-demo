import React from "react";
import queries from '../utils/sample-queries';

function MovieDisplay(props) {
  let movieList: [] = [];
  // let movieDetails;{{
  const [movieDetails, setMovieDetails] = React.useState<JSX.Element[]>([]);
  // console.log(props.movies)

  function getDetails (event: React.MouseEvent<HTMLButtonElement>) {
    const query = queries.getMovieDetails;
    // const id = Number(event.currentTarget.id);
    // console.log(id);
    // const variables = { id };
    // console.log(variables);
    fetch('/troveql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: query
        // variables
      })
    })
    .then(response => {
      console.log('res', response);
      if (response.status === 200) {
        return response.json();
      }
    })
    .then(data => {
      // console.log('data', data);
      const detailObj = data.data.movie;
      const detailArr: JSX.Element[] = [];
      for (const key in detailObj) {
        detailArr.push(
            <p>{key}: {detailObj[key]}</p>
        )
      }
      // console.log(movieDetails);
      // const movieID = detailObj;
      // console.log('details', movieDetails)
      setMovieDetails(detailArr);
      return;
      })
    .catch(err => console.log(err));
  }

  props.movies.forEach(movie => {
    movieList.push(
      <li key={movie.id}>
        {movie.title}
        <button id={movie.id} onClick={getDetails}>Get Details</button>
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