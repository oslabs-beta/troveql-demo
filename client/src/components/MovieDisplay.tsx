import React, { useState, useEffect } from 'react';
import AddMovie from './AddMovie';
import EditModal from './EditModal';
import { Movie, GetMoviesData } from '../utils/types';
import queries from '../utils/sample-queries';
import { useNavigate } from "react-router-dom";

function MovieDisplay() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movieDetails, setMovieDetails] = useState<JSX.Element[]>([]);
  const [modal, setModal] = useState<any>({display: false, movieId: null});
  const navigate = useNavigate();

  useEffect(() => {
      const query: string = queries.getMovies;
      fetch('/troveql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
        }),
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            return navigate('/');
          }
        })
        .then((data: GetMoviesData) => {
          setMovies(data.data.movies);
          return;
        })
        .catch((err) => console.error('Error getting all movies: ', err));
  }, []);

  // Get movie details
  function getDetails(event: React.MouseEvent<HTMLButtonElement>) {
    const query: string = queries.getMovieDetails;
    const variables = { id: Number(event.currentTarget.id) };
    fetch('/troveql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const detailObj = data.data.movie;
        const detailArr: JSX.Element[] = [];
        // if actor list exists, create JSX element for each actor, push it to actorList arr and reassign movie actors key with actorList arr
        if (detailObj.actors.length) {
          const actorList: JSX.Element[] = [];
          for (let i = 0; i < detailObj.actors.length - 1; i++) {
            actorList.push(<span>{detailObj.actors[i].name} | </span>);
          }
          actorList.push(
            <span>{detailObj.actors[detailObj.actors.length - 1].name}</span>
          );
          detailObj.actors = actorList;
        } else {
          delete detailObj.actors;
        }
        // for every key that is not null
        for (const key in detailObj) {
          if (detailObj[key]) {
            detailArr.push(
              <p key={key}>
                {key}: {detailObj[key]}
              </p>
            );
          }
        }
        setMovieDetails(detailArr);
        return;
      })
      .catch((err) => console.log('Error getting movie details: ', err));
  }

  function deleteMovie(event: React.MouseEvent<HTMLButtonElement>) {
    const movieId = event.currentTarget.id;
    const query: string = queries.deleteMovie;
    const variables = { id: Number(event.currentTarget.id) };

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
          const updatedMovies = movies.filter((movie) => movie.id !== movieId);
          setMovies(updatedMovies);
          setMovieDetails([]);
        } else {
          console.log('Error deleting a movie: response not OK');
        }
      })
      .catch((err) => console.log('Error deleting a movie: ', err));
  }

  function onEdit(event: React.MouseEvent<HTMLButtonElement>) {
    setModal({display: true, movieId: event.currentTarget.id})
  }

  let movieList: any[] = [];
  // Display all movies
  movies.forEach((movie: Movie) => {
    movieList.push(
      <li key={movie.id}>
        <p key={movie.id}>{movie.title}</p>
        <div>
          <button id={String(movie.id)} onClick={getDetails}>
            Get Details
          </button>
          <button id={String(movie.id)} onClick={deleteMovie}>
            DEL
          </button>
          <button id={String(movie.id)} onClick={onEdit}>
            EDIT
          </button>
        </div>
      </li>
    );
  });

  return (
    <div>
      <AddMovie movies={movies} setMovies={setMovies} />
      {modal.display && (
        <div>
          <div id="overlay"></div>
          <EditModal 
            modal={modal} 
            setModal={setModal} 
            movies={movies} 
            setMovies={setMovies}
          />
        </div>
      )}
      <div className="moviedisplay-container">
        <ul className="movie-list">{movieList}</ul>
        <div className="movie-details">{movieDetails}</div>
      </div>
    </div>
  );
}

export default MovieDisplay;
