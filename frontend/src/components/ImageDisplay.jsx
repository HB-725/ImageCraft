import React from 'react';

const ImageDisplay = ({ image, aspectRatio }) => {
  return (
    <div className="image-display">
      <h3>Preview:</h3>
      <img src={image} alt="Uploaded Preview" style={{ aspectRatio: aspectRatio }} />
    </div>
  );
};

export default ImageDisplay;
