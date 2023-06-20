import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MoonLoader from 'react-spinners/MoonLoader';
import { setSelectedEpisode } from '../store/actions/actions';
import { RootState } from '../store/store';
import { PodcastPlayerStyles } from './AppStyles';

const Player: React.FC = () => {
  const selectedEpisode = useSelector(
    (state: RootState) => state.player.selectedEpisode
  );
  const dispatch = useDispatch();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (selectedEpisode) {
      const { file } = selectedEpisode;
      if (file) {
        const fileURL = URL.createObjectURL(file);
        audioRef.current!.src = fileURL;
        audioRef.current!.play();
      }
    }
  }, [selectedEpisode]);

  if (!selectedEpisode) {
    return (
      <div className="audio-loader">
        <div className="audio">
          <MoonLoader color="" loading={true} size={60} />
        </div>
      </div>
    );
  }

  return (
    <PodcastPlayerStyles>
      <div className="audio">
        <h2>{selectedEpisode.title}</h2>
        <p>{selectedEpisode.description}</p>
        <audio id="audioPlayer" ref={audioRef} controls />
      </div>
    </PodcastPlayerStyles>
  );
};

export default Player;
// https://podcast-api.netlify.app/id/5279
