import { useState } from 'react'
import './App.css'
import MovieDisplay from './components/MovieDisplay';
import queries from './utils/sample-queries'




function App() {
  const [movies, changeMovies] = useState([])

  function handleClicks(e) {
    const query = queries[e.target.id];
    
    fetch('http://localhost:4000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(query)
    })
    .then(response => response.json())
    .then(data => {
      changeMovies(data.data.movies);
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="test-buttons-cont">
      <button id="query1" onClick={handleClicks}>SEND REQUEST</button>
      <MovieDisplay
        movies={movies}
      />
    </div>
  )
}

export default App
