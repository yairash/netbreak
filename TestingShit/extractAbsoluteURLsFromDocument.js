function extractAbsoluteURLsFromDocument(document) {
  let absoluteURLs = new Map();

  function extract(element, parentTag) {
    if (element.tagName === 'A' && element.href && (element.href.startsWith('http://') || element.href.startsWith('https://'))) {
      const url = element.href;
      if (!absoluteURLs.has(parentTag)) {
        absoluteURLs.set(parentTag, new Set());
      }
      absoluteURLs.get(parentTag).add(url);
    }

    const children = element.children;
    for (let i = 0; i < children.length; i++) {
      extract(children[i], element.tagName);
    }
  }

  extract(document.body, ''); // Pass the document's body as the initial element

  return absoluteURLs;
}

function filterURLsByDomain(document, urlsMap) {
  const currentDomain = document.location.hostname;
  const filteredURLs = new Map();

  urlsMap.forEach((urls, tag) => {
    const filteredUrls = Array.from(urls).filter(url => {
      const urlObj = new URL(url);
      return urlObj.hostname === currentDomain;
    });

    if (filteredUrls.length > 0) {
      filteredURLs.set(tag, new Set(filteredUrls));
    }
  });

  return filteredURLs;
}
// Assuming you have access to the document object and the extracted absolute URLs
const absoluteURLs = extractAbsoluteURLsFromDocument(document);
const filteredURLs = filterURLsByDomain(document, absoluteURLs);

const filteredURLsMap = new Map();

filteredURLs.forEach((urls, fatherTag) => {
  const urlsSet = new Set(urls);
  filteredURLsMap.set(fatherTag, urlsSet);
});

console.log('Filtered URLs:');
console.log(filteredURLsMap);

