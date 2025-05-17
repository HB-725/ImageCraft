import React from 'react';

const UploadForm = ({ setImage }) => {
  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="upload-form">
      <input type="file" accept="image/*" onChange={handleImageChange} />
    </div>
  );
};

export default UploadForm;
