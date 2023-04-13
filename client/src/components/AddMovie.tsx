import React, { useState } from 'react';
import queries from '../utils/sample-queries';

function AddMovie(props: any) {
  const [movieTitle, setMovieTitle] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const query: string = queries.addMovie;

    // validate if input has value
    if (!movieTitle) {
      alert('Please fill out movie title');
      return;
    }

    // submit the form data
    fetch('/troveql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { title: movieTitle },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        props.setMovies([...props.movies, data.data.createMovie]);
        setMovieTitle('');
        return;
      })
      .catch((err) => console.log('Error adding a movie: ', err));
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const title = e.currentTarget.value;
    setMovieTitle(title);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Movie Title: </label>
        <input
          type="text"
          id="title"
          name="title"
          value={movieTitle}
          onChange={handleInputChange}
        ></input>
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
}

export default AddMovie;
