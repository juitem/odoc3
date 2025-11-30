import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { krStocks } from '../services/mockStockListData';

const columns = [
  { field: 'ticker', headerName: '종목코드', width: 100 },
  { field: 'name', headerName: '종목명', width: 250 },
  {
    field: 'price',
    headerName: '현재가',
    type: 'number',
    width: 120,
    valueFormatter: (params) => `₩${params.value.toLocaleString()}`,
  },
  {
    field: 'changePercent',
    headerName: '등락률 (%)',
    width: 150,
    renderCell: (params) => {
      const value = params.value;
      const color = value > 0 ? 'success' : value < 0 ? 'error' : 'default';
      const label = `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
      return <Chip label={label} color={color} variant="outlined" size="small" />;
    },
  },
  { field: 'marketCap', headerName: '시가총액', width: 150 },
  { field: 'volume', headerName: '거래대금', width: 150 },
];

const KRStockListPage = () => {
  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        한국 주식 목록
      </Typography>
      <DataGrid
        rows={krStocks}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
          sorting: {
            sortModel: [{ field: 'marketCap', sort: 'desc' }],
          },
        }}
        pageSizeOptions={[10, 25, 50]}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default KRStockListPage;
