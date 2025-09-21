import React, { useState, useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import { Card, CardContent, Typography, Box, IconButton, Switch, FormControlLabel } from '@mui/material';
import { Refresh, Settings } from '@mui/icons-material';

const CryptoCard = ({ crypto, onCardClick }) => {
  const [chartData, setChartData] = useState([]);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(30);
  const intervalRef = useRef(null);

  // 从localStorage加载设置
  useEffect(() => {
    const settings = localStorage.getItem(`crypto_${crypto.symbol}_settings`);
    if (settings) {
      const { autoRefresh: savedAutoRefresh, refreshInterval: savedInterval } = JSON.parse(settings);
      setAutoRefresh(savedAutoRefresh);
      setRefreshInterval(savedInterval);
    }
  }, [crypto.symbol]);

  // 保存设置到localStorage
  const saveSettings = (newAutoRefresh, newInterval) => {
    const settings = {
      autoRefresh: newAutoRefresh,
      refreshInterval: newInterval
    };
    localStorage.setItem(`crypto_${crypto.symbol}_settings`, JSON.stringify(settings));
  };

  // 处理自动刷新
  useEffect(() => {
    if (autoRefresh) {
      intervalRef.current = setInterval(() => {
        fetchChartData();
      }, refreshInterval * 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoRefresh, refreshInterval, crypto.symbol]);

  const fetchChartData = async () => {
    // 模拟数据更新
    const newChartData = crypto.chartData.map(point => ({
      ...point,
      price: point.price + (Math.random() - 0.5) * 100
    }));
    setChartData(newChartData);
  };

  useEffect(() => {
    setChartData(crypto.chartData);
  }, [crypto.chartData]);

  const chartOption = {
    grid: {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10,
      containLabel: false
    },
    xAxis: {
      type: 'category',
      show: false,
      data: chartData.map((_, index) => index)
    },
    yAxis: {
      type: 'value',
      show: false
    },
    series: [{
      type: 'line',
      data: chartData.map(point => point.price),
      smooth: true,
      symbol: 'none',
      lineStyle: {
        color: crypto.change >= 0 ? '#00C853' : '#FF5252',
        width: 2
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: crypto.change >= 0 ? 'rgba(0, 200, 83, 0.3)' : 'rgba(255, 82, 82, 0.3)'
          }, {
            offset: 1,
            color: 'rgba(0, 200, 83, 0)' 
          }]
        }
      }
    }],
    animation: false
  };

  const handleAutoRefreshChange = (event) => {
    const newAutoRefresh = event.target.checked;
    setAutoRefresh(newAutoRefresh);
    saveSettings(newAutoRefresh, refreshInterval);
  };

  const handleRefreshIntervalChange = (event) => {
    const newInterval = parseInt(event.target.value);
    setRefreshInterval(newInterval);
    saveSettings(autoRefresh, newInterval);
  };

  const handleManualRefresh = () => {
    fetchChartData();
  };

  return (
    <Card 
      className="hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onCardClick(crypto.symbol)}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <Typography variant="h6" className="font-bold">
              {crypto.symbol}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {crypto.name}
            </Typography>
          </div>
          <IconButton size="small" onClick={(e) => {
            e.stopPropagation();
            handleManualRefresh();
          }}>
            <Refresh fontSize="small" />
          </IconButton>
        </div>

        <div className="flex justify-between items-center mb-3">
          <Typography variant="h5" className="font-bold">
            ${crypto.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Typography>
          <Typography 
            variant="body2" 
            className={`font-semibold ${crypto.change >= 0 ? 'text-green-600' : 'text-red-600'}`}
          >
            {crypto.change >= 0 ? '+' : ''}{crypto.change.toFixed(2)}%
          </Typography>
        </div>

        <div className="h-[80px] mb-3">
          <ReactECharts
            option={chartOption}
            style={{ height: '100%', width: '100%' }}
            opts={{ renderer: 'svg' }}
          />
        </div>

        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>24h Vol: ${(crypto.volume / 1000000).toFixed(1)}M</span>
          <span>MCap: ${(crypto.marketCap / 1000000000).toFixed(1)}B</span>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-200">
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={autoRefresh}
                onChange={handleAutoRefreshChange}
                onClick={(e) => e.stopPropagation()}
              />
            }
            label="自动刷新"
            onClick={(e) => e.stopPropagation()}
          />
          
          {autoRefresh && (
            <div className="flex items-center space-x-2 mt-1" onClick={(e) => e.stopPropagation()}>
              <Typography variant="caption">频率:</Typography>
              <select
                value={refreshInterval}
                onChange={handleRefreshIntervalChange}
                className="text-xs border rounded px-1 py-0.5"
              >
                <option value={10}>10秒</option>
                <option value={30}>30秒</option>
                <option value={60}>1分钟</option>
                <option value={300}>5分钟</option>
              </select>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CryptoCard;
