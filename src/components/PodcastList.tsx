import { useState, useEffect } from 'react';
import MoonLoader from 'react-spinners/MoonLoader';
import { ShowPodcastStyles } from './AppStyles';
import Button from './Button';
import { format } from 'date-fns';
import { genreList } from '../handlers/genreHandler';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface Show {
  id: string;
  image: string;
  title: string;
  description: string;
  seasons: number;
  genres: number[];
  updated: string;
}

interface PodcastListProps {
  onShowClick: (podcastId: string) => void;
}

const PodcastList: React.FC<PodcastListProps> = ({ onShowClick }) => {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleShows, setVisibleShows] = useState(12);
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
    const filtered = shows.filter((show) => {
      const titleMatch = show.title
        .toLowerCase()
        .includes(filterInput.toLowerCase());

      if (selectedGenres.length === 0) {
        return titleMatch;
      }

      return (
        titleMatch &&
        show.genres.some((genreId) => selectedGenres.includes(genreId))
      );
    });

    const sorted = filtered.sort((a, b) =>
      sortOrder === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );

    setFilteredShows(sorted);
  }, [filterInput, selectedGenres, shows, sortOrder]);

  useEffect(() => {
    const sortedRecentness = filteredShows.sort((a, b) =>
      sortOrderRecentness === 'asc'
        ? a.updated.localeCompare(b.updated)
        : b.updated.localeCompare(a.updated)
    );
    setFilteredShows(sortedRecentness);
  }, [filteredShows, sortOrderRecentness]);

  const handleShowClick = (podcastId: string) => {
    onShowClick(podcastId);
  };

  const handleLoadMore = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setVisibleShows((prevVisibleShows) => prevVisibleShows + 8);
    } catch (error) {
      console.error('Something went wrong', error);
    }
  };

  const handleFilterInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterInput(event.target.value);
  };

  const getGenreTitles = (genreIds: number[]): JSX.Element[] =>
    genreIds.map((genreId) => (
      <span className="genre-pill" key={genreId}>
        {genreList[genreId]}
      </span>
    ));

  const handleGenreClick = (genreId: number) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };

  const handleSortByRecentness = () => {
    setSortOrderRecentness(sortOrderRecentness === 'asc' ? 'desc' : 'asc');
  };

  return (
    <ShowPodcastStyles>
      <div className="sliderDiv">
        <h1>Some Podcasts you may enjoy</h1>
        <Slider
          dots={true}
          speed={2000} // Transition speed in milliseconds
          slidesToShow={4} // Number of slides to show at a time
          slidesToScroll={3} // Number of slides to scroll per navigation
          prevArrow={<FaArrowLeft className="slider-arrow prev" />}
          nextArrow={<FaArrowRight className=" slider-arrow next" />}
        >
          {filteredShows.map(({ id, image, title, seasons }) => (
            <div className="show-card" key={id}>
              <img
                className="show-image"
                onClick={() => handleShowClick(id)}
                src={image}
                alt={title}
              />
              <h3 className="show-title">{title}</h3>
              <p className="show-seasons">Seasons: {seasons}</p>
            </div>
          ))}
        </Slider>
      </div>
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
        {filteredShows
          .slice(0, visibleShows)
          .map(
            ({ id, image, title, seasons, description, genres, updated }) => (
              <div className="show-card" key={id}>
                <div className="show-card-content">
                  <img
                    className="show-image"
                    onClick={() => handleShowClick(id)}
                    src={image}
                    alt={title}
                  />
                  <div className="show-details">
                    <h3 className="show-title">{title}</h3>
                    <p className="show-seasons">Seasons: {seasons}</p>
                    <p className="show-description">
                      {description.slice(0, 100)}...
                    </p>
                    <div className="genre-container">
                      <span className="genre-label">Genres</span>
                      <div className="genre-list">
                        <p className="show-genres">{getGenreTitles(genres)}</p>
                      </div>
                    </div>
                    <p className="show-updated">
                      Updated: {format(new Date(updated), 'MM/dd/yyyy')}
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
      </div>
      {visibleShows < filteredShows.length && (
        <div className="load-more">
          <Button onClick={handleLoadMore}>Load More</Button>
        </div>
      )}
      <div className="spinner">
        {loading && <MoonLoader size={50} color="#123abc" />}
      </div>
    </ShowPodcastStyles>
  );
};

export default PodcastList;
