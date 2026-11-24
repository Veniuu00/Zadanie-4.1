const PHASES = {
  work: { label: "Praca", seconds: 25 * 60 },
  shortBreak: { label: "Krótka przerwa", seconds: 5 * 60 },
  longBreak: { label: "Długa przerwa", seconds: 15 * 60 },
};

let phase = "work";
let remainingSeconds = PHASES.work.seconds;
let cycleCount = 0;
let timerId = null;

const timeDisplay = document.querySelector("#timeDisplay");
const phaseLabel = document.querySelector("#phaseLabel");
const cycleCountLabel = document.querySelector("#cycleCount");
const progressBar = document.querySelector("#progressBar");
const startButton = document.querySelector("#startButton");
const pauseButton = document.querySelector("#pauseButton");
const resetButton = document.querySelector("#resetButton");
const status = document.querySelector("#status");

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remaining).padStart(2, "0")}`;
}

function render() {
  const phaseSeconds = PHASES[phase].seconds;
  timeDisplay.textContent = formatTime(remainingSeconds);
  phaseLabel.textContent = PHASES[phase].label;
  cycleCountLabel.textContent = String(cycleCount);
  progressBar.style.width = `${((phaseSeconds - remainingSeconds) / phaseSeconds) * 100}%`;
  document.title = `${formatTime(remainingSeconds)} — ${PHASES[phase].label}`;
}

function setRunning(isRunning) {
  startButton.disabled = isRunning;
  pauseButton.disabled = !isRunning;
}

function startTimer() {
  if (timerId !== null) return;
  setRunning(true);
  status.textContent = phase === "work"
    ? "Sesja pracy trwa."
    : "Przerwa trwa.";

  timerId = window.setInterval(() => {
    remainingSeconds -= 1;
    if (remainingSeconds > 0) {
      render();
      return;
    }
    finishPhase();
  }, 1000);
}

function pauseTimer() {
  if (timerId === null) return;
  window.clearInterval(timerId);
  timerId = null;
  setRunning(false);
  status.textContent = "Wstrzymano.";
}

function resetTimer() {
  if (timerId !== null) {
    window.clearInterval(timerId);
    timerId = null;
  }
  if (phase !== "work") {
    cycleCount = Math.max(0, cycleCount);
  }
  phase = "work";
  remainingSeconds = PHASES.work.seconds;
  setRunning(false);
  status.textContent = "Zresetowano. Licznik cykli pozostaje bez zmian.";
  render();
}

function finishPhase() {
  window.clearInterval(timerId);
  timerId = null;

  if (phase === "work") {
    cycleCount += 1;
    if (cycleCount % 4 === 0) {
      phase = "longBreak";
    } else {
      phase = "shortBreak";
    }
  } else {
    phase = "work";
  }

  remainingSeconds = PHASES[phase].seconds;
  status.textContent = phase === "work"
    ? "Przerwa zakończona. Gotowy do kolejnej pracy."
    : "Czas przerwy.";
  render();
  startTimer();
}

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

setRunning(false);
render();
