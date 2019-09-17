import shaka from "shaka-player/dist/shaka-player.ui.js";
import "./index.css";
import Popper from "popper.js";

class SkipButton extends shaka.ui.Element {
  constructor(parent, controls) {
    super(parent, controls);

    this.count = 0;
    this.values = ["2.0x", "1.5x", "1.0x"];
    this.menuOpen = false;
    this.button_ = this.createBtn();
    this.parent.appendChild(this.button_);
    this.trickMenu_ = this.createMenu();
    this.parent.appendChild(this.trickMenu_);

    this.pop();
    this.eventManager.listen(this.button_, "click", () => {
      console.log("clicklcikkclkci");
      // this.player.trickPlay(2);
      this.menuCtrl();
    });
  }

  pop() {
    new Popper(
      document.getElementById("btnRef"),
      document.getElementById("trickMenu"),
      {
        placement: "top-end"
      }
    );
  }

  menuCtrl() {
    this.menuOpen = !this.menuOpen;
    this.trickMenu_.setAttribute(
      "class",
      `${this.menuOpen ? "show" : "hide"} menuContainer`
    );
  }

  createBtn() {
    let button = document.createElement("span");
    button.textContent = this.values[this.count];
    button.setAttribute("class", "container");
    button.setAttribute("id", "btnRef");
    return button;
  }

  createMenu() {
    let trickMenu = document.createElement("div");
    trickMenu.setAttribute("id", "trickMenu");
    trickMenu.setAttribute("class", "hide menuContainer");
    this.values.forEach(opt => {
      let item = document.createElement("span");
      item.setAttribute("class", "menuItem");
      item.addEventListener("click");
      item.textContent = opt;
      trickMenu.appendChild(item);
    });
    return trickMenu;
  }

  updateCount() {}
}

SkipButton.Factory = class {
  create(rootElement, controls) {
    return new SkipButton(rootElement, controls);
  }
};

export default SkipButton;
