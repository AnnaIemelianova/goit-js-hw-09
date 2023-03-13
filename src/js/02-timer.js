import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');
let timerId = null;

startBtn.addEventListener('click', onClickStartBtn);

startBtn.disabled = true;


function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    // console.log(days, hours, minutes, seconds);
    return { days, hours, minutes, seconds };
  }

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < new Date()) {
          Notiflix.Notify.failure("Please choose a date in the future");
        }
        else {
            startBtn.disabled = false;
        }
      // console.log(selectedDates[0]);
    },
  };


flatpickr(inputEl, options);


function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}


function onClickStartBtn() {
  const timerId = setInterval(() => {
      const deadline = new Date(inputEl.value);
      const firsDate = new Date();
      const delta = deadline - firsDate;
      convertMs(delta);
      days.textContent = addLeadingZero(convertMs(delta).days);
      hours.textContent = addLeadingZero(convertMs(delta).hours);
      minutes.textContent = addLeadingZero(convertMs(delta).minutes);
      seconds.textContent = addLeadingZero(convertMs(delta).seconds);

      if (days.textContent === '00' && hours.textContent === '00' && 
          minutes.textContent === '00' && seconds.textContent === '00') {
          clearInterval(timerId);
       }

  }, 1000);
}

