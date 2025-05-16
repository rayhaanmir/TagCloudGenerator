import React from "react";
import "./TagCloud.css";

interface TagCloudProps {
  wordFreqs: [string, number][];
  maxFreq: number;
}

const TagCloud = ({ wordFreqs, maxFreq }: TagCloudProps) => {
  const getFontSize = (freq: number): number => {
    return (Math.log(freq + 1) / Math.log(maxFreq + 1)) * 50 + 10;
  };

  return (
    <>
      {wordFreqs.map((item) => (
        <p
          className="tag"
          key={item[0]}
          style={{ fontSize: getFontSize(item[1]) }}
        >
          {item[0]}
        </p>
      ))}
    </>
  );
};

export default TagCloud;
