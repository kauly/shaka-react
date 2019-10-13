import React from "react";
import ShakaReact from "shaka-react";
const posterImg = require("./poster.jpg");

const manifestUri =
  "https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd";

const onDown = (offUri: string): any => {
  console.log("TCL: offUri", offUri);
};

const onProgress = (currenTime: number) => {
  console.log("Progress: ", currenTime);
};

const onPause = (currenTime: number) => {
  console.log("Paused: ", currenTime);
};

const App = () => (
  <ShakaReact
    manifest={manifestUri}
    poster={posterImg}
    title="start"
    onDownloadEnd={onDown}
    onProgress={onProgress}
    onPause={onPause}
  />
);

export default App;
