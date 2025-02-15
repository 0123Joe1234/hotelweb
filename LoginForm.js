import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { TextField, Button, Box, Typography, Alert, Paper } from '@mui/material';

const LoginForm = () => {
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const result = await login(formData.email, formData.password);
        if (!result.success) {
            setError(result.error || 'Login failed');
        }
    };

    return (
        <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 8
        }}>
            <Paper elevation={3} sx={{
                p: 4,
                backgroundColor: '#F5F5DC', // beige
                borderRadius: 2,
                maxWidth: 400,
                width: '100%',
                boxShadow: '0px 4px 20px rgba(165, 42, 42, 0.1)' // brown
            }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{
                    color: '#964B00', // brown
                    textAlign: 'center',
                    fontWeight: 600,
                    mb: 4
                }}>
                    Welcome Back
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}>
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                    borderColor: '#964B00', // brown
                                },
                            },
                        }}
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                    borderColor: '#964B00', // brown
                                },
                            },
                        }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        sx={{
                            mt: 2,
                            py: 1.5,
                            fontSize: '1.1rem',
                            fontWeight: 500,
                            backgroundColor: '#964B00', // brown
                            '&:hover': {
                                backgroundColor: '#786C3B' // darker brown
                            }
                        }}
                    >
                        Login
                    </Button>
                </Box>

                <Typography variant="body2" align="center" sx={{ mt: 3, color: '#786C3B' }}>
                    Don't have an account?{' '}
                    <Typography
                        component="a"
                        href="/register"
                        sx={{
                            color: '#964B00', // brown
                            textDecoration: 'none',
                            '&:hover': {
                                textDecoration: 'underline'
                            }
                        }}
                    >
                        Sign up here
                    </Typography>
                </Typography>
            </Paper>
        </Box>
    );
};

export default LoginForm;
