import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box, CircularProgress, Alert } from '@mui/material';
import IndexCard from '../components/IndexCard';
import TopStocksTable from '../components/TopStocksTable';
import { getMajorIndexes, getMostActiveStocks } from '../services/api';

// 한국 데이터는 API 연동 전까지 임시 데이터 유지
const topStocksKR = [
  { rank: 1, name: '삼성전자', volume: '2.5조' },
  { rank: 2, name: 'SK하이닉스', volume: '1.8조' },
  { rank: 3, name: 'LG에너지솔루션', volume: '1.5조' },
  { rank: 4, name: '에코프로비엠', volume: '1.1조' },
  { rank: 5, name: 'POSCO홀딩스', volume: '9,500억' },
];
const krIndices = [
    { name: '코스피 (KOSPI)', value: '2,750.43', change: '-15.21', percentageChange: '-0.55%', up: false },
    { name: '코스닥 (KOSDAQ)', value: '910.88', change: '+1.88', percentageChange: '+0.21%', up: true },
]

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [indices, setIndices] = useState([]);
  const [usStocks, setUsStocks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const [indexesResponse, activeStocksResponse] = await Promise.all([
          getMajorIndexes(),
          getMostActiveStocks(),
        ]);

        // API 응답 데이터를 컴포넌트 형식에 맞게 변환
        const formattedIndexes = indexesResponse.flat().map(index => ({
          name: index.name,
          value: index.price.toFixed(2),
          change: index.change.toFixed(2),
          percentageChange: `${index.changesPercentage.toFixed(2)}%`,
          up: index.change >= 0,
        }));
        setIndices([...formattedIndexes, ...krIndices]);

        const formattedActiveStocks = activeStocksResponse.slice(0, 5).map((stock, idx) => ({
          rank: idx + 1,
          name: stock.companyName,
          volume: `${(stock.volume / 1000000).toFixed(1)}M`, // 볼륨 단위 변환
        }));
        setUsStocks(formattedActiveStocks);

      } catch (err) {
        setError(err.message || '데이터를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  }

  if (error) {
    return <Alert severity="error" sx={{ mt: 4 }}>Error: {error} --- API 키가 `src/services/api.js` 파일에 올바르게 입력되었는지 확인해주세요.</Alert>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        주요 시장 지수
      </Typography>
      <Grid container spacing={3}>
        {indices.map((index) => (
          <Grid item xs={12} sm={6} md={3} key={index.name}>
            <IndexCard index={index} />
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" gutterBottom sx={{ mt: 5 }}>
        거래대금 상위
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TopStocksTable title="미국 주식 (거래량 기준)" stocks={usStocks} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TopStocksTable title="한국 주식" stocks={topStocksKR} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;

