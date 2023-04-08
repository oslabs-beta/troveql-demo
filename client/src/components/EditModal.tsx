import React, { useState, useEffect } from 'react';
import AddMovie from './AddMovie';
import { Movie, GetMoviesData } from '../utils/types';
import queries from '../utils/sample-queries';

function EditModal(props:any): JSX.Element {

  let newTitle = React.useRef<string>('')

  function updateNewTitle(e: React.ChangeEvent<HTMLInputElement>){
    newTitle.current = e.target.value;
  }

  let title: string = '';
  props.movies.forEach((movie: Movie) => {
    if (movie.id === props.modal.movieId) title = movie.title
  })


  function onAccept(e: React.MouseEvent<HTMLButtonElement>){
    props.setModal({display: false, movieId: null})
    const movieId = props.modal.movieId;
    const query: string = queries.editMovie;
    const variables = { id: Number(e.currentTarget.id), title: newTitle.current };

    fetch(`/troveql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log(`Movie with ID ${movieId} has been edited.`);
          const updatedMovies = props.movies.filter((movie: Movie) => movie.id !== movieId); 
          props.setMovies(updatedMovies);
        } else {
          console.log(`Failed to edit movie with ID ${movieId}.`);
        }
      })
      .catch((err) => console.log(err));
    }

    function onCancel(e: React.MouseEvent<HTMLButtonElement>) {
      props.setModal({display: false, movieId: null})
    }

  return (
    <div className='modal'>
      <h3>EDIT MOVIE</h3>
      <label htmlFor="moveName">
        TITLE
        <input 
          className="small-input" 
          name="movieName"type="text" 
          defaultValue={title} 
          onChange={updateNewTitle}
        />
      </label>
      <div>
        <button onClick={onAccept}>ACCEPT</button>
        <button onClick={onCancel}>CANCEL</button>
      </div>
    </div>
  );
}

export default EditModal;