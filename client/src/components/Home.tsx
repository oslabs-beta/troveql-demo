import { useEffect, useRef } from 'react';
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
        .catch((err) => console.log('Error resetting movies in the database: ', err));
    }
  }, []);
  
  return (
    <div className="home-container">
        <button id="getMovies" onClick={() => navigate('/movies') }>GET ALL MOVIES</button>
    </div>
  )
}

export default Home;