// Mock 데이터
const mockData = {
  '삼성전자': {
    name: '삼성전자',
    code: '005930',
    price: 72500,
    change: 2.5,
    changeAmount: 1750,
    sentiment: 'positive',
    riskLevel: '중간',
    sentimentRatio: { positive: 68, negative: 18, neutral: 14 },
    analysis: '긍정적인 추세를 보이고 있습니다. 반도체 산업의 회복과 함께 주가가 상승하는 중입니다.',
    keywords: ['반도체', '상승세', '긍정적', '회복']
  },
  '005930': {
    name: '삼성전자',
    code: '005930',
    price: 72500,
    change: 2.5,
    changeAmount: 1750,
    sentiment: 'positive',
    riskLevel: '중간',
    sentimentRatio: { positive: 68, negative: 18, neutral: 14 },
    analysis: '긍정적인 추세를 보이고 있습니다. 반도체 산업의 회복과 함께 주가가 상승하는 중입니다.',
    keywords: ['반도체', '상승세', '긍정적', '회복']
  },
  'SK하이닉스': {
    name: 'SK하이닉스',
    code: '000660',
    price: 150000,
    change: -1.2,
    changeAmount: -1800,
    sentiment: 'neutral',
    riskLevel: '높음',
    sentimentRatio: { positive: 35, negative: 40, neutral: 25 },
    analysis: '단기적 조정이 진행 중입니다. 장기 추세는 여전히 긍정적으로 평가됩니다.',
    keywords: ['메모리', '조정', '변동성', '장기긍정']
  },
  '000660': {
    name: 'SK하이닉스',
    code: '000660',
    price: 150000,
    change: -1.2,
    changeAmount: -1800,
    sentiment: 'neutral',
    riskLevel: '높음',
    sentimentRatio: { positive: 35, negative: 40, neutral: 25 },
    analysis: '단기적 조정이 진행 중입니다. 장기 추세는 여전히 긍정적으로 평가됩니다.',
    keywords: ['메모리', '조정', '변동성', '장기긍정']
  },
  'LG전자': {
    name: 'LG전자',
    code: '066570',
    price: 95000,
    change: 0.8,
    changeAmount: 750,
    sentiment: 'neutral',
    riskLevel: '낮음',
    sentimentRatio: { positive: 52, negative: 28, neutral: 20 },
    analysis: '안정적인 움직임을 보이고 있습니다. 가전제품 시장의 수요 증가가 긍정적인 요소입니다.',
    keywords: ['가전', '안정적', '수요증가', '배당']
  },
  '066570': {
    name: 'LG전자',
    code: '066570',
    price: 95000,
    change: 0.8,
    changeAmount: 750,
    sentiment: 'neutral',
    riskLevel: '낮음',
    sentimentRatio: { positive: 52, negative: 28, neutral: 20 },
    analysis: '안정적인 움직임을 보이고 있습니다. 가전제품 시장의 수요 증가가 긍정적인 요소입니다.',
    keywords: ['가전', '안정적', '수요증가', '배당']
  }
};

