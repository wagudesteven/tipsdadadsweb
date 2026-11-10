// ============================================================
// TIPSDAD – 30-minute countdown
// Starts at 30:00 when the page opens.
// Tapping LIVE restarts it at 30:00.
// ============================================================

(function () {
  const TOTAL_SECONDS = 30 * 60;   // 30 minutes
  const URGENT_SECONDS = 5 * 60;   // turns red in the last 5 minutes

  const mmEl = document.getElementById('mm');
  const ssEl = document.getElementById('ss');
  const clockEl = document.getElementById('clock');
  const barEl = document.getElementById('bar');
  const noteRunning = document.getElementById('note-running');
  const noteUp = document.getElementById('note-up');
  const liveBtn = document.getElementById('live');

  let endAt = Date.now() + TOTAL_SECONDS * 1000;

  const pad = (n) => String(n).padStart(2, '0');

  function render() {
    const left = Math.max(0, Math.round((endAt - Date.now()) / 1000));

    mmEl.textContent = pad(Math.floor(left / 60));
    ssEl.textContent = pad(left % 60);

    barEl.style.width = (left / TOTAL_SECONDS * 100).toFixed(2) + '%';

    const urgent = left <= URGENT_SECONDS;
    clockEl.classList.toggle('clock--urgent', urgent);
    barEl.classList.toggle('bar-fill--urgent', urgent);

    const timeUp = left === 0;
    noteRunning.hidden = timeUp;
    noteUp.hidden = !timeUp;
  }

  function restart() {
    endAt = Date.now() + TOTAL_SECONDS * 1000;
    render();
  }

  liveBtn.addEventListener('click', restart);

  render();
  setInterval(render, 1000);
})();
