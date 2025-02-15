# Hotel Booking Web Application

A modern and secure hotel booking platform built with React.js, Node.js, and MongoDB. This application allows users to browse hotels, make reservations, and manage their bookings with a secure authentication system.

## Features

- User Authentication (Login/Signup)
- Session Management with Secure Cookies
- Hotel Listing and Search
- Booking Management
- User Profile Management
- Secure Data Handling
- Responsive Design

## Technologies Used

- Frontend: React.js, Material-UI
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT, bcrypt
- State Management: Redux
- Form Handling: Formik with Yup validation

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install frontend dependencies
   cd client
   npm install

   # Install backend dependencies
   cd ../server
   npm install
   ```
3. Set up environment variables:
   - Create `.env` file in the server directory
   - Add necessary environment variables (MongoDB URI, JWT Secret, etc.)

4. Run the application:
   ```bash
   # Run backend server
   cd server
   npm start

   # Run frontend in another terminal
   cd client
   npm start
   ```

The application will be available at `http://localhost:3000`

## Security Features

- HttpOnly Cookies for Session Management
- Input Validation and Sanitization
- CORS Protection
- Password Hashing
- XSS Protection
- CSRF Protection
