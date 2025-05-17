import React, { useEffect } from "react";
import "./TagCloud.css";

interface TagCloudProps {
  wordFreqs: [string, number][];
  maxFreq: number;
  onRenderComplete?: () => void;
}

const TagCloud = ({ wordFreqs, maxFreq, onRenderComplete }: TagCloudProps) => {
  const getFontSize = (freq: number): number => {
    return (Math.log(freq + 1) / Math.log(maxFreq + 1)) * 50 + 10;
  };

  useEffect(() => {
    if (onRenderComplete) {
      requestAnimationFrame(() => {
        onRenderComplete();
      });
    }
  }, [wordFreqs]);

  return (
    <>
      {wordFreqs.map((item) => {
        const fontSize: number = getFontSize(item[1]);
        return (
          <p
            className="tag"
            key={item[0]}
            style={{
              fontSize: fontSize,
              color: `hsl(${fontSize * 2}, 100%, 50%)`,
            }}
            title={`Word frequency: ${item[1]}`}
          >
            {item[0]}
          </p>
        );
      })}
    </>
  );
};

export default TagCloud;
