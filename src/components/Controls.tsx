import { useState } from 'react';

import { PlayingState } from '../lib/speech';

/*
 * Implement a component that provides basic UI options such as playing, pausing and loading new content
 * This component should have the following,
 * - A button with text "Play" if the player is not playing
 * - A button with text "Pause" if the player is playing
 * - A button with text "Load new content" that loads new content from the API
 */
export const Controls = ({
  play,
  pause,
  loadNewContent,
  state,
}: {
  play: () => void;
  pause: () => void;
  loadNewContent: () => void;
  state: PlayingState;
}) => {
  function playPause() {
    if (state !== "playing") {
      play();
    } else {
      pause();
    }
  }
  return <div>
    <button onClick={playPause}>{state === "playing" ? "Pause" : "Play"}</button>
    <button onClick={loadNewContent}>Load new content</button>
  </div>;
};
