import React from "react";
import "../App.css";
import {
  AdvancedImage,
  accessibility,
  responsive,
  lazyload,
  placeholder,
} from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen/assets/CloudinaryImage";

// This is our playground and can be used to test library
function App() {
  const img = new CloudinaryImage("sample", { cloudName: "demo" });

  return (
    <article>
      <h2>Advanced Image Demo</h2>

      <AdvancedImage
        cldImg={img}
        plugins={[
          lazyload(),
          responsive({ steps: 100 }),
          accessibility({ mode: "darkmode" }),
          placeholder(),
        ]}
        className="responsive-image"
      />
    </article>
  );
}

export default App;
