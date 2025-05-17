import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import AspectSelector from './components/AspectSelector';
import PromptInput from './components/PromptInput';
import GenerateSection from './components/GenerateSection';

function App() {
  const [image, setImage]             = useState(null);  // preview URL
  const [file, setFile]               = useState(null);  // raw File object
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [prompt, setPrompt]           = useState('');

  return (
    <div className="container py-5">
      <h1 className="mb-4">ImageCraft Platform</h1>

      {/* pass setFile here alongside setImage */}
      <UploadForm 
        image={image} 
        setImage={setImage} 
        file={file}
        setFile={setFile} 
      />

      <AspectSelector
        aspectRatio={aspectRatio}
        setAspectRatio={setAspectRatio}
      />

      <PromptInput 
        prompt={prompt} 
        setPrompt={setPrompt} 
      />

      <GenerateSection
        file={file}
        aspectRatio={aspectRatio}
        prompt={prompt}
      />

    </div>
  );
}

export default App;
