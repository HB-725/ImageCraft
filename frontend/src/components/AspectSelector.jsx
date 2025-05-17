import React from 'react';

const AspectSelector = ({ setAspectRatio }) => {
  return (
    <div className="aspect-selector">
      <label>Select Aspect Ratio:</label>
      <select onChange={(e) => setAspectRatio(e.target.value)}>
        <option value="16:9">16:9</option>
        <option value="4:5">4:5</option>
        <option value="1:1">1:1</option>
        <option value="9:16">9:16</option>
      </select>
    </div>
  );
};

export default AspectSelector;
