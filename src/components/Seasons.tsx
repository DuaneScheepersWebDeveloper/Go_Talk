import React from 'react';

import { SeasonsStyles } from './AppStyles';

interface Season {
  season: number;
  title: string;
}

interface SeasonSelectorProps {
  seasons: Season[];
  selectedSeason: number;
  onSelectSeason: (season: number) => void;
}

const Seasons: React.FC<SeasonSelectorProps> = ({
  seasons,
  selectedSeason,
  onSelectSeason,
}) => {
  const handleSeasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const season = parseInt(event.target.value);
    onSelectSeason(season);
  };

  return (
    <SeasonsStyles>
      <label htmlFor="season-select">Select Season:</label>
      <select
        id="season-select"
        value={selectedSeason}
        onChange={handleSeasonChange}
      >
        {seasons.map((season) => (
          <option key={season.season} value={season.season}>
            {season.title}
          </option>
        ))}
      </select>
    </SeasonsStyles>
  );
};

export default Seasons;
