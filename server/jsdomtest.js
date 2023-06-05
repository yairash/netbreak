const jsdom = require('jsdom');
const { JSDOM } = jsdom;

function getDOMFromURL(url) {
    return new Promise((resolve, reject) => {
        JSDOM.fromURL(url)
            .then((dom) => {
                resolve(dom.window);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const urlToFetch = "https://www.mako.co.il/news-money/2022_q3/Article-f5b4a47535c3381027.htm?sCh=31750a2610f26110&pId=1714755246_359753"
getDOMFromURL(urlToFetch)
    .then((window) => {
        console.log(window); // globalthis/window/document
        console.log(window.document); //DOM
        console.log(window.document.stylesheets); //DOM
        
    })
    .catch((error) => {
        responseMessage = error;
    });