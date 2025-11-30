import React from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';

const TopStocksTable = ({ title, stocks }) => (
  <TableContainer component={Paper}>
    <Typography variant="h6" sx={{ p: 2 }}>{title}</Typography>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>순위</TableCell>
          <TableCell>종목명</TableCell>
          <TableCell align="right">거래대금</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {stocks.map((stock) => (
          <TableRow key={stock.rank}>
            <TableCell><Chip label={stock.rank} size="small" /></TableCell>
            <TableCell>{stock.name}</TableCell>
            <TableCell align="right">{stock.volume}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default TopStocksTable;
