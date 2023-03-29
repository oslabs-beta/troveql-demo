import React, { useState } from "react";
// import queries from '../utils/sample-queries';
// import { Movie, MovieDisplayProps} from '../utils/types';

interface MovieForm {
  title: string,
}


function AddMovie() {

  const [movieData, setMovieData] = useState<MovieForm>({
    title: '',
  });

  function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // validate if input has value
    if (!movieData.title) {
      alert('Please fill out movie title');
      return;
    }

    // submit the form data
    fetch('/troveql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movieData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('new movie added');

    })
    .catch(err => console.log(err));

  }

  function handleInputChange (e) {
    e.preventDefault();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Movie title:  </label>
        <input type="text" id="title" name="title" onChange={handleInputChange}/>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AddMovie;