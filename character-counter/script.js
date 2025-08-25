const inputText = document.getElementById('inputText');
const charCount = document.getElementById('charCount');
const wordCount = document.getElementById('wordCount');
const sentenceCount = document.getElementById('sentenceCount');
const paraCount = document.getElementById('paraCount');
const spaceCount = document.getElementById('spaceCount');
const capsCount = document.getElementById('capsCount');
const readingTime = document.getElementById('readingTime');
const limitText = document.getElementById('limitText');
const limitBar = document.getElementById('limitBar');

const MAX_LETTERS = 5000; // limit applies to letters (alphabets) only

inputText.addEventListener('input', onInput);

function onInput(e) {
    // Enforce the 5000-letter limit while allowing non-letters
    const original = inputText.value;
    const limited = limitByLetters(original, MAX_LETTERS);
    if (limited !== original) {
        const pos = inputText.selectionStart;
        inputText.value = limited;
        inputText.selectionStart = inputText.selectionEnd = Math.min(pos, limited.length);
    }
    updateCounts();
}

function limitByLetters(str, max) {
    let count = 0;
    let out = '';
    for (const ch of str) {
        if (isLetter(ch)) {
            if (count >= max) continue; // skip extra letters
            count++;
        }
        out += ch;
    }
    return out;
}

function isLetter(ch) {
    return /[A-Za-z]/.test(ch);
}

function updateCounts() {
    const text = inputText.value;

    // Letters used (for limit display)
    const lettersUsed = (text.match(/[A-Za-z]/g) || []).length;
    limitText.textContent = `Letters: ${lettersUsed} / ${MAX_LETTERS}`;
    const pct = Math.min(100, (lettersUsed / MAX_LETTERS) * 100);
    limitBar.style.width = pct + '%';
    limitText.classList.toggle('warn', lettersUsed >= MAX_LETTERS);

    // Characters (letters only, per requirement wording)
    charCount.textContent = lettersUsed;

    // Words
    const words = text.trim().length ? text.trim().split(/\s+/).filter(w => w.length > 0) : [];
    wordCount.textContent = words.length;

    // Sentences (split by . ! ?)
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    sentenceCount.textContent = sentences.length;

    // Paragraphs (split by newlines)
    const paras = text.split(/\n+/).filter(p => p.trim().length > 0);
    paraCount.textContent = paras.length;

    // Spaces (count literal spaces only)
    const spaces = (text.match(/ /g) || []).length;
    spaceCount.textContent = spaces;

    // Capital words (fully uppercase words with letters)
    const caps = words.filter(w => {
        const letters = w.replace(/[^A-Za-z]/g, '');
        if (!letters) return false; // no letters
        return letters === letters.toUpperCase();
    }).length;
    capsCount.textContent = caps;

    // Reading time (average 200 wpm)
    const minutes = Math.max(0, Math.ceil(words.length / 200));
    readingTime.textContent = minutes + ' min';
}

// Initialize
updateCounts();