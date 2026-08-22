@echo off
cd /d "%~dp0"
title DuoGym local server
if not exist "dist\server\index.js" (
  echo Pripravuji DuoGym...
  call npm run build
  if errorlevel 1 (
    echo Aplikaci se nepodarilo pripravit.
    pause
    exit /b 1
  )
)
echo.
echo DuoGym bezi na portu 3000. Toto okno nezavirejte.
echo Na tabletu otevrite: http://IP-ADRESA-TOHOTO-PC:3000
echo.
call npm run start -- --host 0.0.0.0 --port 3000
