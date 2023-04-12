import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    if (dataFetchedRef.current) {
      return;
    } else {
      dataFetchedRef.current = true;
      fetch('/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((response) => response.json())
        .then((text) => console.log(text))
        .catch((err) => console.log(err));
    }
  }, []);
  
  return (
    <div className="home-container">
        <button id="getMovies" onClick={() => navigate('/movies') }>GET ALL MOVIES</button>
    </div>
  )
}

export default Home;