import React, { useState } from 'react';
import { GetMoviesData } from '../utils/types';
import queries from '../utils/sample-queries';

function ResetMovie (props: any) {
  const [movieTitle, setMovieTitle] = useState('');

  function handleReset(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const query: string = queries.resetMovie;
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
      .then((data: GetMoviesData) => {
        props.setMovies(data.data.movies);
        return;
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
