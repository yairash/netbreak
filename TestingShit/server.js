const { JSDOM } = require('jsdom');
const axios = require('axios');

const url = 'https://www.mako.co.il/pride-news/Article-3ca091ade067881027.htm?sCh=3d385dd2dd5d4110&pId=1898243326';

axios.get(url)
  .then(response => {
    const html = response.data;

    const dom = new JSDOM(html);
    const document = dom.window.document;

    const tagHrefSet = createTagHrefSet(document);

    console.log([...tagHrefSet]);
  })
  .catch(error => {
    console.error('Error fetching URL:', error);
  });

function createTagHrefSet(domElement) {
  const tagHrefSet = new Map();

  function traverse(element, depth = 0) {
    // Traverse child nodes
    for (let child of element.children) {
      traverse(child, depth + 1);
    }

    // Extract href from anchor tags
    if (element.tagName === 'A') {
      const href = element.getAttribute('href');

      if (!element.nextElementSibling && !element.previousElementSibling) {
        const deepestTag = depth > 0 ? element.parentElement : element;
        const deepestTagName = deepestTag.tagName;

        // Check if href is an absolute URL
        try {
          const url = new URL(href);

          if (url.protocol.startsWith('http')) {
            const hrefs = tagHrefSet.get(deepestTagName) || new Set();
            hrefs.add(href);
            tagHrefSet.set(deepestTagName, hrefs);
          }
        } catch (error) {
          // Skip non-absolute URLs
        }
      }
    }
  }

  // Start traversing from the provided DOM element
  traverse(domElement);

  return tagHrefSet;
}
