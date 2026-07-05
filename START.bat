@echo off
title CreatorAssets - Server Running
color 0A

echo.
echo  ================================================
echo    CreatorAssets - Server Starting...
echo  ================================================
echo.
echo  IMPORTANT: Keep this window OPEN while using the site!
echo  Closing this window will stop the site.
echo.
echo  [*] Site URL   : http://localhost:3000
echo  [*] Admin Panel: http://localhost:3000/admin.html
echo  [*] Password   : admin2024
echo.
echo  Opening browser...
echo.

cd /d "%~dp0"
timeout /t 2 /nobreak >nul
start "" "http://localhost:3000"

node server.js

echo.
echo  Server stopped. Press any key to exit.
pause >nul
