import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, TextField, CircularProgress, Alert } from '@mui/material';
import Chart from '../components/Chart';
import { getHistoricalData } from '../services/api';

const USChartPage = () => {
  const [symbol, setSymbol] = useState('AAPL');
  const [inputValue, setInputValue] = useState('AAPL');
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getHistoricalData(symbol);
        
        if (!response || !response.historical) {
          throw new Error('No historical data found for this symbol.');
        }

        // 데이터가 시간 역순으로 오므로 뒤집고, 차트 형식에 맞게 변환합니다.
        const formattedData = response.historical.map(item => ({
          time: new Date(item.date).getTime() / 1000, // UTC timestamp
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
        })).reverse();
        
        setChartData(formattedData);
      } catch (err) {
        setError(err.message || '차트 데이터를 불러오는 데 실패했습니다.');
        setChartData([]); // 에러 발생 시 차트 데이터를 비웁니다.
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [symbol]); // symbol이 변경될 때마다 이 effect를 다시 실행

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setSymbol(inputValue.toUpperCase());
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        미국 주식 전문 차트
      </Typography>
      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField 
          fullWidth 
          label="종목 코드 검색 (예: AAPL, MSFT)" 
          variant="outlined"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          helperText="티커를 입력하고 Enter를 누르세요."
        />
      </Paper>
      <Paper sx={{ p: 2, height: '550px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : chartData.length > 0 ? (
          <Chart data={chartData} />
        ) : (
          <Typography>표시할 데이터가 없습니다.</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default USChartPage;
