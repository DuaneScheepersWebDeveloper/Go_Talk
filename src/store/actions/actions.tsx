import { createAction, PayloadAction } from '@reduxjs/toolkit';

export interface SelectEpisode {
  title: string;
  description: string;
}

// Create an action using the createAction function from Redux Toolkit.
// The action type is 'player/SET_SELECTED_EPISODE', and the payload is of type Episode.
export const setSelectedEpisode = createAction<SelectEpisode>(
  'player/SET_SELECTED_EPISODE'
);
