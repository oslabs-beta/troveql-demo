// import React from "react";
// import queries from '../utils/sample-queries';
// import { Movie, MovieDisplayProps} from '../utils/types';

interface MovieForm {
  title: string;
  genre: string;
  year: number;
}


function AddMovie() {

  return (
    <div>
      <form>
        <label htmlFor="title">Movie title:  </label>
        <input type="text" id="title" name="title" />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AddMovie;