import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/material_green.css');

const refs = {
  startBtn: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let selectedDate = selectedDates[0];
    let ms = selectedDate - getNowDate();
    if (ms < 0) {
      window.alert('Please choose a date in the future');
      return;
    }

    refs.startBtn.disabled = false;

    refs.startBtn.addEventListener('click', () => {
      const timeInterval = setInterval(() => {
        const ms = selectedDate - getNowDate();
        renderTime(convertMs(ms));
        if (ms <= 0) {
          clearInterval(timeInterval);
          resetTimer();
        }
      }, 1000);
      refs.startBtn.disabled = true;
    });
  },
};

const fp = flatpickr('#datetime-picker', options);

function getNowDate() {
  return new Date();
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function renderTime({ days, hours, minutes, seconds }) {
  refs.daysEl.innerHTML =
    days === 0 ? '00' : days < 10 ? addLeadingZero(days) : days;
  refs.hoursEl.innerHTML = addLeadingZero(hours);
  refs.minutesEl.innerHTML = addLeadingZero(minutes);
  refs.secondsEl.innerHTML = addLeadingZero(seconds);
}

function resetTimer() {
  refs.daysEl.innerHTML = '00';
  refs.hoursEl.innerHTML = '00';
  refs.minutesEl.innerHTML = '00';
  refs.secondsEl.innerHTML = '00';
}
