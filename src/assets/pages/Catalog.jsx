import { useEffect, useState } from "react";
import {
  fetchGenres,
  fetchMoviesByGenre,
  fetchAllMovies,
} from "../api/moviesApi";
import { addToLibrary } from "../utils/library";
import "../pages/Home.modules.css";
import "../pages/Catalog.modules.css";
import { toast } from "react-toastify";

export default function Catalog() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Türleri çek
  useEffect(() => {
    fetchGenres().then(setGenres);
  }, []);

  // Sayfa veya tür değiştiğinde filmleri çek
  useEffect(() => {
    setLoading(true);
    if (selectedGenre) {
      fetchMoviesByGenre(selectedGenre, page)
        .then((data) => {
          setMovies(data.results);
          setTotalPages(Math.min(data.total_pages, 50));
        })
        .finally(() => setLoading(false));
    } else {
      fetchAllMovies(page)
        .then((data) => {
          setMovies(data.results);
          setTotalPages(Math.min(data.total_pages, 50));
        })
        .finally(() => setLoading(false));
    }
  }, [selectedGenre, page]);

  // Tür değişince sayfayı 1 yap
  useEffect(() => {
    setPage(1);
  }, [selectedGenre]);

  const handleAddToLibrary = (movie) => {
    const added = addToLibrary(movie);
    if (added) {
      toast.success(`✅ "${movie.title}" added to your library.`);
    } else {
      toast.warning(`⚠️ "${movie.title}" is already in your library.`);
    }
  };

  return (
    <div className="home-movie-container">
      <h1 className="home-movie-title">Welcome to the CinePlus Catalog</h1>

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

      {loading ? (
        <p style={{ fontSize: "18px", color: "#999" }}>Loading movies...</p>
      ) : (
        <>
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
                <button
                  onClick={() => handleAddToLibrary(movie)}
                  style={{
                    marginTop: "10px",
                    padding: "8px 12px",
                    backgroundColor: "#e50914",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  + Add to My Library
                </button>
              </div>
            ))}
          </div>

          {/* Pagination Kontrolleri */}
          <div className="pagination">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span>
              {page} ... {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
