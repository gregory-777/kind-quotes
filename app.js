let quotesData = []; 
document.addEventListener("DOMContentLoaded", () => {
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
    document.querySelector('.date').textContent = dateStr;
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.addEventListener("load", () => {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 0);
    });
    fetch("quotes.json")
        .then(response => response.json())
        .then(data => {
            quotesData = data;
            const index = getDaySinceReset() % data.length;
            const quote = data[index];

            console.log("Quotes loaded:", data);
            console.log("Using index:", index);
            console.log("Running code...")
            document.getElementsByClassName("quote_text")[0].textContent = `"${quote.text}"`;
            document.getElementsByClassName("author_text")[0].textContent = `\u2014 ${quote.author}`;
            document.getElementsByClassName("description_text")[0].textContent = `${quote.description}`;
            console.log("Using index:", index);
            generateNewOnClick();
        })
    .catch(error => console.error("Error loading quotes:", error));
    function getDaySinceReset() {
        const now = new Date();
        const reset = new Date(2025, 6, 1);
        const diff = now - reset;
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    }
});
 function generateNewOnClick() {
        const randomIndex = Math.floor(Math.random() * quotesData.length);
        const displayedText = document.querySelector(".explore_quote").textContent.trim();
        const cleanText = displayedText.replace(/^"(.*)"$/, '$1');
        const currentIndex = quotesData.findIndex(q => q.text === cleanText);
        console.log(randomIndex);

        if (randomIndex == currentIndex){
            const randomIndex = Math.floor(Math.random() * quotesData.length);
            document.getElementsByClassName("explore_quote")[0].textContent = `"${quotesData[randomIndex].text}"`;
            document.getElementsByClassName("explore_author")[0].textContent = `\u2014 ${quotesData[randomIndex].author}`;
        } else {
            document.getElementsByClassName("explore_quote")[0].textContent = `"${quotesData[randomIndex].text}"`;
            document.getElementsByClassName("explore_author")[0].textContent = `\u2014 ${quotesData[randomIndex].author}`;
        }
    }