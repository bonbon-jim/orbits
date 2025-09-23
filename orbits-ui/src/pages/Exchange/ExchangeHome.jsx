import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Grid, TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import CryptoCard from '../../components/exchange/CryptoCard';
import { api } from '../../services/api';

const ExchangeHome = () => {
  const [cryptoData, setCryptoData] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCryptoPrices();
    
    // 设置定时刷新
    const interval = setInterval(fetchCryptoPrices, 30000); // 每30秒刷新一次
    
    return () => clearInterval(interval);
  }, []);

  const fetchCryptoPrices = async () => {
    try {
      setLoading(true);
      const data = await api.getCryptoPrices();
      setCryptoData(data);
    } catch (error) {
      console.error('Failed to fetch crypto prices:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (symbol) => {
    navigate(`/exchange/trade/${symbol.toLowerCase()}`);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredCryptos = Object.values(cryptoData).filter(crypto =>
    crypto.symbol.toLowerCase().includes(searchTerm) ||
    crypto.name.toLowerCase().includes(searchTerm)
  );

  if (loading && Object.keys(cryptoData).length === 0) {
    return (
      <Container maxWidth="xl" className="py-8">
        <Box className="text-center">
          <Typography variant="h4" className="mb-4">
            加载中...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" className="py-8">
      <Box className="text-center mb-8">
        <Typography variant="h3" className="font-bold text-gray-900 mb-4">
          Web3 交易所
        </Typography>
        <Typography variant="h6" className="text-gray-600 mb-6">
          实时加密货币价格与交易
        </Typography>
        
        <TextField
          placeholder="搜索币种..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          className="w-full max-w-md"
        />
      </Box>

      <Grid container spacing={3}>
        {filteredCryptos.map((crypto) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={crypto.symbol}>
            <CryptoCard
              crypto={crypto}
              onCardClick={handleCardClick}
            />
          </Grid>
        ))}
      </Grid>

      {filteredCryptos.length === 0 && (
        <Box className="text-center py-12">
          <Typography variant="h6" className="text-gray-500">
            未找到匹配的币种
          </Typography>
        </Box>
      )}

      <Box className="mt-8 text-center">
        <Typography variant="body2" className="text-gray-500">
          数据每30秒自动更新 | 共 {Object.keys(cryptoData).length} 个币种
        </Typography>
      </Box>
    </Container>
  );
};

export default ExchangeHome;
