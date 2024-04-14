import './App.css';

import {useState} from "react";

import { Controls } from './components/Controls';
import { CurrentlyReading } from './components/CurrentlyReading';
import { useSpeech } from './lib/useSpeech';
import { fetchContent, parseContentIntoSentences } from './lib/content';

function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);
  const { currentWordRange, currentSentenceIdx, play, pause, playbackState } = useSpeech(sentences);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null|string>(null);

  async function loadNewContent() {
    setIsLoading(true);
    setError(null);
    try {
      const parsedSentences = parseContentIntoSentences(await fetchContent());
      setSentences(parsedSentences);
      setIsLoading(false);
    } catch (error) {
      setError('Failed to fetch data');
      setIsLoading(false);
    }
  }

  return (
    <div className="App">
      <h1>Text to speech</h1>
      <div>
        <CurrentlyReading 
          sentences={sentences} 
          currentSentenceIdx={currentSentenceIdx} 
          currentWordRange={currentWordRange} />
      </div>
      <div>
        <Controls 
          play={play}
          pause={pause}
          state={playbackState}
          loadNewContent={loadNewContent} />
          
      </div>
    </div>
  );
}

export default App;
