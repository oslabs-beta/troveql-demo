import './App.css'
import { Route, Routes } from "react-router-dom"
import Home from './components/Home'
import MovieDisplay from './components/MovieDisplay'
import AddMovie from './components/AddMovie'
import MovieDetails from './components/MovieDetails'

function App() {
  return (
    <div className="movies-container">
        <h1>TROVEQL DEMO</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MovieDisplay />} />
          <Route path="/movies/movie" element={<MovieDetails />} />
          <Route path="/addmovie" element={<AddMovie />} />
        </Routes>
    </div>
  )
}

export default App;
