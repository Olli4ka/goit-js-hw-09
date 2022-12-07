function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const refs = {
  bodyColor: document.body,
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

const colorChenger = {
  isActive: false,
  startColor() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;
    this.intervalId = setInterval(() => {
      refs.bodyColor.style.backgroundColor = getRandomHexColor();
      console.log(refs.bodyColor.style.backgroundColor);
    }, 1000);
  },
  stopColor() {
    this.isActive = false;
    clearInterval(this.intervalId);
  },
};

refs.startBtn.addEventListener('click', e => {
  colorChenger.startColor();
  refs.startBtn.setAttribute('disabled', 'true');
  refs.stopBtn.removeAttribute('disabled');
});
refs.stopBtn.addEventListener('click', e => {
  colorChenger.stopColor();
  refs.startBtn.removeAttribute('disabled');
  refs.stopBtn.setAttribute('disabled', 'true');
});
