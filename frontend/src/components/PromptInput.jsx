import React from 'react';

const PromptInput = ({ prompt, setPrompt }) => {
  // Handler for updating the prompt state
  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  return (
    <div className="prompt-input">
      <label>Enter Your Prompt:</label>
      <input 
        type="text" 
        value={prompt} 
        onChange={handlePromptChange} 
        placeholder="Describe your image..." 
      />
    </div>
  );
};

export default PromptInput;
