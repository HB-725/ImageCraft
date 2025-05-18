import React, { useState } from "react";
import UploadForm from "./components/UploadForm";
import AspectSelector from "./components/AspectSelector";
import PromptInput from "./components/PromptInput";
import GenerateSection from "./components/GenerateSection";
import LoginForm from "./components/LoginForm";

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [file, setFile] = useState(null); // raw file for backend upload
  const [image, setImage] = useState(null); // user uploaded image URL
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [prompt, setPrompt] = useState("");

  // if not logged in, show only the login form
  if (!token) {
    return <LoginForm onLogin={(t) => setToken(t)} />;
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">ImageCraft Platform</h1>

      {/* pass setFile here alongside setImage */}
      <UploadForm image={image} setImage={setImage} setFile={setFile} />

      <AspectSelector
        aspectRatio={aspectRatio}
        setAspectRatio={setAspectRatio}
      />

      <PromptInput prompt={prompt} setPrompt={setPrompt} />

      <GenerateSection file={file} aspectRatio={aspectRatio} prompt={prompt} />
    </div>
  );
}

export default App;
