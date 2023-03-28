import React from "react";
import queries from '../utils/sample-queries';
import { Movie, MovieDisplayProps} from '../utils/types';

function MovieDisplay(props: MovieDisplayProps) {
  const [movieDetails, setMovieDetails] = React.useState<JSX.Element[]>([]);

  // Get movie details
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
      // if actor list doesn't exist, remove key from movie details
      // if actor list exists, create JSX element for each actor, push it to actorList arr and reassign movie actors key with actorList arr
      if (!detailObj.actors.length) {
        delete detailObj.actors;
        for (const key in detailObj) {
          detailArr.push(
            <p key={key}>{key}: {detailObj[key]}</p>
          )
        }
      } else {
        let actorList: string[] = [];
        for (let i = 0; i < detailObj.actors.length - 1; i++) {
          actorList.push(<span>{detailObj.actors[i].name} | </span>);
        };
        actorList.push(<span>{detailObj.actors[detailObj.actors.length - 1].name}</span>);
        console.log('list', actorList);
        detailObj.actors = actorList;
        for (const key in detailObj) {
          detailArr.push(
            <p key={key}>{key}: {detailObj[key]}</p>
          )
        }
      }
      setMovieDetails(detailArr);
      return;
    })
    .catch(err => console.log(err));
  }


  let movieList: [] = [];
  // Display all movies
  props.movies.forEach(movie => {
      movieList.push(
        <li key={movie.id}>
          {movie.title}
          <button id={movie.id} onClick={getDetails}>Get Details</button>
        </li>
      )
   })

  return (
    <div className="main-wrapper">
      <div>
        <ul>
          {movieList}
        </ul>
      </div>
      <div className="movie-details">
        {movieDetails}
      </div>
    </div>
  )
}

export default MovieDisplay;