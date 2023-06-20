import { useState, useEffect } from 'react';
import MoonLoader from 'react-spinners/MoonLoader';
import { ShowPodcastStyles } from './AppStyles';
import Button from './Button';
import { format } from 'date-fns';
import _ from 'lodash';
import { genreList } from '../handlers/genreHandler';

interface Show {
  id: string;
  image: string;
  title: string;
  description: string;
  seasons: number;
  genres: number[]; // Add genres property
  updated: string; // Add updated property
}

interface PodcastListProps {
  onShowClick: (podcastId: string) => void;
}

const PodcastList: React.FC<PodcastListProps> = ({ onShowClick }) => {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [visibleShows, setVisibleShows] = useState(12);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [filterInput, setFilterInput] = useState('');
  const [filteredShows, setFilteredShows] = useState<Show[]>(shows);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortOrderRecentness, setSortOrderRecentness] = useState<
    'asc' | 'desc'
  >('asc');

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app/shows');
        const data = await response.json();
        setShows(data);
        setLoading(false);
      } catch (error) {
        console.error('Something went wrong, please refresh.', error);
      }
    };

    fetchShows();
  }, []);

  useEffect(() => {
    const filtered = _.filter(shows, (show) => {
      const titleMatch = show.title
        .toLowerCase()
        .includes(filterInput.toLowerCase());

      if (selectedGenres.length === 0) {
        return titleMatch;
      }

      return (
        titleMatch && _.intersection(show.genres, selectedGenres).length > 0
      );
    });

    const sorted = _.orderBy(filtered, 'title', sortOrder);

    setFilteredShows(sorted);
  }, [filterInput, selectedGenres, shows, sortOrder]);

  useEffect(() => {
    const sortedRecentness = _.orderBy(
      filteredShows,
      'updated',
      sortOrderRecentness
    );
    setFilteredShows(sortedRecentness);
  }, [sortOrderRecentness]);

  const handleShowClick = (podcastId: string) => {
    onShowClick(podcastId);
  };

  const handleLoadMore = async () => {
    setLoadingMore(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setVisibleShows((prevVisibleShows) => prevVisibleShows + 8);
      setLoadingMore(false);
    } catch (error) {
      console.error('Something went wrong', error);
    }
  };

  const clampText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  };

  const handleFilterInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterInput(event.target.value);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return format(date, 'd MMMM, yyyy');
  };

  const getGenreTitles = (genreIds: number[]): JSX.Element[] => {
    return genreIds.map((genreId) => (
      <span className="genre-pill" key={genreId}>
        {genreList[genreId]}
      </span>
    ));
  };

  const handleGenreClick = (genreId: number) => {
    if (selectedGenres.includes(genreId)) {
      // If the genre is already selected, remove it from the selectedGenres state
      setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
    } else {
      // If the genre is not selected, add it to the selectedGenres state
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };

  const handleSortByRecentness = () => {
    setSortOrderRecentness(sortOrderRecentness === 'asc' ? 'desc' : 'asc');
  };

  return (
    <ShowPodcastStyles>
      <form className="filter-form">
        <input
          type="text"
          value={filterInput}
          onChange={handleFilterInputChange}
          placeholder="Enter your podcast's name"
        />
      </form>
      <div className="genre-filter">
        {Object.entries(genreList).map(([genreId, genreName]) => (
          <span
            className={`genre-pill ${
              selectedGenres.includes(Number(genreId)) ? 'selected' : ''
            }`}
            key={genreId}
            onClick={() => handleGenreClick(Number(genreId))}
          >
            {genreName}
          </span>
        ))}
      </div>
      <Button
        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
      >
        Sort by Title {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
      </Button>
      <Button onClick={handleSortByRecentness}>
        Recent {sortOrderRecentness === 'asc' ? 'Oldest First' : 'Newest First'}
      </Button>
      <div className="show-list">
        {filteredShows.slice(0, visibleShows).map((show) => (
          <div className="show-card" key={show.id}>
            <div className="show-card-content">
              <img
                className="show-image"
                key={show.id}
                onClick={() => handleShowClick(show.id)}
                src={show.image}
                alt={show.title}
              />
              <div className="show-details">
                <h3 className="show-title">{show.title}</h3>
                <p className="show-seasons">Seasons: {show.seasons}</p>
                <p className="show-description">
                  {clampText(show.description, 100)}
                </p>
                <div className="genre-container">
                  <span className="genre-label">Genres</span>
                  <div className="genre-list">
                    <p className="show-genres">{getGenreTitles(show.genres)}</p>
                  </div>
                </div>
                <p className="last-updated">
                  Last Uploaded: {formatDate(show.updated)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!loadingMore && showLoadMore && visibleShows < shows.length && (
        <div className="load-more-container">
          <Button
            variant="primary"
            className="load-more-button"
            onClick={handleLoadMore}
          >
            Load More
          </Button>
        </div>
      )}

      {loadingMore && (
        <div className="loading-spinner">
          <MoonLoader color="black" loading={true} size={60} />
        </div>
      )}
    </ShowPodcastStyles>
  );
};

export default PodcastList;
