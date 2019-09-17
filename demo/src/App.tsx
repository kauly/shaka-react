import * as React from "react";
import Shaka from "./ShakaReact";

const manifestUri =
  "https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd";

const App = () => <Shaka manifest={manifestUri} />;

export default App;
