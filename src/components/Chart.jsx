import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import { useTheme } from '@mui/material/styles';

const Chart = ({ data }) => {
  const chartContainerRef = useRef();
  const chartRef = useRef();
  const theme = useTheme();

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chartOptions = {
      layout: {
        background: { color: theme.palette.background.paper },
        textColor: theme.palette.text.primary,
      },
      grid: {
        vertLines: { color: theme.palette.divider },
        horzLines: { color: theme.palette.divider },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      }
    };

    chartRef.current = createChart(chartContainerRef.current, chartOptions);
    const candlestickSeries = chartRef.current.addCandlestickSeries({
      upColor: theme.palette.success.main,
      downColor: theme.palette.error.main,
      borderDownColor: theme.palette.error.main,
      borderUpColor: theme.palette.success.main,
      wickDownColor: theme.palette.error.main,
      wickUpColor: theme.palette.success.main,
    });
    
    candlestickSeries.setData(data);
    
    chartRef.current.timeScale().fitContent();

    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.resize(chartContainerRef.current.clientWidth, chartContainerRef.current.clientHeight);
      }
    };
    
    // Set initial size
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, [data, theme]);

  return <div ref={chartContainerRef} style={{ height: '500px', width: '100%' }} />;
};

export default Chart;
