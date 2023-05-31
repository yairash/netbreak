const express = require('express');
const fs = require('fs');
const puppeteer = require('puppeteer');

// setting exress veriables
const app = express();
const port = 3000;


//exress code
app.get('/', async (req, res) => {
    console.log("someone reached!");
    try {
        const urlToFetch = req.query.externalUrl;
        // const fileName = req.query.htmlFileName;

        await savePage(urlToFetch);

        fs.readFile('test.html', 'utf8', (err, fileContent) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error reading file');
            } else {
                res.status(200).send(fileContent);
            }
        });
    } catch (error) {
        res.status(200).send("no externalurl provided");
    }

});

// express - Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});



// puppeteer code

async function savePage(url) {

    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle0' });
    const domContent = await page.content();
    fs.writeFileSync('test.html', domContent);

    await browser.close();
};