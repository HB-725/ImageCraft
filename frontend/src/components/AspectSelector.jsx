import React from 'react';

const OPTIONS = ['16:9', '4:5', '1:1', '9:16'];

const AspectSelector = ({ aspectRatio, setAspectRatio }) => (
  <div className="mb-4">
    <label className="form-label fw-semibold">Select Aspect Ratio:</label>
    <div className="btn-group w-100" role="group">
      {OPTIONS.map(opt => (
        <button
          key={opt}
          type="button"
          className={
            aspectRatio === opt
              ? 'btn btn-primary'
              : 'btn btn-outline-primary'
          }
          onClick={() => setAspectRatio(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  </div>
);

export default AspectSelector;
