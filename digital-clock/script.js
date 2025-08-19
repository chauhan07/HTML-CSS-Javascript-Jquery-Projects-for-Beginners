const digitalEl = document.getElementById("digital");
const dateEl = document.getElementById("date");

function updateClock() {
    const now = new Date();
    const hrs = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');

    digitalEl.textContent = `${hrs}:${mins}:${secs}`;

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateEl.textContent = now.toLocaleDateString(undefined, options);
}

setInterval(updateClock, 1000);
updateClock();