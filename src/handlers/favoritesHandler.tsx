import { useState } from 'react';

interface Episode {
  episode: number;
  title: string;
  description: string;
}

interface Season {
  season: number;
  episodes: Episode[];
}

interface Show {
  id: string;
}

export const useFavoriteEpisodes = () => {
  // Retrieve favorite episodes from localStorage or return an empty array
  const storingFavorites = () => {
    const storedFavorites = localStorage.getItem('favoriteEpisodes');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  };

  // Initialize state for favorite episodes
  const [favoriteEpisodes, setFavoriteEpisodes] =
    useState<string[]>(storingFavorites);

  // Toggle the favorite status of an episode
  const toggleFavorite = (episode: Episode, season: Season, show: Show) => {
    const compositeKey = `${show.id}-${season.season}-${episode.episode}`;

    if (
      favoriteEpisodes.some((favEpisodeKey) => favEpisodeKey === compositeKey)
    ) {
      removeFavorite(compositeKey);
    } else {
      addFavorite(compositeKey);
    }

    console.log(favoriteEpisodes);
  };

  // Add an episode to the list of favorite episodes
  const addFavorite = (compositeKey: string) => {
    const updatedFavorites = [...favoriteEpisodes, compositeKey];
    setFavoriteEpisodes(updatedFavorites);
    localStorage.setItem('favoriteEpisodes', JSON.stringify(updatedFavorites));
  };

  // Remove an episode from the list of favorite episodes
  const removeFavorite = (compositeKey: string) => {
    const updatedFavorites = favoriteEpisodes.filter(
      (favEpisodeKey) => favEpisodeKey !== compositeKey
    );
    setFavoriteEpisodes(updatedFavorites);
    localStorage.setItem('favoriteEpisodes', JSON.stringify(updatedFavorites));
  };

  return {
    favoriteEpisodes,
    toggleFavorite,
    addFavorite,
    removeFavorite,
  };
};
