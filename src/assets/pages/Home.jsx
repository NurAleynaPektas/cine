import { useState, useEffect } from "react";
import Slider from "react-slick";
import {
  fetchTrendingMovies,
  fetchTrailer,
  fetchUpcomingMovies,
  fetchTopRatedMovies,
} from "../api/moviesApi";
import Modal from "../pages/Modal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../pages/Home.modules.css";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);

  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [upcomingTrailerKey, setUpcomingTrailerKey] = useState(null);
  const [selectedUpcomingMovie, setSelectedUpcomingMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [topRatedTrailerKey, setTopRatedTrailerKey] = useState(null);
  const [isTopRatedModalOpen, setIsTopRatedModalOpen] = useState(false);

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
      setTopRatedMovies(topRated.slice(0, 12)); // slider için biraz daha fazla göster
    }

    loadMovies();
    loadUpcomingMovies();
    loadTopRatedMovies();
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

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
        <div className="movie-extra-info">
          <p className="movie-date">
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="movie-rating">
            <span className="star-icon">⭐</span>
            <span>{movies[0]?.vote_average?.toFixed(1) ?? "8.5"} / 10</span>
          </p>
        </div>
      </div>

      {/* Upcoming Slider */}
      <h2 className="home-movie-title">Upcoming Movies</h2>
      <div className="upcoming-slider-container">
        <Slider {...sliderSettings}>
          {upcomingMovies.map((movie) => (
            <div
              key={movie.id}
              className="upcoming-card"
              onClick={async () => {
                const key = await fetchTrailer(movie.id);
                setUpcomingTrailerKey(key);
                setSelectedUpcomingMovie(movie);
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
        </Slider>
      </div>

      {/* Top Rated Slider */}
      <h2 className="home-movie-title">Top Rated Movies</h2>
      <div className="top-rated-slider-container">
        <Slider {...sliderSettings}>
          {topRatedMovies.map((movie) => (
            <div
              key={movie.id}
              className="top-rated-card"
              onClick={async () => {
                const key = await fetchTrailer(movie.id);
                setTopRatedTrailerKey(key);
                setIsTopRatedModalOpen(true);
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="top-rated-image"
              />
              <p className="top-rated-title">{movie.title}</p>
              <div className="top-rated-extra-info">
                <span className="top-rated-date">
                  {new Date(movie.release_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span className="top-rated-star">
                  ⭐ {movie.vote_average?.toFixed(1) ?? "8.5"}
                </span>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Modal - Upcoming */}
      {isModalOpen && (
        <Modal
          trailerKey={upcomingTrailerKey}
          movie={selectedUpcomingMovie}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedUpcomingMovie(null);
          }}
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
