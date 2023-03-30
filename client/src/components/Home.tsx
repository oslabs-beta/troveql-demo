import React from 'react'
import { useNavigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
        <button id="getMovies" onClick={() => navigate('/movies')}>GET ALL MOVIES</button>
    </div>
  )
}

export default Home;