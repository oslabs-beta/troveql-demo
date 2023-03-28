import { useState } from 'react'
import './App.css'
import MovieDisplay from './components/MovieDisplay';
import queries from './utils/sample-queries'
import { Movie, GetMoviesData } from './utils/types';

function App() {
  const [movies, changeMovies] = useState<Movie[]>([]);

  function handleClicks(e: React.MouseEvent<HTMLButtonElement>) {
    const query: string = queries[e.currentTarget.id];
    fetch('/troveql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    })
    .then(response => response.json())
    .then((data: GetMoviesData) => {
      // console.log(data);
      changeMovies(data.data.movies);
      return;
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="movies-container">
      <button id="getMovies" onClick={handleClicks}>GET ALL MOVIES</button>
      <MovieDisplay
        movies={movies}
      />
    </div>
  )
}

export default App;
