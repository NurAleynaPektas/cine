import { useEffect, useState } from "react";
import { fetchGenres, fetchMoviesByGenre } from "../api/moviesApi";
import "../pages/Home.modules.css";
import "../pages/Catalog.modules.css";

export default function Catalog() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchGenres().then(setGenres);
  }, []);

  useEffect(() => {
    if (selectedGenre) {
      fetchMoviesByGenre(selectedGenre).then(setMovies);
    } else {
      setMovies([]);
    }
  }, [selectedGenre]);

  return (
    <div className="home-movie-container">
      <h1 className="home-movie-title"> Welcome to the CinePlus Catalog</h1>

      <div className="catalog-custom-select">
        <select
          style={{
            padding: "10px",
            fontSize: "20px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            cursor: "pointer",
            marginBottom: "10px",
            backgroundColor: "#333",
            color: "#fff",
          }}
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">🎬 Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div className="catalog-movie-grid">
        {movies.map((movie) => (
          <div
            key={movie.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              style={{ width: "100%", borderRadius: "5px" }}
            />
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
