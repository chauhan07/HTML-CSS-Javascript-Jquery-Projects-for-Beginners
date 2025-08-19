let count = 0;
const counterEl = document.getElementById("counter");

function updateCounter() {
    counterEl.textContent = count;
}

function increment() {
    count++;
    updateCounter();
}

function decrement() {
    if (count > 0) {
    count--;
    updateCounter();
    }
}