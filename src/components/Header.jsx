import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const navItems = [
  { label: '대시보드', path: '/' },
  { label: '미국 주식', path: '/us-stocks' },
  { label: '한국 주식', path: '/kr-stocks' },
  { label: '미국 차트', path: '/us-chart' },
  { label: '한국 차트', path: '/kr-chart' },
  { label: '노트', path: '/notes' },
];

const Header = () => {
  return (
    <AppBar component="nav" position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          주식 분석 도구
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          {navItems.map((item) => (
            <Button
              key={item.label}
              sx={{ color: '#fff' }}
              component={RouterLink}
              to={item.path}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
