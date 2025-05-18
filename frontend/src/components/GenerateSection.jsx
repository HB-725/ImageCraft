import React, { useState } from "react";

const GenerateSection = ({ image, aspectRatio, prompt }) => {
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState(null);

  const handleSubmit = async () => {
    if (!image) return alert("Please upload an image first.");
    if (!prompt.trim()) return alert("Please enter a prompt.");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("aspectRatio", aspectRatio);
    formData.append("prompt", prompt);

    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Server error");
      const data = await res.json(); // expect { imageUrl: '...' }
      setResultUrl(data.imageUrl);
    } catch (err) {
      console.error(err);
      alert("Failed to generate image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="generate-section mb-4">
      <button
        className="btn btn-primary"
        onClick={handleSubmit}
        disabled={loading || !image || !prompt.trim()}
      >
        {loading ? "Generating…" : "Submit"}
      </button>

      {resultUrl && (
        <div className="mt-4 text-center">
          <h5>Result:</h5>
          <img
            src={resultUrl}
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
