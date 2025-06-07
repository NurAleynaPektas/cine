import { useEffect, useState } from "react";
import { getLibrary, removeFromLibrary } from "../utils/library";
import "../pages/Home.modules.css";
import "../pages/Library.modules.css";
import { toast } from "react-toastify";
export default function Library() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const saved = getLibrary();
    setMovies(saved);
  }, []);

  const handleRemove = (id, title) => {
    removeFromLibrary(id);
    setMovies((prev) => prev.filter((m) => m.id !== id));
    toast.info(` "${title}" has been removed from your library.`);
  };

  return (
    <div className="home-movie-container">
      <h1 className="home-movie-title"> My Movie Library</h1>
      {movies.length === 0 && (
        <p>"Your library is empty, start adding your favorite movies !"</p>
      )}
      <div className="library-grid">
        {movies.map((movie) => (
          <div key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              style={{ width: "100%", borderRadius: "5px" }}
            />
            <h3>{movie.title}</h3>
            <button
              className="library-remove-btn"
              onClick={() => handleRemove(movie.id, movie.title)}
            >
              - Remove from Library
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
