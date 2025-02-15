import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Alert, Paper } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const RegisterForm = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
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

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const result = await register({
            name: formData.name,
            email: formData.email,
            password: formData.password
        });

        if (result.success) {
            navigate('/login');
        } else {
            setError(result.error || 'Registration failed');
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
                backgroundColor: 'background.paper',
                borderRadius: 2,
                maxWidth: 400,
                width: '100%',
                boxShadow: '0px 4px 20px rgba(0,0,0,0.1)'
            }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{
                    color: 'primary.main',
                    textAlign: 'center',
                    fontWeight: 600,
                    mb: 4
                }}>
                    Create Account
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
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                    borderColor: 'primary.light',
                                },
                            },
                        }}
                    />

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
                                    borderColor: 'primary.light',
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
                                    borderColor: 'primary.light',
                                },
                            },
                        }}
                    />

                    <TextField
                        fullWidth
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                    borderColor: 'primary.light',
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
                            fontWeight: 500
                        }}
                    >
                        Register
                    </Button>
                </Box>

                <Typography variant="body2" align="center" sx={{ mt: 3, color: 'text.secondary' }}>
                    Already have an account?{' '}
                    <Typography
                        component="a"
                        href="/login"
                        sx={{
                            color: 'primary.main',
                            textDecoration: 'none',
                            '&:hover': {
                                textDecoration: 'underline'
                            }
                        }}
                    >
                        Login here
                    </Typography>
                </Typography>
            </Paper>
        </Box>
    );
};

export default RegisterForm;
