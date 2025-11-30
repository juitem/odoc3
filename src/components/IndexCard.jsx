import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const IndexCard = ({ index }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Typography variant="h6" component="div">
        {index.name}
      </Typography>
      <Typography variant="h5" sx={{ mt: 1 }}>
        {index.value}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: index.up ? 'success.main' : 'error.main',
          mt: 1,
        }}
      >
        {index.up ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
        <Typography variant="body2" sx={{ ml: 0.5 }}>
          {index.change} ({index.percentageChange})
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export default IndexCard;
