import { useEffect, useState } from "react";
import {
  fetchTrendingMovies,
  fetchTrailer,
  fetchUpcomingMovies,
} from "../api/moviesApi";
import "../pages/Home.modules.css";
export default function Home() {
  const [movies, setMovies] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

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
      <h1 className="home-movie-title">Today’s Movie</h1>

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
        <div className="home-movie-card">
          <div className="home-movie-info">
            <h2 className="movie-title">{movies[0].title}</h2>
            <p className="movie-overview">{movies[0].overview}</p>
          </div>
        </div>
      )}
      <div>
        <h2 className="home-movie-title">Upcoming Movie</h2>
        {upcomingMovies.length > 0 && (
          <div className="home-movie-card">
            <div className="home-movie-info">
              <img
                src={`https://image.tmdb.org/t/p/w300${upcomingMovies[0].poster_path}`}
                alt=""
              />
              <h2 className="movie-title">{upcomingMovies[0].title}</h2>
              <p className="movie-overview">{upcomingMovies[0].overview}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
