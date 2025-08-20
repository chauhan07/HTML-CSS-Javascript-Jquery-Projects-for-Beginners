const cInput = document.getElementById('celsius');
const fInput = document.getElementById('fahrenheit');
const swapBtn = document.getElementById('swap');

let programmatic = false; // guard to avoid feedback loops

function roundSmart(n) {
    // keep up to 2 decimals without trailing zeros
    const r = Math.round(n * 100) / 100;
    return Number.isFinite(r) ? r.toString() : '';
}

function cToF(c) { return (c * 9 / 5) + 32 }
function fToC(f) { return (f - 32) * 5 / 9 }

function handleC() {
    if (programmatic) return;
    const v = parseFloat(cInput.value.replace(/,/g, ''));
    if (Number.isNaN(v)) { programmatic = true; fInput.value = ''; programmatic = false; return; }
    programmatic = true; fInput.value = roundSmart(cToF(v)); programmatic = false;
}

function handleF() {
    if (programmatic) return;
    const v = parseFloat(fInput.value.replace(/,/g, ''));
    if (Number.isNaN(v)) { programmatic = true; cInput.value = ''; programmatic = false; return; }
    programmatic = true; cInput.value = roundSmart(fToC(v)); programmatic = false;
}

cInput.addEventListener('input', handleC);
fInput.addEventListener('input', handleF);

// Swap visually & swap current values
swapBtn.addEventListener('click', () => {
    // swap values
    const cVal = cInput.value; cInput.value = fInput.value; fInput.value = cVal;
    // trigger conversions based on new layout: if c now holds F value, convert accordingly
    if (cInput.value !== '') { handleC(); }
    if (fInput.value !== '') { handleF(); }
    // cute micro-animation
    swapBtn.animate([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], { duration: 200, easing: 'ease-out' });
});

// Prefill example for a nice first-impression (can be removed)
cInput.value = '';
fInput.value = '';