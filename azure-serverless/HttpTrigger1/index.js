const puppeteer = require("puppeteer");
const axios = require('axios');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

module.exports = async function (context, req) {

    context.log('JavaScript HTTP trigger function processed a request.');
    let domContent, responseMessage;
    try {
        const urlToFetch = req.query.externalUrl;
        // const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
        // const page = await browser.newPage();
        // await page.goto(urlToFetch, { waitUntil: 'networkidle0' });
        // domContent = await page.content();
        // responseMessage = domContent;
        // await browser.close();

        // await axios.get(urlToFetch)
        //     .then(response => {
        //         const dom = response.data;
        //         responseMessage = dom;
        //     })
        //     .catch(error => {
        //         responseMessage = error;
        //     });

        await getDOMFromURL(urlToFetch)
            .then((dom) => {
                responseMessage = dom.documentElement.outerHTML;
            })
            .catch((error) => {
                responseMessage = error;
            });


    }
    catch (error) {
        responseMessage = error.message;
    }

    context.res = {
        status: 200,
        body: responseMessage
    };
}


function getDOMFromURL(url) {
    return new Promise((resolve, reject) => {
        JSDOM.fromURL(url)
            .then((dom) => {
                resolve(dom.window.document);
            })
            .catch((error) => {
                reject(error);
            });
    });
}