@echo off

cd backend
start /B npm run dev

timeout /t 2 >nul

cd ../frontend/my-app
start  npm start