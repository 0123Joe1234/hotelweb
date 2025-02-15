import React from 'react';
import { useParams } from 'react-router-dom';
import BookingForm from './BookingForm';

const HotelDetails = () => {
    const [hotel, setHotel] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState('');
    const { id } = useParams();

    React.useEffect(() => {
        const fetchHotel = async () => {
            try {
                const response = await fetch(`/api/hotels/${id}`);
                if (!response.ok) {
                    throw new Error('Hotel not found');
                }
                const data = await response.json();
                setHotel(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHotel();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <p className="text-red-700">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h1 className="text-3xl font-bold text-gray-900">{hotel.name}</h1>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">{hotel.location}</p>
                </div>
                
                <div className="border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
                        <div>
                            <div className="aspect-w-16 aspect-h-9 mb-6">
                                <img
                                    src={hotel.image}
                                    alt={hotel.name}
                                    className="object-cover rounded-lg shadow-lg"
                                />
                            </div>
                            
                            <div className="prose max-w-none">
                                <h3 className="text-xl font-semibold mb-2">Description</h3>
                                <p>{hotel.description}</p>
                                
                                <h3 className="text-xl font-semibold mt-4 mb-2">Amenities</h3>
                                <ul className="grid grid-cols-2 gap-4">
                                    {hotel.amenities.map((amenity, index) => (
                                        <li key={index} className="flex items-center">
                                            <svg className="h-5 w-5 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            {amenity}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-6">
                                <h3 className="text-xl font-semibold mb-2">Location</h3>
                                <div className="bg-gray-100 p-4 rounded-lg">
                                    <p>{hotel.address}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="bg-gray-50 p-6 rounded-lg shadow mb-6">
                                <div className="flex items-baseline">
                                    <span className="text-3xl font-semibold text-gray-900">${hotel.price}</span>
                                    <span className="text-gray-500 ml-2">per night</span>
                                </div>
                                
                                <div className="mt-4">
                                    <div className="flex items-center">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className={`h-5 w-5 ${i < hotel.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="text-gray-500 ml-2">({hotel.reviews} reviews)</span>
                                    </div>
                                </div>
                            </div>

                            <BookingForm hotel={hotel} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelDetails;
