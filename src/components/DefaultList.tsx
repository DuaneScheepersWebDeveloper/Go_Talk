import React, { useState } from 'react';
import ShowDetails from './SinglePodcast';
import PodcastList from './PodcastList';
import { useFavoriteEpisodes } from '../handlers/favoritesHandler';

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

const DefaultList = () => {
  const [selectedPodcastId, setSelectedPodcastId] = useState<string | null>(
    null
  );

  const { toggleFavorite, favoriteEpisodes } = useFavoriteEpisodes(); // Get the favoriteEpisodes from the custom hook

  const handleShowClick = (showId: string) => {
    setSelectedPodcastId(showId);
  };

  const handleGoBack = () => {
    setSelectedPodcastId(null);
  };

  const handleToggleFavorite = (
    episode: Episode,
    selectedSeasonData: Season | null,
    showData: Show
  ) => {
    if (selectedSeasonData !== null) {
      toggleFavorite(episode, selectedSeasonData, showData);
    }
  };

  return (
    <div>
      {selectedPodcastId ? (
        <ShowDetails
          toggleFavorite={handleToggleFavorite}
          show={selectedPodcastId}
          goBack={handleGoBack}
          favoriteEpisodes={favoriteEpisodes} // Pass the favoriteEpisodes to ShowDetails component
        />
      ) : (
        <PodcastList onShowClick={handleShowClick} />
      )}
    </div>
  );
};

export default DefaultList;
