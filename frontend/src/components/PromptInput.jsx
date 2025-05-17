import React, { useRef, useEffect } from 'react';
import '../style/PromptInput.css'; // Import your CSS file

const PromptInput = ({ prompt, setPrompt }) => {
  const textareaRef = useRef(null);

  // Auto‑resize on content change
  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';                    // reset height
      ta.style.height = ta.scrollHeight + 'px';    // expand to fit content
    }
  }, [prompt]);

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  return (
    <div className="prompt-input">
      <label>Enter Your Prompt:</label>
      <textarea
        ref={textareaRef}
        className="prompt-textarea"
        value={prompt}
        onChange={handleChange}
        placeholder="Describe your image..."
        rows={1}               // start at one row
      />
    </div>
  );
};

export default PromptInput;
