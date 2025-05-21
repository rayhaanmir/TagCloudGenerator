import React, { useEffect } from "react";
import "./TagCloud.css";

interface TagCloudProps {
  wordFreqs: [string, number][];
  maxFreq: number;
  minFreq: number;
  onRenderComplete?: () => void;
}

const TagCloud = ({
  wordFreqs,
  maxFreq,
  minFreq,
  onRenderComplete,
}: TagCloudProps) => {
  const getFontSize = (freq: number): number => {
    return (
      (Math.log(freq - minFreq + 1) / Math.log(maxFreq - minFreq + 1)) * 50 + 20
    );
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
