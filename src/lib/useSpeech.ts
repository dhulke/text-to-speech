import { useState, useEffect } from 'react';

import { PlayingState } from './speech';
import { createSpeechEngine, SpeechEngine } from './speech';

/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/
const useSpeech = (sentences: Array<string>) => {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [currentWordRange, setCurrentWordRange] = useState<[number, number]>([0, 0]);

  const [playbackState, setPlaybackState] = useState<PlayingState>("paused");
  const [speechEngine, setSpeechEngine] = useState<null | SpeechEngine>(null);

  useEffect(() => {
    setSpeechEngine(createSpeechEngine({
      onBoundary: (e: SpeechSynthesisEvent) => {
        setCurrentWordRange([e.charIndex, e.charIndex + e.charLength]);
      },
      onEnd: (e: SpeechSynthesisEvent) => {
        setCurrentSentenceIdx((value) => (value + 1) % sentences.length);
        setCurrentWordRange([0, 0]);
        console.log(currentSentenceIdx);
      },
      onStateUpdate: (state: PlayingState) => {
        console.log(state);
        setPlaybackState(state);
      }
    }));
  }, [sentences]);

  useEffect(() => {
    if (currentSentenceIdx !== 0) {
      play();
    }
  }, [currentSentenceIdx]);

  const play = () => {
    if (speechEngine) {
      speechEngine.load(sentences[currentSentenceIdx]);
      speechEngine.play();
    }
  };
  const pause = () => {
    if (speechEngine) {
      speechEngine.pause();
    }
  };

  return {
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    play,
    pause,
  };
};

export { useSpeech };
