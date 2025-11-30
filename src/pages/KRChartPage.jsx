import React from 'react';
import { Box, Typography, Paper, TextField, Alert } from '@mui/material';
import Chart from '../components/Chart';
import { sampleCandlestickData } from '../services/mockChartData';

const KRChartPage = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        한국 주식 전문 차트
      </Typography>
      <Alert severity="info" sx={{ mb: 2 }}>
        안내: 현재 프로토타입에서는 한국 주식의 실시간 차트 데이터를 지원하지 않습니다. 아래는 기능 시연을 위한 샘플 차트입니다.
      </Alert>
      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField 
          fullWidth 
          label="종목 코드 또는 이름 검색 (예: 005930, 삼성전자)" 
          variant="outlined" 
          disabled // 기능이 없으므로 비활성화
        />
      </Paper>
      <Paper sx={{ p: 2, height: '550px' }}>
        <Chart data={sampleCandlestickData} />
      </Paper>
    </Box>
  );
};

export default KRChartPage;
