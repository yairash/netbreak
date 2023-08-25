var express = require('express');
var router = express.Router();
var puppeteer = require('puppeteer');
var fs = require('fs');

/* GET url's DOM. */
router.get('/', async function (req, res, next) {
    console.log("someone reached!");
    try {
        const urlToFetch = req.query.externalUrl;
        const domContent = await savePage(urlToFetch);
        res.status(200).send(domContent);
    }
    catch (error) {
        res.status(200).send(error.message);
    }
});

async function savePage(url) {
    const browser = await puppeteer.launch({ headless: 'new', executablePath: "/home/yair/Documents/Computer_Science/Year_3/Final_project/netbreak/azure-server/netbreak/chrome-linux64/chrome", args: ['--no-sandbox'] });
    const page = await browser.newPage();
    // await page.goto(url, { waitUntil: 'networkidle0' });
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    const domContent = await page.content();
    await browser.close();
    return domContent;
};

module.exports = router;
