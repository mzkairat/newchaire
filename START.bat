@echo off
title AeronCertified - Server
echo.
echo  ============================================
echo   AeronCertified - Starting Server...
echo  ============================================
echo.
echo  [*] Server will open at: http://localhost:3000
echo.

cd /d "%~dp0"
start "" "http://localhost:3000"
node server.js

pause
