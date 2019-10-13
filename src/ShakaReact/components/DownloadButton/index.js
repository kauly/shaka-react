import shaka from "shaka-player/dist/shaka-player.ui.js";
import "./index.css";

class DownloadButton extends shaka.ui.Element {
  constructor(parent, controls, downloadProps) {
    super(parent, controls);
    this.storage_ = downloadProps.storage;
    this.manifest_ = downloadProps.manifest;
    this.videoTitle_ = downloadProps.title;
    this.loading_ = false;
    this.button_ = this.createBtn();
    this.loader_ = this.createLoading();
    this.onDownloadEnd_ = downloadProps.onDownloadEnd;
    this.parent.appendChild(this.button_);
    this.parent.appendChild(this.loader_);
    this.eventManager.listen(this.button_, "click", () => {
      console.log("downn");

      this.downloadVideo();
    });
  }

  createBtn() {
    const btn = document.createElement("button");
    btn.setAttribute("class", "material-icons downBtn");
    btn.innerText = "get_app";

    return btn;
  }
  createLoading() {
    const father = document.createElement("div");
    father.appendChild(document.createElement("div"));
    father.appendChild(document.createElement("div"));
    father.appendChild(document.createElement("div"));
    father.appendChild(document.createElement("div"));
    father.setAttribute("class", "lds-ring hide");
    return father;
  }

  downloadVideo() {
    this.button_.setAttribute("class", "hide");
    this.loader_.setAttribute("class", "lds-ring show");
    this.storage_.configure({
      progressCallback: this.onProgress.bind(this)
    });
    const metadata = {
      title: this.videoTitle_,
      downloaded: new Date()
    };
    this.storage_.store(this.manifest_, metadata);
  }
  async getOffURI() {
    try {
      const contentList = await this.storage_.list();
      return contentList.find(
        video => video.appMetadata.title === this.videoTitle_
      );
    } catch (err) {
      return null;
    }
  }

  onProgress(manifest, progress) {
    if (progress === 1) {
      this.loading_ = false;
      this.button_.setAttribute("class", "material-icons downBtn");
      this.loader_.setAttribute("class", "hide");
      this.getOffURI().then(v => {
        if (this.onDownloadEnd_) {
          return this.onDownloadEnd_(v);
        }
      });
    }
  }
}

DownloadButton.Factory = class {
  constructor(downloadProps) {
    this.downloadProps = downloadProps;
  }
  create(rootElement, controls) {
    return new DownloadButton(rootElement, controls, this.downloadProps);
  }
};

export default DownloadButton;
