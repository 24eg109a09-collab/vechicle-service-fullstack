@echo off
title Vehicle Service Management - Live Public Server
echo ========================================================
echo Starting Live Public Vehicle Service Server
echo ========================================================
echo.

set "SCRIPT_DIR=%~dp0"

echo [1/3] Checking MySQL Server...
sc query MySQL80 | find "RUNNING" >nul
if %ERRORLEVEL% equ 0 (
    echo   - MySQL80 service is RUNNING.
) else (
    echo   - Note: Please ensure MySQL80 service is running.
)

echo.
echo [2/3] Launching Spring Boot Backend...
start "Vehicle Service - Spring Boot" cmd /k "cd /d "%SCRIPT_DIR%backend" && java -jar target\vehicleservice-0.0.1-SNAPSHOT.jar"

timeout /t 5 /nobreak >nul

echo.
echo [3/3] Opening Public Live Tunnel via SSH...
echo.
echo ========================================================
echo Look for the 'https://....lhr.life' link below!
echo Share that link with anyone in the world!
echo Only YOU can edit vehicles using Admin PIN: admin123
echo ========================================================
echo.
:TUNNEL_LOOP
echo.
echo Connecting to live public tunnel...
ssh -R 80:localhost:8080 -o StrictHostKeyChecking=no -o ServerAliveInterval=15 -o ServerAliveCountMax=3 nokey@localhost.run
echo.
echo Tunnel disconnected or timed out. Reconnecting in 3 seconds...
timeout /t 3 /nobreak >nul
goto TUNNEL_LOOP
