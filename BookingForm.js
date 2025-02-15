import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const BookingForm = ({ hotel }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [booking, setBooking] = useState({
        checkIn: new Date(),
        checkOut: new Date(new Date().setDate(new Date().getDate() + 1)),
        guests: 1,
        roomType: 'standard'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBooking(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDateChange = (date, field) => {
        setBooking(prev => ({
            ...prev,
            [field]: date
        }));
    };

    const validateBooking = () => {
        if (booking.checkIn >= booking.checkOut) {
            setError('Check-out date must be after check-in date');
            return false;
        }
        if (booking.guests < 1) {
            setError('Number of guests must be at least 1');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }

        if (!validateBooking()) {
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch(`/api/hotels/${hotel.id}/book`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    ...booking,
                    hotelId: hotel.id
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Booking failed');
            }

            navigate('/bookings');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
            <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-400 p-4">
                            <p className="text-red-700">{error}</p>
                        </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Check-in</label>
                            <DatePicker
                                selected={booking.checkIn}
                                onChange={(date) => handleDateChange(date, 'checkIn')}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                minDate={new Date()}
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Check-out</label>
                            <DatePicker
                                selected={booking.checkOut}
                                onChange={(date) => handleDateChange(date, 'checkOut')}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                minDate={booking.checkIn}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Number of Guests
                        </label>
                        <input
                            type="number"
                            name="guests"
                            value={booking.guests}
                            onChange={handleChange}
                            min="1"
                            max="10"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Room Type
                        </label>
                        <select
                            name="roomType"
                            value={booking.roomType}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            <option value="standard">Standard Room</option>
                            <option value="deluxe">Deluxe Room</option>
                            <option value="suite">Suite</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Processing...' : 'Book Now'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookingForm;
