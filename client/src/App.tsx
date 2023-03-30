import './App.css'
import { Route, Routes } from "react-router-dom"
import Home from './components/Home'
import MovieDisplay from './components/MovieDisplay'
import Error from './components/Error'

function App() {
  return (
    <div className="movies-container">
        <h1>TROVEQL DEMO</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MovieDisplay />} />
          <Route path="*" element={<Error />} />
        </Routes>
    </div>
  )
}

export default App;
