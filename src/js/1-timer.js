import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const button = document.querySelector('button[data-start]')
const input = document.getElementById('datetime-picker')
const daysEL = document.querySelector('[data-days]')
const hoursEL = document.querySelector('[data-hours]')
const minutesEL = document.querySelector('[data-minutes]')
const secondsEL= document.querySelector('[data-seconds]')

let userSelectedDate = null;
button.disabled = true;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const validDate = selectedDates[0] - Date.now();
        if (validDate < 0) {
            button.disabled = true;

            iziToast.error({
                message: 'Please choose a date in the future',
                color: 'red',
                position: 'topRight',
            }); 
        } else {
            button.disabled = false;
            userSelectedDate = selectedDates[0];
            iziToast.hide({});
        }
    },
  };
flatpickr('#datetime-picker', options);
  
button.addEventListener("click", () => {
input.disabled = true;
button.disabled = true;

    const interId = setInterval(() => {
        const time = userSelectedDate - Date.now();
        const { days, hours, minutes, seconds } = convertMs(time);

        if (time < 0) {
            clearInterval(interId);
            input.disabled = false;
            return;
        }
        daysEL.innerHTML = days;
        hoursEL.innerHTML = hours;
        minutesEL.innerHTML = minutes;
        secondsEL.innerHTML = seconds;
    }, 1000);
})
function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Pad(Math.floor(ms / day));
    const hours = Pad(Math.floor((ms % day) / hour));
    const minutes = Pad(Math.floor(((ms % day) % hour) / minute));
    const seconds = Pad(Math.floor((((ms % day) % hour) % minute) / second));
    return { days, hours, minutes, seconds };
  }
  
  function Pad(n) {
    return String(n).padStart(2, '0');
  }
