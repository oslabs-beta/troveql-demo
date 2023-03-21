import { useState } from 'react'
import './App.css'
import queries from './utils/sample-queries'



function App() {

  function handleClicks(e) {
    const query = queries[e.target.id];
    console.log(query)
    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(query)
    })
  }

  return (
    <div className="test-buttons-cont">
      <button id="query1" onClick={handleClicks}>SEND REQUEST</button>
    </div>
  )
}

export default App
