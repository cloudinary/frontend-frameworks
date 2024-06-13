import React from "react";
import "../App.css";
import {
  AdvancedVideo,
  lazyload,
} from "@cloudinary/react";
import { CloudinaryVideo } from "@cloudinary/url-gen/assets/CloudinaryVideo";
import { fill } from "@cloudinary/url-gen/actions/resize";

// This is our playground and can be used to test library
function App() {
  const cldVid = new CloudinaryVideo(
    "docs/walking_talking",
    { cloudName: "demo" },
    { analytics: false }
  );

  cldVid.resize(fill().width(600).height(600));

  return (
    <article>
      <h2>Advanced Video Demo</h2>

      <AdvancedVideo
        cldVid={cldVid}
        controls
        loop
        plugins={[lazyload()]}
      />
    </article>
  );
}

export default App;
