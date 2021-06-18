import { useCallback, useState } from 'react';
import nouns from './database/nouns.json';
import adjectives from './database/adjectives.json';

import addIcon from './outline_add_black_24dp.png';
import removeIcon from './outline_remove_black_24dp.png';
import refreshIcon from './outline_refresh_black_24dp.png';
import assignmentIcon from './outline_assignment_black_24dp.png';

import './App.css';

function choose(choices: string[]) {
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function pickWords(size: number) {
  return new Array(size).fill(null).map((_, i) => {
    if (i % 2 === 0) {
      return choose(adjectives);
    }
    return choose(nouns);
  });
}

function App() {
  const [words, setWords] = useState<string[]>(pickWords(4));
  const addWord = useCallback(() => {
    const newWord = words.length % 2 === 0 ? choose(adjectives) : choose(nouns);
    setWords((words) => [...words, newWord]);
  }, [setWords]);

  const removeWord = useCallback(() => {
    setWords((words) => words.slice(0, -1));
  }, [setWords]);

  const reloadWords = useCallback(() => {
    setWords((words) => pickWords(words.length));
  }, [setWords]);

  return (
    <div className="app">
      <div className="word-block">
        {words.map((word, i) => (
          <div key={i} className="word">
            {word}
          </div>
        ))}
      </div>
      <div className="button-block">
        <img src={addIcon} onClick={addWord} />
        <img src={removeIcon} onClick={removeWord} />
        <img src={refreshIcon} onClick={reloadWords} />
        <img src={assignmentIcon} />
      </div>
    </div>
  );
}

export default App;