const fallbackMockData = {
  '카카오': {
    name: '카카오',
    code: '035720',
    price: 48000,
    change: -0.7,
    changeAmount: -340,
    sentiment: 'neutral',
    riskLevel: '중간',
    sentimentRatio: { positive: 38, negative: 34, neutral: 28 },
    analysis: '커뮤니티 반응은 관망세에 가깝습니다. 실적 회복 기대와 플랫폼 규제 우려가 함께 언급되고 있습니다.',
    keywords: ['플랫폼', '실적', '관망', '규제']
  },
  'BTC': {
    name: 'Bitcoin',
    code: 'BTC',
    price: 62000,
    change: 1.8,
    changeAmount: 1100,
    sentiment: 'positive',
    riskLevel: '높음',
    sentimentRatio: { positive: 58, negative: 25, neutral: 17 },
    analysis: '단기 반등 기대가 우세하지만 변동성 경계 의견도 많습니다.',
    keywords: ['반등', 'ETF', '변동성', '거래량']
  },
  'ETH': {
    name: 'Ethereum',
    code: 'ETH',
    price: 3400,
    change: 0.9,
    changeAmount: 31,
    sentiment: 'neutral',
    riskLevel: '높음',
    sentimentRatio: { positive: 45, negative: 30, neutral: 25 },
    analysis: '기술 업데이트 기대와 시장 전반의 리스크가 함께 반영되고 있습니다.',
    keywords: ['업데이트', '가스비', '스테이킹', '리스크']
  },
  'TSLA': {
    name: 'Tesla',
    code: 'TSLA',
    price: 185,
    change: -1.4,
    changeAmount: -2.6,
    sentiment: 'negative',
    riskLevel: '높음',
    sentimentRatio: { positive: 30, negative: 52, neutral: 18 },
    analysis: '커뮤니티에서는 수요 둔화와 가격 경쟁에 대한 우려가 더 크게 보입니다.',
    keywords: ['전기차', '수요', '가격', '마진']
  },
  'NVDA': {
    name: 'NVIDIA',
    code: 'NVDA',
    price: 125,
    change: 2.2,
    changeAmount: 2.7,
    sentiment: 'positive',
    riskLevel: '중간',
    sentimentRatio: { positive: 70, negative: 14, neutral: 16 },
    analysis: 'AI 수요와 데이터센터 성장 기대가 긍정적으로 언급되고 있습니다.',
    keywords: ['AI', '데이터센터', 'GPU', '실적']
  }
};

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function getSignalData(symbol) {
  // TODO: Replace this mock lookup with a backend API call later.
  // Example:
  // const response = await fetch(`http://localhost:8000/signals?symbol=${encodeURIComponent(symbol)}`);
  // return response.ok ? response.json() : null;
  const normalizedSymbol = normalizeSymbol(symbol);
  await wait(500);
  return mockData[normalizedSymbol] || fallbackMockData[normalizedSymbol] || null;
}

// DOM 요소
const stockInput = document.getElementById('stock-input');
const analyzeBtn = document.getElementById('analyze-btn');
const resultsContainer = document.getElementById('results-container');
const emptyState = document.getElementById('empty-state');
const stockSuggestions = document.getElementById('stock-suggestions');

const stockCatalog = [
  { symbol: '삼성전자', name: '삼성전자', code: '005930', aliases: ['삼', '삼성', '삼전', 'samsung'] },
  { symbol: 'SK하이닉스', name: 'SK하이닉스', code: '000660', aliases: ['하이닉스', '닉스', 'sk hynix'] },
  { symbol: 'LG전자', name: 'LG전자', code: '066570', aliases: ['엘지전자', '엘전', 'lg'] },
  { symbol: '카카오', name: '카카오', code: '035720', aliases: ['카', 'kakao'] },
  { symbol: 'BTC', name: 'Bitcoin', code: 'BTC', aliases: ['비트코인', '비트', 'bitcoin'] },
  { symbol: 'ETH', name: 'Ethereum', code: 'ETH', aliases: ['이더리움', '이더', 'ethereum'] },
  { symbol: 'TSLA', name: 'Tesla', code: 'TSLA', aliases: ['테슬라', 'tesla'] },
  { symbol: 'NVDA', name: 'NVIDIA', code: 'NVDA', aliases: ['엔비디아', 'nvidia'] }
];

function normalizeSearchText(value) {
  return String(value || '').trim().toLowerCase().replace(/\s+/g, '');
}

function getStockSearchFields(stock) {
  return [stock.symbol, stock.name, stock.code, ...stock.aliases];
}

function getMatchingStocks(query) {
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) {
    return stockCatalog;
  }

  return stockCatalog.filter((stock) =>
    getStockSearchFields(stock).some((field) =>
      normalizeSearchText(field).includes(normalizedQuery)
    )
  );
}

function normalizeSymbol(input) {
  const normalizedInput = normalizeSearchText(input);

  if (!normalizedInput) {
    return '';
  }

  const exactMatch = stockCatalog.find((stock) =>
    getStockSearchFields(stock).some((field) =>
      normalizeSearchText(field) === normalizedInput
    )
  );

  if (exactMatch) {
    return exactMatch.symbol;
  }

  const partialMatch = getMatchingStocks(input)[0];
  return partialMatch ? partialMatch.symbol : input.trim();
}

function hideStockSuggestions() {
  stockSuggestions.classList.remove('visible');
}

