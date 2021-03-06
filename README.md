# SHAKA-REACT

## About

A React wrapper around the [shaka-player](https://shaka-player-demo.appspot.com/docs/api/index.html). I build this library specific for a client, but you can use with fit to yours needs. The player can play HLS and DASH content.

## Install

```yarn add shaka-react```

or

```npm i shaka-react```


## Usage

See the [demo](https://github.com/kauly/shaka-react/tree/master/demo) folder for implementation.

```javascript
import React from "react";
import ShakaReact from "shaka-react";
import posterImg from "./poster.jpg";


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

```
## API

| name     | type    | desc                                            |
| -------- | ------- | ----------------------------------------------- |
| manifest | string  | url of the video source                         |
| poster   | string  | path or url to a image                          |
| autoPlay | boolean | in some browser will depend on user permissions |
| title    | string  | this is only used to name the offline video     |

