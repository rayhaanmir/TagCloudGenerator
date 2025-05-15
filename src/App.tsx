import { useState } from "react";
import "./App.css";
import TextFileInput from "./components/TextFileInput/TextFileInput";
import TextInput from "./components/TextInput/TextInput";
import React from "react";

function App() {
  const [fileText, setFileText] = useState("");
  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const logText = (text: string) => console.log(text);
  return (
    <>
      <header className="main-header">Tag Cloud Generator</header>
      <div className="file-input">
        <TextFileInput onFileLoaded={setFileText} />
        <h1>Or</h1>
        <TextInput text={text} handleChange={handleChange} />
      </div>
      <div className="button-div">
        <button
          className="selection-button left"
          disabled={!fileText}
          onClick={() => logText(fileText)}
        >
          Generate tag cloud
          <br />
          from uploaded text
        </button>
        <button
          className="selection-button right"
          disabled={!text}
          onClick={() => logText(text)}
        >
          Generate tag cloud
          <br />
          from typed text
        </button>
      </div>
    </>
  );
}

export default App;
