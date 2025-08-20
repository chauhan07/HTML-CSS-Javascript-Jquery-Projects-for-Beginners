let quotes = [];

async function loadQuotes() {
  const response = await fetch("quotes.json");
  quotes = await response.json();
}

function generateQuote() {
  if (quotes.length === 0) return;
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const { text, author } = quotes[randomIndex];
  document.getElementById("quote").textContent = `"${text}"`;
  document.getElementById("author").textContent = `– ${author}`;
}

document.getElementById("generateBtn").addEventListener("click", generateQuote);

// Load quotes on start
loadQuotes();
