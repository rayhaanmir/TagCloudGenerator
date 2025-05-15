import React, { useRef, useState } from "react";
import { FiFileText } from "react-icons/fi";
import "./TextFileInput.css";

interface TextFileInputProps {
  onFileLoaded: (text: string) => void;
}

const TextFileInput = ({ onFileLoaded }: TextFileInputProps) => {
  const [fileName, setFileName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        onFileLoaded(text);
      };
      reader.readAsText(file);
    }
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="file-button-and-message">
      <button className="file-button" onClick={handleButtonClick}>
        Upload Text File
        <FiFileText />
      </button>
      <input
        type="file"
        accept=".txt"
        onChange={handleFileChange}
        style={{ display: "none" }}
        ref={inputRef}
      ></input>

      <p className="file-message">
        {fileName ? `Loaded file: ${fileName}` : "No file currently loaded"}
      </p>
    </div>
  );
};

export default TextFileInput;
