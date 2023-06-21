import { createAction } from '@reduxjs/toolkit';

export interface SelectEpisode {
  title: string; // Represents the title of the selected episode
  description: string; // Represents the description of the selected episode
}

// Create an action using the createAction function from Redux Toolkit.
// The action type is 'player/SET_SELECTED_EPISODE', and the payload is of type SelectEpisode.
export const setSelectedEpisode = createAction<SelectEpisode>(
  'player/SET_SELECTED_EPISODE'
);
