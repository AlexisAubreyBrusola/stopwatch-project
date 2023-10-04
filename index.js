const timeDisplay = document.getElementById("time-display");
const startBtn = document.getElementById("start-button");
const pauseBtn = document.getElementById("pause-button");
const resetBtn = document.getElementById("reset-button");
const iconContainer = document.getElementById("icon-container");

let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalID;
let hours = 0;
let minutes = 0;
let seconds = 0;


startBtn.addEventListener("click", () => {
    if (paused) {
        paused = false;
        startTime = Date.now() - elapsedTime;
        intervalID = setInterval(updateTime, 1000);
        iconContainer.innerHTML = `<i id="icon-element" class="fa-solid fa-play"></i>`
    }
});

pauseBtn.addEventListener("click", () => {
    if(!paused) {
        paused = true;
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalID);
        iconContainer.innerHTML = `<i id="icon-element" class="fa-solid fa-pause"></i>`
    }
});

resetBtn.addEventListener("click", () => {
    paused = true;
    clearInterval(intervalID);
    startTime = 0;
    elapsedTime = 0;
    currentTime = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;

    timeDisplay.textContent = "00:00:00";
    iconContainer.innerHTML = `<i id="icon-element" class="fa-solid fa-rotate-right"></i>`
});

function updateTime() {
    elapsedTime = Date.now() - startTime;

    seconds = Math.floor((elapsedTime / 1000) % 60);
    minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);

    seconds = pad(seconds);
    minutes = pad(minutes);
    hours = pad(hours);

    timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;

    function pad(unit) {
        return (("0") + unit).length > 2 ? unit : "0" + unit;
    }
}