import React, { useState } from "react";
import queries from '../utils/sample-queries';
import { Link } from "react-router-dom"
// import { Movie, MovieDisplayProps} from '../utils/types';

interface MovieForm {
  title: string,
}



function AddMovie() {

  const [movieData, setMovieData] = useState<MovieForm>({
    title: '',
  });

  // const navigate = useNavigate();

  function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    // const input = form.querySelector('input[name="title"]') as HTMLInputElement;
    const query: string = queries.addMovie;
    console.log('query', query, 'variables', movieData);

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
      body: JSON.stringify({
        query,
        variables: movieData
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('new movie added');
      console.log('data', data);
      // navigate('/movies');
    })
    .catch(err => console.log(err));
    navigate('/movies');
    return;

  }

  function handleInputChange (e: React.ChangeEvent<HTMLInputElement>) {
    // e.preventDefault();
    const title = e.currentTarget.value;
    setMovieData({title: title});
  }


  console.log('moviedata', movieData);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Movie title </label>
        <input type="text" id="title" name="title" value={movieData.title} onChange={handleInputChange}></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AddMovie;