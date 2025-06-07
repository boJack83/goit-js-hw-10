import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    const delay = +event.target.elements.delay.value;
    const state = event.target.elements.state.value;

    setTimeout(() => {
        new Promise((resolve, reject) => {
            if (state === "fulfilled") {
                resolve(delay);
            } else {
                reject(delay);
    }
        })
            .then(data => {
                iziToast.show({
                    color: 'green',
                    position: 'topRight',
                    message: `✅ Fulfilled promise in ${data}ms`,
                  });   
            })
            .catch(data => {
                iziToast.show({
                    color: 'red',
                    position: 'topRight',
                    message: `❌ Rejected promise in ${data}ms`,
                  });  
        })
    }, delay)
}