@echo off
echo Starting Hotel Booking Application Setup...

echo Installing server dependencies...
cd server
call npm install
if %errorlevel% neq 0 (
    echo Error installing server dependencies
    pause
    exit /b %errorlevel%
)

echo Installing client dependencies...
cd ../client
call npm install
if %errorlevel% neq 0 (
    echo Error installing client dependencies
    pause
    exit /b %errorlevel%
)

echo Building React app...
call npm run build
if %errorlevel% neq 0 (
    echo Error building React app
    pause
    exit /b %errorlevel%
)

cd ../server
echo Starting server on port 555...
echo The application will be available at http://localhost:555
start cmd /k "cd server && npm install && node index.js"
timeout /t 5
start cmd /k "cd client && npm install && npm start"
