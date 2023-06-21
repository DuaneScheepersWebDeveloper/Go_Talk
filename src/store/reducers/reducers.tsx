import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Episode {
  episode: number;
  title: string;
  description: string;
  show: string;
  season: number;
  showImage: string;
}

interface PlayerState {
  selectedEpisode: {
    title: string;
    description: string;
    file: File | null;
  };
  favoriteEpisodes: Episode[]; // Add the favoriteEpisodes state property
}

const initialState: PlayerState = {
  selectedEpisode: {
    title: '',
    description: '',
    file: null,
  },
  favoriteEpisodes: [], // Set the initial value for favoriteEpisodes
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setSelectedEpisode: (
      state,
      action: PayloadAction<PlayerState['selectedEpisode']>
    ) => {
      state.selectedEpisode = action.payload;
    },
    addFavoriteEpisode: (state, action: PayloadAction<Episode>) => {
      state.favoriteEpisodes.push(action.payload);
    },
    removeFavoriteEpisode: (
      state,
      action: PayloadAction<number> // Assuming episode is identified by its number
    ) => {
      state.favoriteEpisodes = state.favoriteEpisodes.filter(
        (episode) => episode.episode !== action.payload
      );
    },
  },
});

export const { setSelectedEpisode, addFavoriteEpisode, removeFavoriteEpisode } =
  playerSlice.actions;

export default playerSlice.reducer;
