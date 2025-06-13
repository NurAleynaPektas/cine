import { useEffect, useState } from "react";
import { getLibrary, removeFromLibrary } from "../utils/library";
import { fetchTrailer } from "../api/moviesApi";
import "../pages/Home.modules.css";
import "../pages/Library.modules.css";
import { toast } from "react-toastify";

export default function Library() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const saved = getLibrary();
    setMovies(saved);
  }, []);

  const handleRemove = (id, title) => {
    removeFromLibrary(id);
    setMovies((prev) => prev.filter((m) => m.id !== id));
    toast.info(`"${title}" has been removed from your library.`);
  };

  const openModal = async (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
    const key = await fetchTrailer(movie.id);
    setTrailerKey(key);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
    setTrailerKey("");
  };

  return (
    <div className="home-movie-container">
      <h1 className="home-movie-title">My Movie Library</h1>
      {movies.length === 0 && (
        <p>Your library is empty, start adding your favorite movies!</p>
      )}

      <div className="library-grid">
        {movies.map((movie) => (
          <div key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              style={{ width: "100%", borderRadius: "5px", cursor: "pointer" }}
              onClick={() => openModal(movie)}
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

      {isModalOpen && selectedMovie && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-button" onClick={closeModal}>
              X
            </button>

            {trailerKey ? (
              <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="Trailer"
                allowFullScreen
              ></iframe>
            ) : (
              <p>No trailer available</p>
            )}
            <h2>{selectedMovie.title}</h2>
            <p>
              <strong> 🗓️ Release Date :</strong> {selectedMovie.release_date}
            </p>
            <p>
              <strong>⭐ Average Rating :</strong>{" "}
              {Math.floor(selectedMovie.vote_average)}/10
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
