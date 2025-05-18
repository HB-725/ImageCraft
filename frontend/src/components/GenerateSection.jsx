import React, { useState } from "react";

const GenerateSection = ({ file, aspectRatio, prompt }) => {
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState(null);

  const handleSubmit = async () => {
    if (!file) return alert("Please upload an image first.");
    if (!prompt.trim()) return alert("Please enter a prompt.");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("aspectRatio", aspectRatio);
    formData.append("prompt", prompt);

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/generate/", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Server error");
      const data = await res.json(); // { imageData: 'base64...' }
      setResultUrl(data.imageData);
    } catch (err) {
      console.error(err);
      alert("Failed to generate image.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!resultUrl) return;
    const link = document.createElement("a");
    link.href = `data:image/jpeg;base64,${resultUrl}`;
    link.download = "generated.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="generate-section mb-4">
      {/* Flex container for buttons */}
      <div className="d-flex justify-content-between mb-3">
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={loading || !file || !prompt.trim()}
        >
          {loading ? "Generating…" : "Submit"}
        </button>

        {/* Only show Download if we have a result */}
        {resultUrl && (
          <button className="btn btn-primary" onClick={handleDownload}>
            Download
          </button>
        )}
      </div>

      {resultUrl && (
        <div className="text-center">
          <h5>Result:</h5>
          <img
            src={`data:image/jpeg;base64,${resultUrl}`}
            alt="Generated result"
            className="img-fluid rounded mx-auto d-block"
            style={{ maxHeight: 300, objectFit: "cover" }}
          />
        </div>
      )}
    </div>
  );
};

export default GenerateSection;
