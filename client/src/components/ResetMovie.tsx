import React, { useState } from 'react';
import { GetMoviesData, Movie } from '../utils/types';
import queries from '../utils/sample-queries';

function ResetMovie (props: any) {
  const [movieTitle, setMovieTitle] = useState('');

  function handleReset(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const query: string = queries.getMovies;
    // reset movies
    fetch('/troveql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('dataresetMovie', data);
        // props.setMovies(data.data.movie);
        props.setMovies((prevMovies: Movie[]) => {
          for (let i = 0; i < prevMovies.length; i++) {
            if (prevMovies[i].title !== data.data.movies[i].title) {
              return data.data.movie;
            } 
          }
          return [...prevMovies];
        })
        return location.reload();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <button onClick={handleReset}>Reset Movie to Default</button>
    </div>
  );
}

export default ResetMovie;
