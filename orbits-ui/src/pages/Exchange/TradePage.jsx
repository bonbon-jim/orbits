import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Paper, TextField, Button, Grid, Alert } from '@mui/material';
import { ArrowBack, TrendingUp, TrendingDown } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';

const TradePage = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [crypto, setCrypto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tradeType, setTradeType] = useState('buy');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [tradeStatus, setTradeStatus] = useState({ success: null, message: '' });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/exchange');
      return;
    }

    fetchCryptoDetail();
    
    // 设置价格更新间隔
    const interval = setInterval(fetchCryptoDetail, 10000); // 每10秒更新价格
    
    return () => clearInterval(interval);
  }, [symbol, isAuthenticated, navigate]);

  const fetchCryptoDetail = async () => {
    try {
      const data = await api.getCryptoDetail(symbol);
      if (data) {
        setCrypto(data);
        setPrice(data.price);
      }
    } catch (error) {
      console.error('Failed to fetch crypto detail:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (amount && price) {
      const calculatedTotal = parseFloat(amount) * price;
      setTotal(isNaN(calculatedTotal) ? 0 : calculatedTotal);
    } else {
      setTotal(0);
    }
  }, [amount, price]);

  const handleAmountChange = (event) => {
    const value = event.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleTrade = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setTradeStatus({ success: false, message: '请输入有效的交易数量' });
      return;
    }

    try {
      setTradeStatus({ success: null, message: '处理中...' });
      
      const tradeData = {
        symbol: symbol.toUpperCase(),
        type: tradeType,
        amount: parseFloat(amount),
        price: price,
        total: total
      };

      const result = await api.executeTrade(tradeData);
      
      setTradeStatus({ 
        success: true, 
        message: `交易成功！订单号: ${result.orderId}` 
      });
      
      // 清空输入
      setAmount('');
    } catch (error) {
      setTradeStatus({ 
        success: false, 
        message: `交易失败: ${error.message}` 
      });
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" className="py-8">
        <Box className="text-center">
          <Typography variant="h4">加载中...</Typography>
        </Box>
      </Container>
    );
  }

  if (!crypto) {
    return (
      <Container maxWidth="lg" className="py-8">
        <Box className="text-center">
          <Typography variant="h4" className="mb-4">币种未找到</Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/exchange')}
            startIcon={<ArrowBack />}
          >
            返回交易所
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" className="py-8">
      <Box className="mb-6">
        <Button 
          variant="outlined" 
          onClick={() => navigate('/exchange')}
          startIcon={<ArrowBack />}
          className="mb-4"
        >
          返回交易所
        </Button>

        <Box className="flex items-center space-x-4 mb-6">
          <Typography variant="h3" className="font-bold">
            {crypto.symbol}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            {crypto.name}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper className="p-6">
              <Typography variant="h5" className="mb-4 font-bold">
                当前价格
              </Typography>
              
              <Box className="flex items-center space-x-2 mb-4">
                <Typography variant="h4" className="font-bold">
                  ${crypto.price.toLocaleString('en-US', { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2 
                  })}
                </Typography>
                <Box className={`flex items-center ${
                  crypto.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {crypto.change >= 0 ? (
                    <TrendingUp fontSize="small" />
                  ) : (
                    <TrendingDown fontSize="small" />
                  )}
                  <Typography variant="body1" className="font-semibold">
                    {crypto.change >= 0 ? '+' : ''}{crypto.change.toFixed(2)}%
                  </Typography>
                </Box>
              </Box>

              <Grid container spacing={2} className="mb-4">
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">
                    24h成交量
                  </Typography>
                  <Typography variant="body1" className="font-semibold">
                    ${(crypto.volume / 1000000).toFixed(1)}M
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">
                    市值
                  </Typography>
                  <Typography variant="body1" className="font-semibold">
                    ${(crypto.marketCap / 1000000000).toFixed(1)}B
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper className="p-6">
              <Typography variant="h5" className="mb-4 font-bold">
                交易面板
              </Typography>

              <Box className="mb-4">
                <Typography variant="body2" className="mb-2">
                  交易类型
                </Typography>
                <Box className="flex space-x-2">
                  <Button
                    variant={tradeType === 'buy' ? 'contained' : 'outlined'}
                    onClick={() => setTradeType('buy')}
                    color="success"
                  >
                    买入
                  </Button>
                  <Button
                    variant={tradeType === 'sell' ? 'contained' : 'outlined'}
                    onClick={() => setTradeType('sell')}
                    color="error"
                  >
                    卖出
                  </Button>
                </Box>
              </Box>

              <TextField
                fullWidth
                label="数量"
                type="text"
                value={amount}
                onChange={handleAmountChange}
                className="mb-4"
                placeholder="0.00"
              />

              <TextField
                fullWidth
                label="价格 (USD)"
                type="number"
                value={price.toFixed(2)}
                InputProps={{ readOnly: true }}
                className="mb-4"
              />

              <TextField
                fullWidth
                label="总计 (USD)"
                type="number"
                value={total.toFixed(2)}
                InputProps={{ readOnly: true }}
                className="mb-4"
              />

              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleTrade}
                color={tradeType === 'buy' ? 'success' : 'error'}
                disabled={!amount || parseFloat(amount) <= 0}
              >
                {tradeType === 'buy' ? '买入' : '卖出'} {crypto.symbol}
              </Button>

              {tradeStatus.message && (
                <Alert 
                  severity={tradeStatus.success ? 'success' : 'error'} 
                  className="mt-4"
                >
                  {tradeStatus.message}
                </Alert>
              )}
            </Paper>
          </Grid>
        </Grid>

        <Box className="mt-6 p-4 bg-gray-50 rounded-lg">
          <Typography variant="body2" color="textSecondary">
            提示: 当前为演示模式，所有交易操作均为模拟。实际交易功能需要连接真实的交易所API。
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default TradePage;
