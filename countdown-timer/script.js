// ===== Helpers =====
const fmt2 = n => String(n).padStart(2, '0');
function formatSW(ms) {
    const totalMs = Math.floor(ms);
    const hours = Math.floor(totalMs / 3600000);
    const minutes = Math.floor((totalMs % 3600000) / 60000);
    const seconds = Math.floor((totalMs % 60000) / 1000);
    const millis = totalMs % 1000;
    return { h: hours, m: minutes, s: seconds, ms: millis };
}

// ===== Tabs =====
const tabStop = document.getElementById('tab-stopwatch');
const tabCount = document.getElementById('tab-countdown');
const secStop = document.getElementById('stopwatch');
const secCount = document.getElementById('countdown');
tabStop.addEventListener('click', () => {
    tabStop.setAttribute('aria-selected', 'true'); tabCount.setAttribute('aria-selected', 'false');
    secStop.classList.add('active'); secCount.classList.remove('active');
});
tabCount.addEventListener('click', () => {
    tabStop.setAttribute('aria-selected', 'false'); tabCount.setAttribute('aria-selected', 'true');
    secStop.classList.remove('active'); secCount.classList.add('active');
});

// ===== Stopwatch Logic =====
const swTime = document.getElementById('sw-time');
const swMs = document.getElementById('sw-ms');
const btnSwStart = document.getElementById('sw-start');
const btnSwLap = document.getElementById('sw-lap');
const btnSwPause = document.getElementById('sw-pause');
const btnSwReset = document.getElementById('sw-reset');
const lapsEl = document.getElementById('laps');

let swRunning = false, swStart = 0, swElapsed = 0, swTimer = null, lapCount = 0;

function renderSW() {
    const { h, m, s, ms } = formatSW(swElapsed);
    swTime.textContent = `${fmt2(h)}:${fmt2(m)}:${fmt2(s)}`;
    swMs.textContent = String(ms).padStart(3, '0');
}

function tickSW() {
    const now = performance.now();
    swElapsed = now - swStart;
    renderSW();
}

function startSW() {
    if (swRunning) return;
    swRunning = true;
    swStart = performance.now() - swElapsed; // resume support
    swTimer = setInterval(tickSW, 16); // ~60fps
    btnSwStart.disabled = true; btnSwLap.disabled = false; btnSwPause.disabled = false; btnSwReset.disabled = false;
}
function pauseSW() {
    if (!swRunning) return;
    swRunning = false;
    clearInterval(swTimer); swTimer = null;
    btnSwStart.disabled = false; btnSwLap.disabled = true; btnSwPause.disabled = true; // keep reset enabled
}
function resetSW() {
    clearInterval(swTimer); swTimer = null; swRunning = false; swElapsed = 0; lapCount = 0; lapsEl.innerHTML = '';
    renderSW();
    btnSwStart.disabled = false; btnSwLap.disabled = true; btnSwPause.disabled = true; btnSwReset.disabled = true;
}
function lapSW() {
    if (!swRunning) return;
    lapCount++;
    const { h, m, s, ms } = formatSW(swElapsed);
    const row = document.createElement('div'); row.className = 'lap-row';
    const label = document.createElement('div'); label.className = 'lap-label'; label.textContent = `Lap ${lapCount}`;
    const time = document.createElement('div'); time.className = 'lap-time'; time.textContent = `${fmt2(h)}:${fmt2(m)}:${fmt2(s)}.${String(ms).padStart(3, '0')}`;
    row.append(label, time); lapsEl.prepend(row); // newest on top
}

btnSwStart.addEventListener('click', startSW);
btnSwPause.addEventListener('click', pauseSW);
btnSwReset.addEventListener('click', resetSW);
btnSwLap.addEventListener('click', lapSW);
renderSW();

// Keyboard shortcuts (space = start/pause, L = lap, R = reset)
window.addEventListener('keydown', (e) => {
    if (document.activeElement.tagName === 'INPUT') return; // don't hijack typing
    if (e.code === 'Space') { e.preventDefault(); swRunning ? pauseSW() : startSW(); }
    if (e.key === 'l' || e.key === 'L') { lapSW(); }
    if (e.key === 'r' || e.key === 'R') { resetSW(); }
});

// ===== Countdown Logic =====
const cdMin = document.getElementById('cd-min');
const cdSec = document.getElementById('cd-sec');
const cdTime = document.getElementById('cd-time');
const cdProg = document.getElementById('cd-progress');
const cdStart = document.getElementById('cd-start');
const cdPause = document.getElementById('cd-pause');
const cdReset = document.getElementById('cd-reset');

let cdTotalMs = 0, cdRemaining = 0, cdStartedAt = 0, cdTimer = null, cdRunning = false;

function renderCD() {
    const totalSec = Math.ceil(cdRemaining / 1000); // ceiling so it never shows negative
    const m = Math.max(0, Math.floor(totalSec / 60));
    const s = Math.max(0, totalSec % 60);
    cdTime.textContent = `${fmt2(m)}:${fmt2(s)}`;
    const pct = cdTotalMs > 0 ? Math.max(0, Math.min(100, (1 - cdRemaining / cdTotalMs) * 100)) : 0;
    cdProg.style.width = pct + '%';
}

function finishCD() {
    clearInterval(cdTimer); cdTimer = null; cdRunning = false; cdRemaining = 0; renderCD();
    cdStart.disabled = false; cdPause.disabled = true; cdReset.disabled = false;
    // subtle flash
    cdTime.animate([
        { transform: 'scale(1)', filter: 'brightness(1)' },
        { transform: 'scale(1.06)', filter: 'brightness(1.6)' },
        { transform: 'scale(1)', filter: 'brightness(1)' }
    ], { duration: 700, easing: 'ease-out' });
}

function tickCD() {
    const elapsed = performance.now() - cdStartedAt;
    cdRemaining = Math.max(0, cdTotalMs - elapsed);
    renderCD();
    if (cdRemaining <= 0) { finishCD(); }
}

function startCD() {
    const m = parseInt(cdMin.value || '0', 10); const s = parseInt(cdSec.value || '0', 10);
    const inRange = Number.isFinite(m) && Number.isFinite(s) && m >= 0 && s >= 0 && s <= 59;
    if (!cdRunning && (cdTotalMs === 0 || cdRemaining === 0)) {
        if (!inRange) { alert('Please enter valid minutes (>=0) and seconds (0–59).'); return; }
        cdTotalMs = (m * 60 + s) * 1000;
        if (cdTotalMs <= 0) { alert('Please set a time greater than 0.'); return; }
        cdRemaining = cdTotalMs;
    }
    cdRunning = true; cdStartedAt = performance.now() - (cdTotalMs - cdRemaining); // resume support
    cdTimer = setInterval(tickCD, 100);
    cdStart.disabled = true; cdPause.disabled = false; cdReset.disabled = false;
}
function pauseCD() { cdRunning = false; clearInterval(cdTimer); cdTimer = null; cdStart.disabled = false; cdPause.disabled = true; }
function resetCD() { clearInterval(cdTimer); cdTimer = null; cdRunning = false; cdTotalMs = 0; cdRemaining = 0; renderCD(); cdStart.disabled = false; cdPause.disabled = true; cdReset.disabled = true; }

cdStart.addEventListener('click', startCD);
cdPause.addEventListener('click', pauseCD);
cdReset.addEventListener('click', resetCD);
renderCD();