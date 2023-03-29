import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import queries from '../utils/sample-queries'
import { Movie, GetMoviesData } from '../utils/types'

function Home() {
  // const [movies, changeMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();

  function handleClicks(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
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
      // changeMovies(data.data.movies);
      navigate('/movies', {state:{movies: data.data.movies}});
      return;
    })
    .catch(err => console.log(err))
  }


  return (
    <div className="home-container">
      <button id="getMovies" onClick={handleClicks}>GET ALL MOVIES</button>
    </div>
  )
}

export default Home;