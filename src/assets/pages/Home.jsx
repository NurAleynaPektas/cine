import { useEffect, useState, useRef } from "react";
import {
  fetchTrendingMovies,
  fetchTrailer,
  fetchUpcomingMovies,
  fetchTopRatedMovies,
} from "../api/moviesApi";
import Modal from "../pages/Modal";
import "../pages/Home.modules.css";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);

  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [upcomingTrailerKey, setUpcomingTrailerKey] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [topRatedTrailerKey, setTopRatedTrailerKey] = useState(null);
  const [isTopRatedModalOpen, setIsTopRatedModalOpen] = useState(false);

  const upcomingSliderRef = useRef(null);

  useEffect(() => {
    async function loadMovies() {
      const trending = await fetchTrendingMovies();
      setMovies(trending);
      if (trending.length > 0) {
        const key = await fetchTrailer(trending[0].id);
        setTrailerKey(key);
      }
    }

    async function loadUpcomingMovies() {
      const upcoming = await fetchUpcomingMovies();
      setUpcomingMovies(upcoming);
    }

    async function loadTopRatedMovies() {
      const topRated = await fetchTopRatedMovies();
      setTopRatedMovies(topRated.slice(0, 10)); // 10 film göster
    }

    loadMovies();
    loadUpcomingMovies();
    loadTopRatedMovies();
  }, []);

  // Otomatik kaydırma efekti
  useEffect(() => {
    const slider = upcomingSliderRef.current;
    if (!slider) return;

    let scrollAmount = 0;
    const scrollStep = 1; // px hız
    const delay = 10; // ms

    const intervalId = setInterval(() => {
      if (scrollAmount >= slider.scrollWidth - slider.clientWidth) {
        scrollAmount = 0;
        slider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollAmount += scrollStep;
        slider.scrollLeft = scrollAmount; 
      }
    }, delay);

    return () => clearInterval(intervalId);
  }, [upcomingMovies]);

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

      {/* Upcoming Slider - Oklar Kaldırıldı */}
      <h2 className="home-movie-title">Upcoming Movies</h2>
      <div className="upcoming-slider-wrapper">
        <div className="upcoming-slider" ref={upcomingSliderRef}>
          {upcomingMovies.map((movie) => (
            <div
              key={movie.id}
              className="upcoming-card"
              onClick={async () => {
                const key = await fetchTrailer(movie.id);
                setUpcomingTrailerKey(key);
                setIsModalOpen(true);
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="upcoming-image"
              />
              <p className="upcoming-title">{movie.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top Rated */}
      <h2 className="home-movie-title">Top Rated Movies</h2>
      <div className="home-top-rated-container">
        {topRatedMovies.map((movie) => (
          <div
            key={movie.id}
            className="top-rated-card"
            onClick={async () => {
              const key = await fetchTrailer(movie.id);
              setTopRatedTrailerKey(key);
              setIsTopRatedModalOpen(true);
            }}
            style={{ cursor: "pointer" }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="top-rated-image"
            />
            <p className="top-rated-title">{movie.title}</p>
          </div>
        ))}
      </div>

      {/* Modal - Upcoming */}
      {isModalOpen && (
        <Modal
          trailerKey={upcomingTrailerKey}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* Modal - Top Rated */}
      {isTopRatedModalOpen && (
        <Modal
          trailerKey={topRatedTrailerKey}
          onClose={() => {
            setIsTopRatedModalOpen(false);
            setTopRatedTrailerKey(null);
          }}
        />
      )}
    </div>
  );
}
