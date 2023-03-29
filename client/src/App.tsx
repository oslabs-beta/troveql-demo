import './App.css'
import { Route, Routes, useNavigate } from "react-router-dom";
import MovieDisplay from './components/MovieDisplay';
import Home from './components/Home';
import MovieDetails from './components/MovieDetails'

function App() {
  window.addEventListener('scroll', function() {
    let div = document.getElementsByClassName('movie-details');
    let topOffset = window.innerHeight /2;
    div.style.top(topOffset + this.window.pageYOffset + 'px');
  })
  
  return (
    <div className="movies-container">
        <h1>TROVEQL DEMO</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MovieDisplay />} />
          <Route path="/movies/movie" element={<MovieDetails />} />
        </Routes>
    </div>
  )
}

export default App;
