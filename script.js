// ============================================================
// TIPSDAD – landing page
//  • Live date & time (visitor's own clock)
//  • Greeting and headline that change with the time of day
//  • 30-minute countdown (tap LIVE to restart)
//  • Sticky buttons on phones after scrolling
// ============================================================

(function () {
  // ---------- Live date & time ----------

  const todayEl = document.getElementById('today');
  const clockNowEl = document.getElementById('clock-now');
  const dayNoteEl = document.getElementById('day-note');
  const greetingEl = document.getElementById('greeting');
  const headTopEl = document.getElementById('headline-top');
  const headBottomEl = document.getElementById('headline-bottom');
  const yearEl = document.getElementById('year');

  const dateFmt = new Intl.DateTimeFormat(undefined, {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
  });
  const timeFmt = new Intl.DateTimeFormat(undefined, {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  });

  /** Words that change with the time of day and the weekday */
  function moment(now) {
    const h = now.getHours();
    const weekend = now.getDay() === 0 || now.getDay() === 6;

    let greeting, top, bottom;
    if (h < 12) {
      greeting = '☀️ Good morning. Today\'s tips are landing';
      top = 'Start the day';
      bottom = 'with today\'s tips. ⚽';
    } else if (h < 17) {
      greeting = '⚽ Afternoon kickoffs are close';
      top = 'Don\'t miss';
      bottom = 'this afternoon\'s tips. 🔥';
    } else {
      greeting = '🌙 Tonight\'s matches are kicking off';
      top = 'Don\'t miss';
      bottom = 'tonight\'s tips. 🔥';
    }

    const note = weekend ? '🔥 Weekend football is ON' : '⚽ Matchday';
    return { greeting, top, bottom, note };
  }

  let lastHour = -1;

  function tickClock() {
    const now = new Date();
    todayEl.textContent = dateFmt.format(now);
    clockNowEl.textContent = timeFmt.format(now);

    // Update the wording only when the hour changes
    if (now.getHours() !== lastHour) {
      lastHour = now.getHours();
      const m = moment(now);
      greetingEl.textContent = m.greeting;
      headTopEl.textContent = m.top;
      headBottomEl.textContent = m.bottom;
      dayNoteEl.textContent = m.note;
      yearEl.textContent = now.getFullYear();
    }
  }

  // ---------- 30-minute countdown ----------

  const TOTAL = 30 * 60;   // 30 minutes
  const URGENT = 5 * 60;   // red in the last 5 minutes

  const mmEl = document.getElementById('mm');
  const ssEl = document.getElementById('ss');
  const clockEl = document.getElementById('clock');
  const barEl = document.getElementById('bar');
  const noteRunning = document.getElementById('note-running');
  const noteUp = document.getElementById('note-up');

  let endAt = Date.now() + TOTAL * 1000;
  const pad = (n) => String(n).padStart(2, '0');

  function tickCountdown() {
    const left = Math.max(0, Math.round((endAt - Date.now()) / 1000));
    mmEl.textContent = pad(Math.floor(left / 60));
    ssEl.textContent = pad(left % 60);
    barEl.style.width = (left / TOTAL * 100).toFixed(2) + '%';

    const urgent = left <= URGENT;
    clockEl.classList.toggle('clock--urgent', urgent);
    barEl.classList.toggle('bar-fill--urgent', urgent);

    noteRunning.hidden = left === 0;
    noteUp.hidden = left !== 0;
  }

  document.getElementById('live').addEventListener('click', () => {
    endAt = Date.now() + TOTAL * 1000;
    tickCountdown();
  });

  // ---------- Sticky buttons on phones ----------

  const sticky = document.getElementById('sticky');
  const actions = document.querySelector('.actions');

  function toggleSticky() {
    const rect = actions.getBoundingClientRect();
    // Show once the main buttons have scrolled out of view
    sticky.classList.toggle('sticky--show', rect.bottom < 0);
  }

  window.addEventListener('scroll', toggleSticky, { passive: true });

  // ---------- Start ----------

  function tick() {
    tickClock();
    tickCountdown();
  }

  tick();
  setInterval(tick, 1000);
  toggleSticky();
})();