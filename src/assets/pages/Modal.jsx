import styles from "./Modal.module.css";

export default function Modal({ trailerKey, movie, onClose }) {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalCloseBtn} onClick={onClose}>
          ×
        </button>

        {trailerKey && (
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ borderRadius: "10px", marginBottom: "20px" }}
          />
        )}

        {movie && (
          <div className={styles.modalMovieInfo}>
            <p>
              {new Date(movie.release_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className={styles.starRating}>
              <span>⭐</span>
              <span>{movie.vote_average?.toFixed(1) ?? "N/A"} / 10</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
