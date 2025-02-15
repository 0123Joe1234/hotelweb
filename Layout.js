import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Layout({ children }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

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
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      bgcolor: 'background.default'
    }}>
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
        flexDirection: 'column'
      }}>
        <Toolbar /> {/* Spacer for fixed AppBar */}
        {children}
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
    </Box>
  );
}

export default Layout;
