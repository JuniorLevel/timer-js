const timeHTML = document.querySelector(".time");
const btnStart = document.querySelector(".start");
const btnStop = document.querySelector(".stop");
const btnReset = document.querySelector(".reset");
const list = document.querySelector(".list");
const blockList = document.querySelector(".block-list");

class Timer {
  constructor() {
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.output = "";
    this.output_seconds = "";
    this.output_minutes = "";
    this.output_hours = "";
    this.times_list = [];
  }
  render() {
    if (this.seconds === 60) {
      this.seconds = 0;
      this.minutes++;
    }
    if (this.minutes === 60) {
      this.minutes = 0;
      this.hours++;
    }

    this.seconds < 10
      ? (this.output_seconds = "0" + this.seconds)
      : (this.output_seconds = this.seconds);

    this.minutes < 10
      ? (this.output_minutes = "0" + this.minutes)
      : (this.output_minutes = this.minutes);

    this.hours < 10
      ? (this.output_hours = "0" + this.hours)
      : (this.output_hours = this.hours);

    this.output = `${this.output_hours}:${this.output_minutes}:${this.output_seconds}`;
    timeHTML.innerHTML = this.output;
    return this.seconds++;
  }

  renderList() {
    this.times_list.length
      ? list.insertAdjacentHTML(
          "afterbegin",
          `<li class="list__item">${
            this.times_list[this.times_list.length - 1]
          }</li>`
        )
      : null;
  }

  start() {
    blockList.classList.remove("show");
    btnStart.setAttribute("disabled", "disabled");
    btnStart.style.opacity = "0.5";
    return (this.timer = setInterval(() => this.render(), 1000));
  }
  reset() {
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    if (this.output !== "00:00:00") {
      this.times_list.push(this.output);
      blockList.classList.add("show");
      this.renderList();
    }
    btnStart.removeAttribute("disabled", "disabled");
    btnStart.style.opacity = "1";
    this.stop();
    return this.render();
  }
  stop() {
    btnStart.removeAttribute("disabled", "disabled");
    btnStart.style.opacity = "1";
    return clearInterval(this.timer);
  }
}

const timer = new Timer();
timer.render();
timer.renderList();

btnStart.addEventListener("click", () => timer.start());
btnReset.addEventListener("click", () => timer.reset());
btnStop.addEventListener("click", () => timer.stop());
