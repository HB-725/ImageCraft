import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import ImageDisplay from './components/ImageDisplay';
import AspectSelector from './components/AspectSelector';
import PromptInput from './components/PromptInput';
import './assets/styles.css';

const App = () => {
  // State for holding image and aspect ratio
  const [image, setImage] = useState(null);
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [prompt, setPrompt] = useState('');


  return (
    <div className="app-container">
      <h1>ImageCraft Platform</h1>

      <p>Upload an image and describe it to generate a new one!</p>

      {/* Upload form for selecting an image */}
      <UploadForm setImage={setImage} />

      {/* Aspect ratio selector for the image */}
      <AspectSelector setAspectRatio={setAspectRatio} />
      
      {/* Prompt input for user to describe the image */}
      <PromptInput prompt={prompt} setPrompt={setPrompt} />

      {/* Display the uploaded image with the selected aspect ratio */}
      {image && <ImageDisplay image={image} aspectRatio={aspectRatio} />}
    </div>
  );
};

export default App;
