import { useEffect, useState } from "react";
import {
  fetchGenres,
  fetchMoviesByGenre,
  fetchAllMovies,
  fetchTrailer,
  fetchMoviesByQuery,
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

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  // Search
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchMode, setIsSearchMode] = useState(false);

  useEffect(() => {
    fetchGenres().then(setGenres);
  }, []);

  useEffect(() => {
    setLoading(true);

    if (isSearchMode && searchQuery.trim()) {
      fetchMoviesByQuery(searchQuery, page)
        .then((data) => {
          setMovies(data.results);
          setTotalPages(Math.min(data.total_pages, 50));
        })
        .finally(() => setLoading(false));
    } else if (selectedGenre) {
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
  }, [selectedGenre, page, searchQuery, isSearchMode]);

  useEffect(() => {
    setPage(1);
  }, [selectedGenre, searchQuery]);

  const handleAddToLibrary = (movie) => {
    const added = addToLibrary(movie);
    if (added) {
      toast.success(`✅ "${movie.title}" added to your library.`);
    } else {
      toast.warning(`⚠️ "${movie.title}" is already in your library.`);
    }
  };

  const handleOpenModal = async (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
    const key = await fetchTrailer(movie.id);
    setTrailerKey(key);
  };

  return (
    <div className="home-movie-container">
      <h1 className="home-movie-title">Welcome to the CinePlus Catalog</h1>

     
      <div className="catalog-search-box">
        <input
          type="text"
          placeholder="Search movie by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "18px",
            width: "100%",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginBottom: "10px",
          }}
        />
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => {
              setIsSearchMode(true);
              setSelectedGenre("");
              setPage(1);
            }}
            style={{
              padding: "10px 20px",
              backgroundColor: "#e50914",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Search
          </button>
          {isSearchMode && (
            <button
              onClick={() => {
                setIsSearchMode(false);
                setSearchQuery("");
                setPage(1);
              }}
              style={{
                padding: "10px 20px",
                backgroundColor: "#444",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Clear Search
            </button>
          )}
        </div>
      </div>

     
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
          onChange={(e) => {
            setSelectedGenre(e.target.value);
            setIsSearchMode(false); 
          }}
        >
          <option value="">🎬 Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      {/* Movie Cards */}
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
                  style={{
                    width: "100%",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleOpenModal(movie)}
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

          {/* Pagination */}
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

      {/* Modal */}
      {isModalOpen && selectedMovie && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setIsModalOpen(false)}
            >
              X
            </button>

            {trailerKey ? (
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="Trailer"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            ) : (
              <p style={{ color: "#fff" }}>Trailer bulunamadı</p>
            )}

            <h2 style={{ color: "#fff" }}>{selectedMovie.title}</h2>
            <p style={{ color: "#ccc" }}>
              <strong> 🗓️ Release Date :</strong>{" "}
              {selectedMovie.release_date.replaceAll("-", " ")}
            </p>
            <p style={{ color: "#ccc" }}>
              <strong>⭐ Average Rating :</strong>
              {Math.floor(selectedMovie.vote_average)}/10
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
