import { useState } from "react";
import "./App.css";
import TextFileInput from "./components/TextFileInput/TextFileInput";
import TextInput from "./components/TextInput/TextInput";

function App() {
  const [text, setText] = useState("");
  return (
    <>
      <header className="main-header">Tag Cloud Generator</header>
      <div className="file-input">
        <TextFileInput onFileLoaded={setText} />
        <h1>Or</h1>
        <TextInput />
      </div>
      {text && console.log(text.split(/[^A-Za-z]/).filter(Boolean))}
    </>
  );
}

export default App;
