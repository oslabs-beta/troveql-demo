import './App.css'
import { Route, Routes, useNavigate } from "react-router-dom";
import MovieDisplay from './components/MovieDisplay';
import Home from './components/Home';
import MovieDetails from './components/MovieDetails'

function App() {
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
