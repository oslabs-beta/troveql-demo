import { useState } from 'react'
import './App.css'
import MovieDisplay from './components/MovieDisplay';
import queries from './utils/sample-queries'



function App() {
  const [movies, changeMovies] = useState([]);

  function handleClicks(e: React.MouseEvent<HTMLButtonElement>) {
    const query = queries[e.target.id];
    fetch('/troveql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query: query})
    })
    .then(response => response.json())
    .then(data => {
      changeMovies(data.data.movies);
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="test-buttons-cont">
      <button id="getMovies" onClick={handleClicks}>GET ALL MOVIES</button>
      <MovieDisplay
        movies={movies}
      />
    </div>
  )
}

export default App
