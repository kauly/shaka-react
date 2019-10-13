import * as React from "react";
import muxjs from "mux.js";
import "shaka-player/dist/controls.css";
import shaka from "shaka-player/dist/shaka-player.ui.js";
import Trick from "./components/TrickButton";
import Download from "./components/DownloadButton";

const uiConfig = {
  controlPanelElements: [
    "play_pause",
    "trick",
    "down",
    "time_and_duration",
    "mute",
    "volume",
    "fullscreen",
    "overflow_menu"
  ],
  overflowMenuButtons: ["captions", "cast", "quality", "picture_in_picture"]
};

const initPlayer = async (
  pVideoRef: HTMLVideoElement,
  pContainerRef: HTMLDivElement,
  setPlayer: (p: any) => void,
  setOffStorage: (p: any) => void,
  setUI: (p: any) => void,
  props: IShakaReactProps
) => {
  if (!shaka.Player.isBrowserSupported()) {
    console.error("Browser not suport");
    return;
  }
  const player = new shaka.Player(pVideoRef);
  const ui = new shaka.ui.Overlay(player, pContainerRef, pVideoRef);
  const offStorage = new shaka.offline.Storage();
  const trickBtn = new Trick.Factory();
  const downBtn = new Download.Factory({
    storage: offStorage,
    title: props.title || "demo",
    manifest: props.manifest,
    onDownloadEnd: props.onDownloadEnd
  });

  shaka.ui.Controls.registerElement("trick", trickBtn);
  shaka.ui.Controls.registerElement("down", downBtn);

  ui.configure(uiConfig);

  player.addEventListener("error", onError);
  player.addEventListener("buffering", ({ buffering }: any) => {
    if (!buffering) {
      pContainerRef.childNodes[2].setAtribute(
        "class",
        "shaka-spinner-container shaka-hidden"
      );
    }
  });
  props.onProgress &&
    pVideoRef.addEventListener("timeupdate", (p: any) =>
      props.onProgress(pVideoRef.currentTime)
    );

  props.onPause &&
    pVideoRef.addEventListener("pause", (p: any) =>
      props.onPause(pVideoRef.currentTime)
    );

  try {
    await player.load(props.manifest, props.initialTime);
    console.log("The video has now been loaded!");
    setUI(ui);
    setPlayer(player);
    setOffStorage(offStorage);
  } catch (err) {
    console.log("TCL: err", err);
    onError(err);
  }
};

const onError = (event: any) => {
  console.log(event);
  console.error("Error code", event.code, "object", event);
};

interface IShakaReactProps {
  id?: string;
  manifest: string;
  autoPlay?: boolean;
  width?: string;
  poster?: string;
  title?: string;
  initialTime?: number; //seconds
  onDownloadEnd?: (uri: string) => any;
  onProgress?: (currentTime: number) => any;
  onPause?: (currentTime: number) => any;
}

const ShakaReact = (props: IShakaReactProps) => {
  const videoRef = React.createRef<HTMLVideoElement>();
  const containerRef = React.createRef<HTMLDivElement>();
  const [player, setPlayer] = React.useState<any>(null);
  const [uiObj, setUIObj] = React.useState<any>(null);
  const [shakaStorage, setShakaStorage] = React.useState<any>(null);

  React.useEffect(() => {
    const iOS =
      !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

    // @ts-ignore
    window.muxjs = iOS ? null : muxjs;
    initPlayer(
      videoRef.current,
      containerRef.current,
      setPlayer,
      setShakaStorage,
      setUIObj,
      { ...props }
    );

    return () => {
      player.destroy();
      uiObj.destroy();
      shakaStorage.destroy();
    };
  }, []);

  return (
    <div
      data-shaka-player-cast-receiver-id="7B25EC44"
      style={{ maxWidth: props.width }}
      ref={containerRef}
    >
      <video
        ref={videoRef}
        style={{ width: "100%", height: "100%" }}
        poster={props.poster ? props.poster : undefined}
        autoPlay={props.autoPlay}
      ></video>
    </div>
  );
};

ShakaReact.defaultProps = {
  id: "video",
  width: "40em",
  autoPlay: true,
  title: null,
  initialTime: 0,
  onDownloadEnd: null,
  onProgress: null,
  onPause: null
};

export default ShakaReact;
