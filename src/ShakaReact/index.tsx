import * as React from "react";
import shaka from "shaka-player";

const initPlayer = async (pVideoRef: HTMLVideoElement, manifest: string) => {
  const player = new shaka.Player(pVideoRef);
  player.addEventListener("error", onError);
  try {
    await player.load(manifest);
    console.log("The video has now been loaded!");
  } catch (err) {
    onError(err);
  }
};

const initApp = (pVideoRef: HTMLVideoElement, manifest: string) => {
  shaka.polyfill.installAll();
  shaka.Player.isBrowserSupported()
    ? initPlayer(pVideoRef, manifest)
    : console.error("Browser not supported!");
};

const onError = (event: any) =>
  console.error("Error code", event.detail.code, "object", event.detail);

interface IShakaReactProps {
  id?: string;
  manifest: string;
  controls?: boolean;
  autoplay?: boolean;
  width?: string;
}

const ShakaReact = (props: IShakaReactProps) => {
  const videoRef = React.createRef<HTMLVideoElement>();
  React.useEffect(() => {
    initApp(videoRef, props.manifest);
  }, []);

  return (
    <video
      ref={videoRef}
      id={props.id}
      width={props.width}
      controls={props.controls}
      autoplay={props.autoplay}
    ></video>
  );
};

ShakaReact.defaultProps = {
  id: "video",
  width: "640",
  controls: true,
  autoplay: true
};

export default ShakaReact;
