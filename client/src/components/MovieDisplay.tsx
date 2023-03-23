import React from "react";

function MovieDisplay(props) {
  let movieList = [];
  // console.log(props.movies)
  props.movies.forEach(movie => {
    movieList.push(
      <li key={movie.title}>{movie.title}</li>
    )
  })

  return (
    <ul>
      {movieList}
    </ul>
  )
}

export default MovieDisplay