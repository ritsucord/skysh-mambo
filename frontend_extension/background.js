// Service Worker for mambo extension
// Manifest V3에서는 background.js를 Service Worker로 사용합니다

chrome.runtime.onInstalled.addListener(() => {
  console.log('mambo 익스텐션이 설치되었습니다.');
});

// 메시지 리스너 (필요시 popup.js에서 통신)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getTabInfo') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      sendResponse({ tab: tabs[0] });
    });
    return true; // 비동기 응답 사용
  }
});
