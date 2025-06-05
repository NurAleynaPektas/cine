import { useEffect, useState } from "react";
import { getLibrary, removeFromLibrary } from "../utils/library";

export default function Library() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const saved = getLibrary();
    setMovies(saved);
  }, []);

  const handleRemove = (id) => {
    removeFromLibrary(id);
    setMovies((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div>
      <h1>🎯 Kütüphane</h1>
      {movies.length === 0 && <p>Henüz film eklemediniz.</p>}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
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
              onClick={() => handleRemove(movie.id)}
              style={{
                marginTop: "10px",
                padding: "5px 10px",
                backgroundColor: "#e74c3c",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Kaldır
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
