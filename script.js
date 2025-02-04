// Quotes array (initial data or loaded from local storage)
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Do what you can, with what you have, where you are.", category: "Inspiration" },
    { text: "Act as if what you do makes a difference. It does.", category: "Motivation" }
];

// Load last selected category from local storage
let selectedCategory = localStorage.getItem("selectedCategory") || "all";

// DOM Elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const categoryFilter = document.getElementById("categoryFilter");

// ✅ Function to display a random quote
function showRandomQuote() {
    let filteredQuotes = selectedCategory === "all" ? quotes : quotes.filter(q => q.category === selectedCategory);
    if (filteredQuotes.length === 0) {
        quoteDisplay.textContent = "No quotes available for this category.";
        return;
    }
    let randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
    quoteDisplay.textContent = `"${randomQuote.text}" - [${randomQuote.category}]`;
}

// ✅ Function to add a new quote
function addQuote() {
    let newQuoteText = document.getElementById("newQuoteText").value.trim();
    let newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

    if (!newQuoteText || !newQuoteCategory) {
        alert("Please enter both a quote and a category.");
        return;
    }

    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    saveQuotes();
    populateCategories();
    showRandomQuote();

    // Clear input fields
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
}

// ✅ Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

// ✅ Function to populate categories in dropdown
function populateCategories() {
    let uniqueCategories = ["all", ...new Set(quotes.map(q => q.category))];
    categoryFilter.innerHTML = uniqueCategories.map(cat => `<option value="${cat}">${cat}</option>`).join("");
    categoryFilter.value = selectedCategory;
}

// ✅ Function to filter quotes by category
function filterQuotes() {
    selectedCategory = categoryFilter.value;
    localStorage.setItem("selectedCategory", selectedCategory);
    showRandomQuote();
}

// ✅ Function to export quotes as JSON file
function exportQuotes() {
    let dataStr = JSON.stringify(quotes, null, 2);
    let blob = new Blob([dataStr], { type: "application/json" });
    let url = URL.createObjectURL(blob);
    
    let a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// ✅ Function to import quotes from JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        try {
            let importedQuotes = JSON.parse(event.target.result);
            quotes.push(...importedQuotes);
            saveQuotes();
            populateCategories();
            showRandomQuote();
            alert("Quotes imported successfully!");
        } catch (error) {
            alert("Invalid JSON file.");
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

// ✅ Simulated Server Syncing (Mock API)
function syncWithServer() {
    fetch("https://jsonplaceholder.typicode.com/posts") // Mock API
        .then(response => response.json())
        .then(data => {
            let serverQuotes = data.slice(0, 5).map(post => ({
                text: post.title,
                category: "Server"
            }));

            quotes = [...new Set([...quotes, ...serverQuotes])]; // Prevent duplicates
            saveQuotes();
            populateCategories();
            showRandomQuote();
        })
        .catch(error => console.error("Sync Error:", error));
}

// ✅ Event Listeners
newQuoteBtn.addEventListener("click", showRandomQuote);
categoryFilter.addEventListener("change", filterQuotes);

// ✅ Initial Setup
populateCategories();
showRandomQuote();

// ✅ Auto-sync with server every 30 seconds
setInterval(syncWithServer, 30000);
