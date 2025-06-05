import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../api/moviesApi";


export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies().then(setMovies);
  }, []);

  return (
    <div>
      <h1>🎥 Günün Filmi</h1>
      {movies.length > 0 && (
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500${movies[0].backdrop_path}`}
            alt={movies[0].title}
            style={{ width: "50%", borderRadius: "10px" }}
          />
          <h2>{movies[0].title}</h2>
          <p>{movies[0].overview}</p>
        </div>
      )}
    </div>
  );
}