function renderStockSuggestions(query = stockInput.value) {
  const matches = getMatchingStocks(query).slice(0, 8);

  stockSuggestions.innerHTML = '';

  if (matches.length === 0) {
    hideStockSuggestions();
    return;
  }

  matches.forEach((stock) => {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'suggestion-item';
    item.dataset.symbol = stock.symbol;
    item.setAttribute('role', 'option');

    const name = document.createElement('span');
    name.className = 'suggestion-name';
    name.textContent = stock.name;

    const meta = document.createElement('span');
    meta.className = 'suggestion-meta';
    meta.textContent = stock.code;

    item.append(name, meta);
    stockSuggestions.appendChild(item);
  });

  stockSuggestions.classList.add('visible');
}

function selectStock(symbol) {
  stockInput.value = symbol;
  hideStockSuggestions();
  stockInput.focus();
}

// 분석하기 버튼 클릭 이벤트
analyzeBtn.addEventListener('click', async () => {
  const keyword = stockInput.value.trim();
  
  if (!keyword) {
    alert('종목을 입력해주세요');
    return;
  }

  // 로딩 상태 표시
  showLoading();

  try {
    const data = await getSignalData(keyword);

    if (data) {
      displayResults([data]);
    } else {
      resultsContainer.innerHTML = '';
      emptyState.textContent = '검색 결과가 없습니다.';
      emptyState.style.display = 'block';
    }
  } catch (error) {
    console.error('Failed to get signal data:', error);
    resultsContainer.innerHTML = '';
    emptyState.textContent = '분석 데이터를 불러오지 못했습니다.';
    emptyState.style.display = 'block';
  }
});

// 엔터키로도 분석하기 가능
stockInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    analyzeBtn.click();
  }
});

stockInput.addEventListener('input', () => {
  renderStockSuggestions();
});

stockInput.addEventListener('focus', () => {
  renderStockSuggestions();
});

stockInput.addEventListener('blur', () => {
  setTimeout(hideStockSuggestions, 120);
});

stockSuggestions.addEventListener('mousedown', (e) => {
  const item = e.target.closest('.suggestion-item');

  if (!item) {
    return;
  }

  e.preventDefault();
  selectStock(item.dataset.symbol);
});

// 로딩 상태 표시
function showLoading() {
  resultsContainer.innerHTML = `
    <div class="loading">
      <span class="spinner"></span>분석 중...
    </div>
  `;
  emptyState.style.display = 'none';
}

