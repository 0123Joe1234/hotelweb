import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  Box,
  Container,
  Rating,
  Skeleton,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const defaultImage = 'https://images.unsplash.com/photo-1566073771259-6a8506099945';

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await fetch('/api/hotels');
      if (!response.ok) {
        throw new Error('Failed to fetch hotels');
      }
      const data = await response.json();
      setHotels(data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = (hotelId) => {
    navigate(`/booking/${hotelId}`);
  };

  if (loading) {
    return (
      <Container sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item key={item} xs={12} sm={6} md={4}>
              <Card>
                <Skeleton variant="rectangular" height={200} />
                <CardContent>
                  <Skeleton variant="text" height={40} />
                  <Skeleton variant="text" height={20} />
                  <Skeleton variant="text" height={20} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" component="h2" gutterBottom sx={{
        color: 'primary.main',
        textAlign: 'center',
        mb: 6,
        fontFamily: 'Playfair Display'
      }}>
        Available Hotels
      </Typography>
      
      <Grid container spacing={4}>
        {hotels.map((hotel) => (
          <Grid item key={hotel.id} xs={12} sm={6} md={4}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.02)'
              },
              bgcolor: 'background.paper',
              boxShadow: 3
            }}>
              <CardMedia
                component="img"
                height="200"
                image={hotel.images?.[0] || defaultImage}
                alt={hotel.name}
                sx={{
                  objectFit: 'cover'
                }}
              />
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography gutterBottom variant="h5" component="h2" sx={{ 
                  color: 'primary.main',
                  fontFamily: 'Playfair Display',
                  fontWeight: 600
                }}>
                  {hotel.name}
                </Typography>
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                  <Rating value={hotel.rating || 0} precision={0.5} readOnly />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    ({hotel.rating || 0})
                  </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  {hotel.location}
                </Typography>
                <Typography variant="body2" sx={{ 
                  mb: 3,
                  color: 'text.secondary',
                  minHeight: '3em',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {hotel.description}
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mt: 'auto'
                }}>
                  <Typography variant="h6" sx={{ 
                    color: 'primary.main',
                    fontWeight: 600
                  }}>
                    ${hotel.price}
                    <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
                      /night
                    </Typography>
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleBookNow(hotel.id)}
                    disabled={hotel.availableRooms === 0}
                    sx={{
                      px: 3,
                      py: 1,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600
                    }}
                  >
                    {hotel.availableRooms > 0 ? 'Book Now' : 'Fully Booked'}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HotelList;
