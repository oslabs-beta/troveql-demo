import React, { useState } from 'react';
import queries from '../utils/sample-queries';

function AddMovie(props: any) {
  const [movieTitle, setMovieTitle] = useState('');

  function handleReset(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const query: string = queries.resetMovies;


    // submit the form data
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
        props.setMovies([data.data.createMovie]);
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

export default AddMovie;
