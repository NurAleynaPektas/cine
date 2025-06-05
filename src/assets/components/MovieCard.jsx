import { addToLibrary } from "../utils/library";

export default function MovieCard({ movie }) {
  return (
    <div
      style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "5px" }}
    >
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
        style={{ width: "100%", borderRadius: "5px" }}
      />
      <h3>{movie.title}</h3>
      <button
        onClick={() => addToLibrary(movie)}
        style={{
          marginTop: "10px",
          padding: "5px 10px",
          backgroundColor: "#f39c12",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Kütüphaneye Ekle
      </button>
    </div>
  );
}
