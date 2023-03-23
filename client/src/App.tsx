import { useState } from 'react'
import './App.css'
import MovieDisplay from './components/MovieDisplay';
import queries from './utils/sample-queries'



function App() {
  const [movies, changeMovies] = useState([])

  function handleClicks(e) {
    const query = queries[e.target.id];
    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query: query})
    })
    .then(response => response.json())
    .then(data => {
      if (e.target.id == 'query1') {
        changeMovies(data.data.movies);
      } else if (e.target.id == 'query2') {
        changeMovies(data.data.favlist.movie);
      }
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="test-buttons-cont">
      <button id="query1" onClick={handleClicks}>GET ALL MOVIES</button>
      <button id="query2" onClick={handleClicks}>GET FAVORITE MOVIES</button>
      <MovieDisplay
        movies={movies}
      />
    </div>
  )
}

export default App
