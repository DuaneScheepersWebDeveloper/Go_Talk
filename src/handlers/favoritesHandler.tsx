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
  const storingFavorites = () => {
    const storedFavorites = localStorage.getItem('favoriteEpisodes');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  };

  const [favoriteEpisodes, setFavoriteEpisodes] =
    useState<string[]>(storingFavorites);

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

  const addFavorite = (compositeKey: string) => {
    const updatedFavorites = [...favoriteEpisodes, compositeKey];
    setFavoriteEpisodes(updatedFavorites);
    localStorage.setItem('favoriteEpisodes', JSON.stringify(updatedFavorites));
  };

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
