const puppeteer = require("puppeteer-core");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    let domContent, responseMessage, doms = [];
    try {
        const links = req.body["links"];
        const browser = await puppeteer.launch({ headless: 'new', executablePath: "./chrome-linux64/chrome", args: ['--no-sandbox'] });
        const page = await browser.newPage();
        for (let i = 0; i < links.length; i++) {
            await page.goto(links[i], { waitUntil: 'domcontentloaded' });
            domContent = await page.content();
            doms.push(domContent);
        }
        responseMessage = JSON.stringify(doms);
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
