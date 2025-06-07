const LIBRARY_KEY = "my-movie-library";

export const getLibrary = () => {
  const data = localStorage.getItem(LIBRARY_KEY);
  return data ? JSON.parse(data) : [];
};

// utils/library.js

export const addToLibrary = (movie) => {
  const current = getLibrary();
  const isAlreadyAdded = current.some((item) => item.id === movie.id);
  if (!isAlreadyAdded) {
    localStorage.setItem(LIBRARY_KEY, JSON.stringify([...current, movie]));
    return true;
  }
  return false;
};

export const removeFromLibrary = (movieId) => {
  const current = getLibrary();
  const updated = current.filter((item) => item.id !== movieId);
  localStorage.setItem(LIBRARY_KEY, JSON.stringify(updated));
};
