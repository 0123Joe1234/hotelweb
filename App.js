import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import HotelList from './components/HotelList';
import BookingForm from './components/BookingForm';
import { useAuth } from './context/AuthContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
    handleClose();
    navigate('/');
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CssBaseline />
            <Layout>
              <AppBar position="fixed" color="primary" elevation={0} sx={{ bgcolor: 'rgba(0, 0, 0, 0.5)' }}>
                <Toolbar>
                  <Typography 
                    variant="h6" 
                    component="div" 
                    sx={{ 
                      flexGrow: 1, 
                      cursor: 'pointer',
                      fontFamily: 'Playfair Display',
                      fontWeight: 600
                    }}
                    onClick={() => navigate('/')}
                  >
                    Luxury Hotel Booking
                  </Typography>
                  
                  <Button 
                    color="inherit" 
                    onClick={() => navigate('/hotels')}
                    sx={{ 
                      mx: 1,
                      textTransform: 'none',
                      fontSize: '1rem'
                    }}
                  >
                    Hotels
                  </Button>

                  {user ? (
                    <>
                      <IconButton
                        size="large"
                        onClick={handleMenu}
                        color="inherit"
                      >
                        <AccountCircleIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        PaperProps={{
                          sx: {
                            mt: 1,
                            '& .MuiMenuItem-root': {
                              px: 2,
                              py: 1,
                            },
                          },
                        }}
                      >
                        <MenuItem onClick={() => { handleClose(); navigate('/profile'); }}>
                          Profile
                        </MenuItem>
                        <MenuItem onClick={() => { handleClose(); navigate('/bookings'); }}>
                          My Bookings
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </Menu>
                    </>
                  ) : (
                    <>
                      <Button 
                        color="inherit" 
                        onClick={() => navigate('/login')}
                        sx={{ 
                          mx: 1,
                          textTransform: 'none',
                          fontSize: '1rem'
                        }}
                      >
                        Login
                      </Button>
                      <Button 
                        variant="outlined" 
                        color="inherit" 
                        onClick={() => navigate('/register')}
                        sx={{ 
                          ml: 1,
                          textTransform: 'none',
                          fontSize: '1rem',
                          borderWidth: 2,
                          '&:hover': {
                            borderWidth: 2
                          }
                        }}
                      >
                        Register
                      </Button>
                    </>
                  )}
                </Toolbar>
              </AppBar>

              <Box component="main" sx={{ 
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                pt: 8
              }}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/hotels" element={<HotelList />} />
                  <Route path="/login" element={<LoginForm />} />
                  <Route path="/register" element={<RegisterForm />} />
                  <Route path="/booking/:hotelId" element={<BookingForm />} />
                  <Route path="/bookings/success" element={
                    <Box sx={{ textAlign: 'center', mt: 8 }}>
                      <Typography variant="h4" color="primary.main" gutterBottom>
                        Booking Successful!
                      </Typography>
                      <Typography variant="body1" paragraph>
                        Thank you for choosing our hotel. Your booking has been confirmed.
                      </Typography>
                      <Button variant="contained" color="primary" onClick={() => navigate('/')}>
                        Return to Home
                      </Button>
                    </Box>
                  } />
                </Routes>
              </Box>

              <Box component="footer" sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: 'primary.main',
                color: 'white'
              }}>
                <Container maxWidth="sm">
                  <Typography variant="body2" align="center">
                    {new Date().getFullYear()} Luxury Hotel Booking. All rights reserved.
                  </Typography>
                </Container>
              </Box>
            </Layout>
          </LocalizationProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
