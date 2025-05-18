import { useRef, useState } from "react";
import "./App.css";
import TextFileInput from "./components/TextFileInput/TextFileInput";
import TextInput from "./components/TextInput/TextInput";
import React from "react";
import TagCloud from "./components/TagCloud/TagCloud";
import { FaCloud } from "react-icons/fa";

function App() {
  const [fileText, setFileText] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [wordFreqs, setWordFreqs] = useState<[string, number][]>([]);
  const [maxFreq, setMaxFreq] = useState<number>(0);
  const [maxWords, setMaxWords] = useState<string>("");
  const startTime = useRef<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleGenerate = (text: string) => {
    startTime.current = performance.now();
    const tokens = text
      .toLocaleLowerCase()
      .replace(/’/g, "'") // Normalize apostrophes
      .split(
        /(?<![A-Za-zÀ-ÖØ-öø-ÿ])'|'(?![A-Za-zÀ-ÖØ-öø-ÿ])|[^A-Za-zÀ-ÖØ-öø-ÿ']+/
      ) // Preserve contractions
      .filter(Boolean); // Get rid of empty tokens
    const map = new Map(); // Create word frequency map
    const len = tokens.length;
    for (let i = 0; i < len; i++) {
      const word = tokens[i];
      if (!map.has(word)) {
        map.set(word, 1);
      } else {
        map.set(word, map.get(word) + 1);
      }
    }
    const correctedMap = new Map();
    for (const [key, value] of map) {
      const newKey = key.startsWith("i'") ? key.replace(/^i'/, "I'") : key;
      correctedMap.set(newKey, value);
    }
    if (correctedMap.has("i")) {
      correctedMap.set("I", correctedMap.get("i"));
      correctedMap.delete("i");
    }
    const wordFreqsLocal: [string, number][] = [...correctedMap];
    let uniqueLen = wordFreqsLocal.length;
    // Shorten array if necessary
    const maxWordsNum: number = parseInt(maxWords);
    if (maxWordsNum < uniqueLen) {
      wordFreqsLocal.sort(
        (e1, e2) => e2[1] - e1[1] // Sort by descending word frequencies
      );
      wordFreqsLocal.splice(maxWordsNum);
      uniqueLen = maxWordsNum;
    }
    wordFreqsLocal.sort(
      (e1, e2) => e1[0].localeCompare(e2[0]) // Sort alphabetically
    );
    let max = 0;
    for (let i = 0; i < uniqueLen; i++) {
      if (wordFreqsLocal[i][1] > max) {
        max = wordFreqsLocal[i][1];
      }
    }
    setMaxFreq(max);
    setWordFreqs(wordFreqsLocal);
  };

  const handleRenderComplete = () => {
    if (startTime.current !== null) {
      const elapsed = performance.now() - startTime.current;
      console.log(
        `Tag cloud generated in ${(elapsed / 1000).toFixed(3)} seconds`
      );
      startTime.current = null; // Reset
    }
  };

  const handleSetMaxWords = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only permit number sequences not starting with 0 to represent
    // max word counts (positive integers or empty string)
    if (/^([1-9]\d*|)$/.test(value)) {
      setMaxWords(value);
    }
  };

  return (
    <div className="app">
      <header className="main-header">
        Tag Cloud Generator
        <FaCloud />
      </header>
      <div className="file-input">
        <TextFileInput onFileLoaded={setFileText} />
        <h1>Or</h1>
        <TextInput text={text} handleChange={handleChange} />
      </div>
      <input
        className="input-max"
        value={maxWords}
        onChange={handleSetMaxWords}
        placeholder="Max word count (Optional)"
      />
      <div className="button-div">
        <button
          className="selection-button left"
          disabled={!fileText}
          onClick={() => handleGenerate(fileText)}
        >
          Generate tag cloud
          <br />
          from uploaded text
        </button>
        <button
          className="selection-button right"
          disabled={!text}
          onClick={() => handleGenerate(text)}
        >
          Generate tag cloud
          <br />
          from typed text
        </button>
      </div>
      <div className="tag-cloud">
        <TagCloud
          wordFreqs={wordFreqs}
          maxFreq={maxFreq}
          onRenderComplete={handleRenderComplete}
        />
      </div>
    </div>
  );
}

export default App;
