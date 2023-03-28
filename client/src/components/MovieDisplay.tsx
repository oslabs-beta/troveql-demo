import React from "react";
import queries from '../utils/sample-queries';

function MovieDisplay(props) {
  let movieList: [] = [];
  const [movieDetails, setMovieDetails] = React.useState<JSX.Element[]>([]);
  // console.log('movies', props.movies);

  // Get movie details
  function getDetails (event: React.MouseEvent<HTMLButtonElement>) {
    const query = queries.getMovieDetails;
    const id = Number(event.currentTarget.id);
    // console.log(id);
    const variables = { id: id };
    // console.log(variables);
    fetch('/troveql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: query,
        variables: variables
      })
    })
    .then(response => {
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
      const movieID = detailObj;
      // console.log('details', movieDetails)
      setMovieDetails(detailArr);
      return;
      })
    .catch(err => console.log(err));
  }

  // Display all movies
  props.movies.forEach(movie => {
   let actorList: string[] = [];
   if (movie.actors.length) {
    for (let i = 0; i < movie.actors.length - 1; i++) {
      actorList.push(<span>{movie.actors[i].name} | </span>);
    };
    actorList.push(<span>{movie.actors[movie.actors.length - 1].name}</span>);
    movieList.push(
      <li key={movie.id}>
        {movie.title}
        <button id={movie.id} onClick={getDetails}>Get Details</button>
        <span>actors: {actorList}</span>
      </li>
    )
   } else {
     movieList.push(
       <li key={movie.id}>
         {movie.title}
         <button id={movie.id} onClick={getDetails}>Get Details</button>
       </li>
     )
   }
  })

  return (
    <div className="main-wrapper">
      <div>
        <ul>
          {movieList}
        </ul>
      </div>
      <div>
        {movieDetails}
      </div>
    </div>
  )
}

export default MovieDisplay