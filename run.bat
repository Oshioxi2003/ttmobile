@echo off
echo Starting Frontend and Backend...
echo.

REM Start Backend in a new window
echo Starting Backend server...
start "Backend Server" cmd /k "cd backend && npm run dev"

REM Wait a moment for backend to start
timeout /t 2 /nobreak >nul

REM Start Frontend in a new window
echo Starting Frontend server...
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo Both servers are starting in separate windows.
echo Close this window or press any key to exit...
pause >nul

