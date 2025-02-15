import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery,
  Fade
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import KingBedIcon from '@mui/icons-material/KingBed';
import WifiIcon from '@mui/icons-material/Wifi';
import PoolIcon from '@mui/icons-material/Pool';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const HomePage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  const features = [
    {
      icon: <KingBedIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Luxurious Rooms',
      description: 'Experience ultimate comfort in our premium suites'
    },
    {
      icon: <WifiIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'High-Speed WiFi',
      description: 'Stay connected with complimentary high-speed internet'
    },
    {
      icon: <PoolIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Infinity Pool',
      description: 'Relax in our stunning rooftop infinity pool'
    },
    {
      icon: <RestaurantIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Fine Dining',
      description: 'Savor exquisite cuisine at our restaurants'
    }
  ];

  return (
    <Box>
      <Container maxWidth="lg">
        <Box sx={{ 
          textAlign: 'center', 
          pt: { xs: 4, md: 8 },
          pb: { xs: 6, md: 10 }
        }}>
          <Typography
            component="h1"
            variant="h2"
            sx={{
              mb: 2,
              fontWeight: 'bold'
            }}
          >
            Find Your Perfect Stay
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Discover luxury hotels at the best prices
          </Typography>

          <Box sx={{ 
            maxWidth: 800, 
            mx: 'auto',
            p: 3,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3
          }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  placeholder="Where are you going?"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <DatePicker
                  label="Check-in"
                  value={checkIn}
                  onChange={setCheckIn}
                  slots={{
                    textField: (params) => <TextField {...params} fullWidth />
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <DatePicker
                  label="Check-out"
                  value={checkOut}
                  onChange={setCheckOut}
                  slots={{
                    textField: (params) => <TextField {...params} fullWidth />
                  }}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{ height: '100%' }}
                  startIcon={<SearchIcon />}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box sx={{ py: 8 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{ mb: 6, textAlign: 'center' }}
          >
            Our Features
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ height: '100%', textAlign: 'center' }}>
                  <CardContent>
                    <Box sx={{ mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
