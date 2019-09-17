import * as React from "react";
import * as ReactDOM from "react-dom";

import "shaka-player/dist/controls.css";
import shaka from "shaka-player/dist/shaka-player.ui.js";

import "./index.css";

import Trick from "./components/TrickButton";

const initPlayer = async (
  pVideoRef: HTMLVideoElement,
  manifest: string,
  setPlayer: (p: any) => void
) => {
  const ui = pVideoRef["ui"];
  const config = {
    controlPanelElements: [
      "rewind",
      "play_pause",
      "fast_forward",
      "time_and_duration",
      "mute",
      "volume",
      "fullscreen",
      "overflow_menu",
      "aa"
    ]
  };
  ui.configure(config);
  const controls = ui.getControls();
  const player = controls.getPlayer();
  // player.trickPlay(2);
  player.addEventListener("error", onError);
  controls.addEventListener("error", onError);

  // player.registerElement("kauly", btn);
  try {
    await player.load(manifest);
    console.log("The video has now been loaded!");
    setPlayer(player);
  } catch (err) {
    onError(err);
  }
};

const onError = (event: any) =>
  console.error("Error code", event.detail.code, "object", event.detail);

interface IShakaReactProps {
  id?: string;
  manifest: string;
  autoPlay?: boolean;
  width?: string;
}

const ShakaReact = (props: IShakaReactProps) => {
  const videoRef = React.createRef<HTMLVideoElement>();
  const containerRef = React.createRef<HTMLDivElement>();
  const [player, setPlayer] = React.useState<any>(null);

  React.useEffect(() => {
    document.addEventListener("shaka-ui-loaded", () =>
      initPlayer(videoRef.current, props.manifest, setPlayer)
    );

    shaka.ui.Controls.registerElement("aa", new Trick.Factory());
  }, []);

  return (
    <div
      data-shaka-player-container
      data-shaka-player-cast-receiver-id="7B25EC44"
      style={{ maxWidth: props.width }}
      ref={containerRef}
    >
      <video
        data-shaka-player
        ref={videoRef}
        id={props.id}
        style={{ width: "100%", height: "100%" }}
        autoPlay={props.autoPlay}
      ></video>
    </div>
  );
};

ShakaReact.defaultProps = {
  id: "video",
  width: "40em",
  autoPlay: false
};

export default ShakaReact;
