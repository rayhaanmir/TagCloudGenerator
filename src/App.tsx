import { useState } from "react";
import "./App.css";
import TextFileInput from "./components/TextFileInput/TextFileInput";
import TextInput from "./components/TextInput/TextInput";
import React from "react";
import TagCloud from "./components/TagCloud/TagCloud";
import { FaCloud } from "react-icons/fa";

function App() {
  const [fileText, setFileText] = useState("");
  const [text, setText] = useState("");
  const [wordFreqs, setWordFreqs] = useState<[string, number][]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleGenerate = (text: string) => {
    const tokens = text
      .toLocaleLowerCase()
      .split(
        /(?<![A-Za-zÀ-ÖØ-öø-ÿ])'|'(?![A-Za-zÀ-ÖØ-öø-ÿ])|[^A-Za-zÀ-ÖØ-öø-ÿ']+/
      ) // Preserve contractions
      .filter(Boolean);
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
    const wordFreqs: [string, number][] = [...correctedMap];
    // wordFreqs.sort(
    //   (e1, e2) => e2[1] - e1[1] // Sort by descending word frequencies
    // );
    setWordFreqs(wordFreqs);
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
        <TagCloud wordFreqs={wordFreqs} />
      </div>
    </div>
  );
}

export default App;
