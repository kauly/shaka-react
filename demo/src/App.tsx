import React from "react";
import ShakaReact from "shaka-react";
const posterImg = require("./poster.jpg");

const manifestUri =
  "https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd";

const hlsManifest =
  "https://d3bylyuywq99jd.cloudfront.net/ad188b41-38b6-4414-88f4-edfa0a6aa9ce/hls/joao_paulo_aula064_16-09-19.m3u8";

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
    manifest={hlsManifest}
    poster={posterImg}
    title="start"
    onDownloadEnd={onDown}
    onProgress={onProgress}
    onPause={onPause}
  />
);

export default App;
