const quote = document.getElementById("quote");
const author = document.getElementById("author");

const api_url = "https://api.quotable.io/random";

async function getQuote(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        quote.innerHTML = data.content;
        author.innerHTML = data.author;
    } catch (error) {
        console.error('Error fetching the quote:', error);
        quote.innerHTML = "An error occurred while fetching the quote.";
        author.innerHTML = "";
    }
}

getQuote(api_url);

function tweet(){
    window.open("https://twitter.com/intent/tweet?text=" + quote.innerHTML + "---- by " + author.innerHTML, "Tweet Window", "width=600, height=300");
}
