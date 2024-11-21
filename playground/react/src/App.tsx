import React from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";

import AdvancedImage from "./components/AdvancedImage";
import AdvancedVideo from "./components/AdvancedVideo";

// This is our playground and can be used to test library

function App() {
  const navigate = useNavigate();
  const onClick = (path: string) => () => navigate(path);

  return (
    <main>
      <h1>Cloudinary React Playground</h1>
      <nav>
        <button onClick={onClick('/advanced-image')}>Advanced Image Demo</button>
        <button onClick={onClick('/advanced-video')}>Advanced Video Demo</button>
      </nav>
      
      <Routes>
        <Route path="/advanced-image" element={<AdvancedImage />} />
        <Route path="/advanced-video" element={<AdvancedVideo />} />
      </Routes>
    </main>
  );
}

export default App;
