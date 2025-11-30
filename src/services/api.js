const API_KEY = "YOUR_API_KEY";
const BASE_URL = "https://financialmodelingprep.com/api/v3";

/**
 * API 호출을 위한 기본 함수
 * @param {string} endpoint - API 엔드포인트
 * @returns {Promise<any>} - API 응답 데이터
 */
const fetchFromApi = async (endpoint) => {
  if (API_KEY === "YOUR_API_KEY") {
    console.error("API 키를 api.js 파일에 입력해주세요.");
    // 개발 편의를 위해 임시 경고를 표시하고, 실제 에러는 발생시키지 않을 수 있습니다.
    // 하지만 실제 운영에서는 에러를 던지는 것이 좋습니다.
    // throw new Error("API key is not set.");
    return Promise.reject("API key is not set.");
  }

  const url = `${BASE_URL}${endpoint}?apikey=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
};

// --- 주요 API 함수들 ---

/**
 * 주요 시장 지수 데이터를 가져옵니다. (S&P 500, Nasdaq, Dow Jones)
 */
export const getMajorIndexes = () => {
    // FMP는 주요 지수를 개별적으로 가져오거나, /majors-indexes 엔드포인트를 사용합니다.
    // 여기서는 주요 지수 심볼을 기반으로 일괄 요청을 가정합니다.
    // 예: .INX (S&P 500), .IXIC (NASDAQ), .DJI (Dow Jones)
    // FMP 무료 플랜에서는 실시간 지수보다 종가(EOD) 데이터가 더 적합할 수 있습니다.
    // 우선 개별 지수 quote로 구현합니다.
    const sp500 = fetchFromApi(`/quote/.INX`);
    const nasdaq = fetchFromApi(`/quote/.IXIC`);
    // 한국 지수는 별도 처리가 필요합니다.
    return Promise.all([sp500, nasdaq]);
};

/**
 * 거래가 가장 활발한 미국 주식 목록을 가져옵니다.
 */
export const getMostActiveStocks = () => {
  return fetchFromApi(`/stock_market/actives`);
};

/**
 * 특정 종목의 일일 시세 데이터를 가져옵니다.
 * @param {string} ticker - 종목 티커
 */
export const getHistoricalData = (ticker) => {
  // 예: /api/v3/historical-price-full/AAPL
  return fetchFromApi(`/historical-price-full/${ticker}`);
};

