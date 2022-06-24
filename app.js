const stopwatch = document.querySelector('#stopwatch');
const timestamp = document.querySelector('#timestamp');
const startstop = document.querySelector('#startstop');
const reset = document.querySelector('#reset');

let currentTime = 0;
let isRunning = false;
let trackerCount = 0;
let timer;

function startTimer() {
  isRunning = true;
  stopwatch.classList.add('running');
  timer = setInterval(() => {
    currentTime++;

    if (currentTime % 100 === 0) {
      createTracker();
    }

    let minutes = Math.floor(currentTime / 100 / 60);
    let seconds = currentTime / 100 - minutes * 60;
    let finalTime = `${minutes}:${seconds < 10 ? 0 : ''}${seconds.toFixed(1)}`;
    timestamp.innerText = minutes > 0 ? finalTime : seconds.toFixed(1);
  }, 10);
  startstop.innerText = 'Stop';
}

function stopTimer() {
  isRunning = false;
  stopwatch.classList.remove('running');
  clearInterval(timer);
  startstop.innerText = 'Start';
}

function resetTimer() {
  currentTime = 0;
  currentTime = currentTime.toFixed(1);
  trackerCount = 0;
  timestamp.innerText = currentTime;
  startstop.innerText = 'Start';
}

function handleStartStop() {
  if (isRunning) {
    stopTimer();
  } else {
    startTimer();
  }
}

function handleReset() {
  stopTimer();
  resetTimer();
  clearTrackers();
}

function createTracker() {
  let startingAngle = -90;
  let setAngle = startingAngle + 6 * trackerCount;
  let trackerNode = document.createElement('div');

  trackerNode.classList.add('counter');
  applyStyle(trackerNode, {
    transform: `rotate(${setAngle}deg) translateX(9rem)`,
  });

  stopwatch.appendChild(trackerNode);
  trackerCount++;

  if (trackerCount > 10) {
    let trackers = document.querySelectorAll('.counter');
    trackers[0].remove();
  }
}

function clearTrackers() {
  let trackers = document.querySelectorAll('.counter');
  for (let counter of trackers) {
    counter.remove();
  }
}

function applyStyle(element, style) {
  for (const property in style) element.style[property] = style[property];
}

startstop.addEventListener('click', handleStartStop);
reset.addEventListener('click', handleReset);
