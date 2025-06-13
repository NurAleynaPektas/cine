import React from "react";
import "./Home.modules.css";

export default function Modal({ trailerKey, onClose }) {
  if (!trailerKey) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <iframe
          width="700"
          height="400"
          src={`https://www.youtube.com/embed/${trailerKey}`}
          title="Trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <button className="modal-close-btn" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
}