// 결과 표시
function displayResults(results) {
  resultsContainer.innerHTML = '';
  emptyState.style.display = 'none';

  // 기존 disclaimer 제거
  const existingDisclaimer = document.querySelector('.disclaimer');
  if (existingDisclaimer) {
    existingDisclaimer.remove();
  }

  results.forEach((stock) => {
    const changeClass = stock.change >= 0 ? 'positive' : 'negative';
    const changeSymbol = stock.change >= 0 ? '+' : '';
    
    // 감정 상태 배지 스타일
    const sentimentBadgeClass = `badge badge-${stock.sentiment}`;
    const sentimentText = {
      'positive': '긍정적',
      'negative': '부정적',
      'neutral': '중립'
    }[stock.sentiment];

    // 위험도 배지 스타일
    const riskBadgeClass = `badge badge-risk-${stock.riskLevel}`;

    // Keywords 태그 생성
    const keywordsTags = stock.keywords.map(keyword => 
      `<span class="keyword-tag">${keyword}</span>`
    ).join('');

    const card = document.createElement('div');
    card.className = 'result-card';
    card.innerHTML = `
      <div class="card-header">
        <div class="header-left">
          <span class="card-title">${stock.name}</span>
          <span class="card-code">${stock.code}</span>
        </div>
      </div>
      
      <div class="card-metrics">
        <div class="metric">
          <div class="metric-label">현재가</div>
          <div class="metric-value">₩${stock.price.toLocaleString()}</div>
        </div>
        <div class="metric">
          <div class="metric-label">등락률</div>
          <div class="metric-value ${changeClass}">${changeSymbol}${stock.change}%</div>
        </div>
      </div>

      <div class="badges-section">
        <span class="${sentimentBadgeClass}">${sentimentText}</span>
        <span class="${riskBadgeClass}">위험도: ${stock.riskLevel}</span>
      </div>

      <div class="sentiment-ratio">
        <div class="ratio-label">감정 비율</div>
        <div class="ratio-bar">
          <div class="ratio-segment positive" style="width: ${stock.sentimentRatio.positive}%" title="긍정적 ${stock.sentimentRatio.positive}%"></div>
          <div class="ratio-segment neutral" style="width: ${stock.sentimentRatio.neutral}%" title="중립 ${stock.sentimentRatio.neutral}%"></div>
          <div class="ratio-segment negative" style="width: ${stock.sentimentRatio.negative}%" title="부정적 ${stock.sentimentRatio.negative}%"></div>
        </div>
        <div class="ratio-legend">
          <span><span class="legend-dot positive"></span> 긍정 ${stock.sentimentRatio.positive}%</span>
          <span><span class="legend-dot neutral"></span> 중립 ${stock.sentimentRatio.neutral}%</span>
          <span><span class="legend-dot negative"></span> 부정 ${stock.sentimentRatio.negative}%</span>
        </div>
      </div>

      <div class="card-analysis">
        <div class="analysis-title">📊 분석 결과</div>
        <div class="analysis-text">${stock.analysis}</div>
      </div>

      <div class="keywords-section">
        <div class="keywords-label">주요 키워드</div>
        <div class="keywords-container">
          ${keywordsTags}
        </div>
      </div>
    `;

    resultsContainer.appendChild(card);
  });

  // 하단 안내문 추가
  const disclaimer = document.createElement('div');
  disclaimer.className = 'disclaimer';
  disclaimer.innerHTML = '⚠️ 투자 조언이 아닌 참고용 정보입니다.';
  resultsContainer.parentElement.appendChild(disclaimer);
}

// 초기 포커스
const stockKeywordPatterns = [
  { value: 'BTC', patterns: [/\bBTC\b/i, /\bBitcoin\b/i, /비트코인/] },
  { value: 'ETH', patterns: [/\bETH\b/i, /\bEthereum\b/i, /이더리움/] },
  { value: 'TSLA', patterns: [/\bTSLA\b/i, /\bTesla\b/i, /테슬라/] },
  { value: 'NVDA', patterns: [/\bNVDA\b/i, /\bNvidia\b/i, /\bNVIDIA\b/i, /엔비디아/] },
  { value: '삼성전자', patterns: [/삼성전자/, /005930/] },
  { value: '카카오', patterns: [/카카오/, /035720/] }
];

function sendMessageToTab(tabId, message) {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, message, (response) => {
      const error = chrome.runtime.lastError;

      if (error) {
        reject(error);
        return;
      }

      resolve(response);
    });
  });
}

function executeContentScript(tabId) {
  return chrome.scripting.executeScript({
    target: { tabId },
    files: ['content.js']
  });
}

async function getCurrentPageInfo() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab?.id || !tab.url || tab.url.startsWith('chrome://') || tab.url.startsWith('chrome-extension://')) {
    return null;
  }

  try {
    return await sendMessageToTab(tab.id, { action: 'collectPageInfo' });
  } catch (error) {
    await executeContentScript(tab.id);
    return sendMessageToTab(tab.id, { action: 'collectPageInfo' });
  }
}

function detectStockKeywords(pageInfo) {
  const pageText = `${pageInfo?.title || ''} ${pageInfo?.url || ''} ${pageInfo?.text || ''}`;

  return stockKeywordPatterns
    .filter((stock) => stock.patterns.some((pattern) => pattern.test(pageText)))
    .map((stock) => stock.value);
}

async function fillStockInputFromCurrentTab() {
  try {
    const pageInfo = await getCurrentPageInfo();
    const detectedKeywords = detectStockKeywords(pageInfo);

    if (detectedKeywords.length > 0 && !stockInput.value.trim()) {
      stockInput.value = detectedKeywords.join(', ');
    }
  } catch (error) {
    console.warn('Failed to detect stock keywords from current tab:', error);
  }
}

window.addEventListener('load', () => {
  stockInput.focus();
  renderStockSuggestions();
  fillStockInputFromCurrentTab();
});
