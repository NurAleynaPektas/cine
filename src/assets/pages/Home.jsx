import { useEffect, useState } from "react";
import {
  fetchTrendingMovies,
  fetchTrailer,
  fetchUpcomingMovies,
} from "../api/moviesApi";
import Modal from "../pages/Modal"; 
import "../pages/Home.modules.css";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  const [upcomingTrailerKey, setUpcomingTrailerKey] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function loadMovies() {
      const trending = await fetchTrendingMovies();
      setMovies(trending);

      if (trending.length > 0) {
        const key = await fetchTrailer(trending[0].id);
        setTrailerKey(key);
      }
    }

    loadMovies();
  }, []);

  useEffect(() => {
    async function loadUpcomingMovies() {
      const upcoming = await fetchUpcomingMovies();
      setUpcomingMovies(upcoming);
    }

    loadUpcomingMovies();
  }, []);

  return (
    <div className="home-movie-container">
      {/* Today’s Movie */}
      <h1 className="home-movie-title">Today’s Movie</h1>
      <div className="home-movie-card">
        {trailerKey && (
          <iframe
            width="700"
            height="400"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="home-trailer"
          />
        )}

        {movies.length > 0 && (
          <div className="home-movie-info">
            <h2 className="movie-title">{movies[0].title}</h2>
            <p className="movie-overview">{movies[0].overview}</p>
          </div>
        )}
      </div>

      {/* Upcoming Movie */}
      <h2 className="home-movie-title">Upcoming Movie</h2>
      {upcomingMovies.length > 0 && (
        <div className="home-movie-info-upcoming">
          <div className="movie-poster-upcoming">
            <img
              src={`https://image.tmdb.org/t/p/w300${upcomingMovies[0].poster_path}`}
              alt=""
              onClick={async () => {
                const key = await fetchTrailer(upcomingMovies[0].id);
                setUpcomingTrailerKey(key);
                setIsModalOpen(true);
              }}
              style={{ cursor: "pointer" }}
            />
            <div className="movie-info-upcoming-rating">
              <span className="movie-rating-upcoming">
                {upcomingMovies[0].release_date.replaceAll("-", " ")}
              </span>
              <span className="movie-rating-upcoming">
                {Math.floor(upcomingMovies[0].vote_average)}/10
              </span>
            </div>
          </div>
          <div className="movie-info-upcoming-desc">
            <h2 className="movie-title">{upcomingMovies[0].title}</h2>
            <p className="movie-overview">{upcomingMovies[0].overview}</p>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <Modal
          trailerKey={upcomingTrailerKey}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
