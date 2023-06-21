import React, { useEffect, useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import MoonLoader from 'react-spinners/MoonLoader';
import { ShowFavoritePodcastStyles } from './AppStyles';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';

// Define the shape of a favorite episode
interface FavoriteEpisode {
  key: string;
  show: any;
  season: any;
  episode: any;
  addedOn: string | undefined; // Updated type
}

// Define the props for the FavoritesList component
interface FavoritesProps {
  favoriteEpisodeIDs: string[];
  toggleFavorite: (episode: any, season: any, show: any) => void;
}

const FavoritesList: React.FC<FavoritesProps> = ({
  favoriteEpisodeIDs,
  toggleFavorite,
}) => {
  // State variables
  const [favoriteEpisodes, setFavoriteEpisodes] = useState<FavoriteEpisode[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [sortFavorites, setSortFavorites] = useState<
    'titleAsc' | 'titleDes' | 'recent' | 'leastRecent' | undefined
  >(undefined);
  const [filterValue, setFilterValue] = useState('');
  const [showAddedMessage, setShowAddedMessage] = useState<string>('');
  const navigate = useNavigate();

  // Fetch favorite episodes based on their IDs
  useEffect(() => {
    const fetchFavoriteEpisodes = async () => {
      try {
        const episodes: FavoriteEpisode[] = [];

        for (const episodeKey of favoriteEpisodeIDs) {
          if (typeof episodeKey !== 'string') {
            continue;
          }

          const [showID, seasonID, episodeID] = episodeKey.split('-');
          const response = await fetch(
            `https://podcast-api.netlify.app/id/${showID}`
          );
          const data = await response.json();
          const seasonData = data.seasons.find(
            (season: any) => season.season === parseInt(seasonID)
          );
          const episodeObject: FavoriteEpisode = {
            key: episodeKey,
            show: data,
            season: seasonData,
            episode: seasonData.episodes.find(
              (episode: any) => episode.episode === Number(episodeID)
            ),
            addedOn: '',
          };
          episodes.push(episodeObject);
        }

        setFavoriteEpisodes(episodes);
      } catch (error) {
        console.error('Something went wrong. Please try again.', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteEpisodes();
  }, [favoriteEpisodeIDs]);

  // Format a date string
  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return format(date, 'd MMMM, yyyy');
  };

  // Apply sorting based on the selected sort type
  const applySorting = (
    sortType: 'titleAsc' | 'titleDes' | 'recent' | 'leastRecent' | undefined
  ): void => {
    const sortedEpisodes = [...favoriteEpisodes];

    const sortOptions: {
      [key: string]: (a: FavoriteEpisode, b: FavoriteEpisode) => number;
    } = {
      titleAsc: (a, b) => a.episode.title.localeCompare(b.episode.title),
      titleDes: (a, b) => b.episode.title.localeCompare(a.episode.title),
      recent: (a, b) =>
        new Date(b.show.updated).getTime() - new Date(a.show.updated).getTime(),
      leastRecent: (a, b) =>
        new Date(a.show.updated).getTime() - new Date(b.show.updated).getTime(),
    };

    if (sortType) {
      sortedEpisodes.sort(sortOptions[sortType]);
    }

    setFavoriteEpisodes(sortedEpisodes);
  };

  // Toggle between ascending and descending sort order based on title
  const handleSortAZ = () => {
    setSortFavorites((prevSortType) =>
      prevSortType === 'titleAsc' ? 'titleDes' : 'titleAsc'
    );
  };

  // Toggle between sorting by most recent and least recent
  const handleSortRecent = () => {
    setSortFavorites((prevSortType) =>
      prevSortType === 'recent' ? 'leastRecent' : 'recent'
    );
  };

  // Handle the search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
  };

  // Apply sorting when the sort type changes
  useEffect(() => {
    applySorting(sortFavorites);
  }, [sortFavorites]);

  // Filter episodes based on the search filter
  const filteredEpisodes = favoriteEpisodes.filter((episode) =>
    episode.episode.title.toLowerCase().includes(filterValue.toLowerCase())
  );

  // Handle the click event on an episode to navigate to its details
  const handleEpisodeClick = (
    showId: string,
    seasonId: string,
    episodeId: string
  ) => {
    navigate(`/episode/${showId}/${seasonId}/${episodeId}`);
  };

  // Handle the toggle favorite event
  const handleToggleFavorite = (episode: any, season: any, show: any): void => {
    toggleFavorite(episode, season, show);
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);

    const updatedEpisodes = favoriteEpisodes.map((ep) => {
      if (ep.key === episode.key) {
        return {
          ...ep,
          addedOn: formattedDate,
        };
      }
      return ep;
    });

    setFavoriteEpisodes(updatedEpisodes);
    setShowAddedMessage(`Added on ${formattedDate}`);
  };

  return (
    <ShowFavoritePodcastStyles>
      <div className="form-container">
        <Button
          onClick={handleSortAZ}
          className={sortFavorites === 'titleAsc' ? 'active' : ''}
        >
          {sortFavorites === 'titleAsc' ? 'Sort Z-A' : 'Sort A-Z'}
        </Button>
        <Button
          onClick={handleSortRecent}
          className={sortFavorites === 'recent' ? 'active' : ''}
        >
          {sortFavorites === 'recent'
            ? 'Sort by Least Recent'
            : 'Sort by Recent'}
        </Button>
        <input
          type="text"
          placeholder="Search episodes"
          value={filterValue}
          onChange={handleSearch}
        />
      </div>

      {loading ? (
        <div className="loading">
          <MoonLoader color="black" loading={loading} size={40} />
        </div>
      ) : (
        <Carousel>
          {filteredEpisodes.map((episode) => (
            <div className="show-list" key={episode.key}>
              <div
                onClick={() =>
                  handleEpisodeClick(
                    episode.show.id,
                    episode.season.season,
                    episode.episode.episode
                  )
                }
              >
                <div>
                  <img src={episode.show.thumbnail} alt={episode.show.title} />
                </div>

                <div>
                  <h3>{episode.episode.title}</h3>
                  <p>{episode.show.title}</p>
                  <p>
                    Season {episode.season.season} - Episode{' '}
                    {episode.episode.episode}
                  </p>
                  <p>{formatDate(episode.show.updated)}</p>
                  <p>
                    <p>
                      Added on:{' '}
                      {episode.addedOn
                        ? formatDate(episode.addedOn)
                        : 'Not available'}
                    </p>
                  </p>
                </div>
              </div>
              <div
                className="favorite-icon"
                onClick={() =>
                  handleToggleFavorite(
                    episode.episode,
                    episode.season,
                    episode.show
                  )
                }
              >
                <AiFillHeart size={24} color="#e74c3c" />
              </div>
              <img
                className="single-show-image"
                src={episode.show.image}
                alt={episode.show.title}
              />
            </div>
          ))}
        </Carousel>
      )}
    </ShowFavoritePodcastStyles>
  );
};

export default FavoritesList;
