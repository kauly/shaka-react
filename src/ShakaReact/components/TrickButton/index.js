import shaka from "shaka-player/dist/shaka-player.ui.js";
import "./index.css";
import Popper from "popper.js";

class SkipButton extends shaka.ui.Element {
  constructor(parent, controls) {
    super(parent, controls);
    this.count = 0;
    this.values = [
      { label: "2.0x", value: 2 },
      { label: "1.5x", value: 1.5 },
      { label: "1.0x", value: 1 }
    ];
    this.menuOpen = false;
    this.button_ = this.createBtn();
    this.parent.appendChild(this.button_);
    this.trickMenu_ = this.createMenu();
    this.parent.appendChild(this.trickMenu_);

    this.pop = this.pop();
    this.eventManager.listen(this.button_, "click", () => {
      this.menuCtrl();
    });
  }

  pop() {
    return new Popper(
      document.getElementById("btnRef"),
      document.getElementById("trickMenu"),
      {
        placement: "top",
        positionFixed: true,
        modifiers: {
          flip: {
            enabled: false
          }
        }
      }
    );
  }

  menuCtrl() {
    this.menuOpen = !this.menuOpen;
    this.pop.scheduleUpdate();

    this.trickMenu_.setAttribute(
      "class",
      `${this.menuOpen ? "showTrick" : "hide"} trickMenuContainer`
    );
  }

  createBtn() {
    let button = document.createElement("span");
    button.textContent = this.values[2].label;
    button.setAttribute("class", "trickContainer");
    button.setAttribute("id", "btnRef");
    return button;
  }

  createMenu() {
    let trickMenu = document.createElement("div");
    trickMenu.setAttribute("id", "trickMenu");
    trickMenu.setAttribute("class", "hide trickMenuContainer");
    this.values.forEach((opt, i) => {
      let item = document.createElement("span");
      item.setAttribute("class", "trickMenuItem");
      item.addEventListener("click", () => this.handleItemClick(i));
      item.textContent = opt.label;
      trickMenu.appendChild(item);
    });
    return trickMenu;
  }

  handleItemClick(index) {
    this.button_.textContent = this.values[index].label;
    this.player.trickPlay(this.values[index].value);
    this.menuCtrl();
  }
}

SkipButton.Factory = class {
  create(rootElement, controls) {
    return new SkipButton(rootElement, controls);
  }
};

export default SkipButton;
