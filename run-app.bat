@echo off
title Vehicle Service Management - Spring Boot Launcher
echo ========================================================
echo Starting Vehicle Service Management (Spring Boot)
echo ========================================================
echo.

set "SCRIPT_DIR=%~dp0"

echo [1/2] Checking MySQL Server status...
sc query MySQL80 | find "RUNNING" >nul
if %ERRORLEVEL% equ 0 (
    echo   - MySQL80 service is RUNNING.
) else (
    echo   - Note: Please ensure MySQL80 service is running.
)

echo.
echo [2/2] Launching Spring Boot Application...
start "Vehicle Service Application" cmd /k "cd /d "%SCRIPT_DIR%backend" && java -jar target\vehicleservice-0.0.1-SNAPSHOT.jar"

timeout /t 4 /nobreak >nul

echo.
echo ========================================================
echo Application is running!
echo URL: http://localhost:8080
echo ========================================================
echo Opening browser...
start http://localhost:8080
echo.
pause
