import React from "react";
import "./TagCloud.css";

interface TagCloudProps {
  wordFreqs: [string, number][];
}

const TagCloud = ({ wordFreqs }: TagCloudProps) => {
  return (
    <>
      {wordFreqs.map((item) => (
        <>
          <p>
            "{item[0]}" has a frequency of {item[1]}
          </p>
          <br />
        </>
      ))}
    </>
  );
};

export default TagCloud;
