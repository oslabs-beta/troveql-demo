export type Query = {
  [key : string] : string
}

export type Actor = {
  id: number,
  name: string
}


export type Movie = {
  id: number,
  title: string,
  genre: string,
  year: number,
  actors: Actor[]
};

export type GetMoviesData = {
  data: {
    movies: Movie[]
  }
}

export type MovieDisplayProps = {
  movies: Movie[]
}