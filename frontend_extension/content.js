chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action !== 'collectPageInfo') {
    return false;
  }

  const bodyText = document.body?.innerText || '';
  const normalizedText = bodyText.replace(/\s+/g, ' ').trim();

  sendResponse({
    title: document.title || '',
    url: window.location.href,
    text: normalizedText.slice(0, 5000)
  });

  return true;
});
