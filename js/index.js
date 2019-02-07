const projectName = "random-quote-machine";

localStorage.setItem('example_project', 'Random Quote Machine');

function inIframe () { try { return window.self !== window.top; } catch (e) { return true; } }

let quotesData;
var currentQuote = '', currentAuthor = '';

function openURL(url){
  window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}

function getQuotes() {
  return $.ajax({
    headers: {
      Accept: "application/json"
    }, url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
    success: function(jsonQuotes) {
      if(typeof jsonQuotes === 'string') {
        quotesData = JSON.parse(jsonQuotes);
        console.log('quotesData');
        console.log(quotesData);
      }
    }
  });
}

function getRandomQuote() {
  return quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)];
}

function getQuote() {
  let randomQuote = getRandomQuote();
  
  currentQuote = randomQuote.quote;

currentAuthor = randomQuote.author;
}

$(document).ready(function() {
  getQuotes().then(() => {
    getQuote();
  });
  
  $('#new-quote').on('click', getQuote);
  
  $('#tweet-quote').on('click', function() {
    if(!inIframe()) {
      openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('""' + currentQuote + '""' + currentAuthor));
    }
  });
});