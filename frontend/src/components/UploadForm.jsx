// src/components/UploadForm.jsx
import React, { useState } from 'react';

const UploadForm = ({ image, setImage, file, setFile }) => {
  const [dragActive, setDragActive] = useState(false);

  // central file handler
  const handleFileObject = (file) => {
    setFile(file);
    setImage(URL.createObjectURL(file));
  };

  // when dropped
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files[0]) {
      handleFileObject(e.dataTransfer.files[0]);
    }
  };

  // drag enter/over/leave
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else {
      setDragActive(false);
    }
  };

  // open file picker
  const openFile = () => {
    document.getElementById('fileInput').click();
  };

  // picker change
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      handleFileObject(e.target.files[0]);
    }
  };

  return (
    <div className="mb-4">
      {!image ? (
        /* drag‑drop box */
        <div
          className={`border rounded p-5 text-center ${dragActive ? 'bg-light' : ''}`}
          style={{ cursor: 'pointer' }}
          onClick={openFile}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="d-none"
          />
          <p className="mb-0 text-secondary">
            Drag &amp; drop an image here,
            <br />
            or click to select
          </p>
        </div>
      ) : (
        /* preview + click‑to‑replace */
        <div onClick={openFile} style={{ cursor: 'pointer' }}>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="d-none"
          />
            <img
            src={image}
            alt="Uploaded"
            className="img-fluid rounded mx-auto d-block"
            style={{
                maxHeight: '200px',     // or '50vh'
                width: 'auto',
                objectFit: 'cover',
            }}
            />

          <p className="text-center small text-muted mt-2">
            Click image to replace
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
