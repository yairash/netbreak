const puppeteer = require("puppeteer-core");

module.exports = async function (context, req) {

    context.log('JavaScript HTTP trigger function processed a request.');
    let domContent, responseMessage;
    try {
        const urlToFetch = req.query.externalUrl;
        const browser = await puppeteer.launch({ headless: 'new', executablePath: "./chrome-linux64/chrome",args: ['--no-sandbox'] });
        const page = await browser.newPage();
        await page.goto(urlToFetch, { waitUntil: 'domcontentloaded' });
        domContent = await page.content();
        responseMessage = domContent;
        await browser.close();


    }
    catch (error) {
        responseMessage = error.message;
    }

    context.res = {
        status: 200,
        body: responseMessage
    };
}
