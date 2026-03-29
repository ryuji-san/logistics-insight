@echo off
chcp 65001 > nul
echo.
echo ========================================
echo   物流インサイト - 記事を更新中...
echo ========================================
echo.
cd /d "%~dp0"
call npm run fetch
echo.
echo 完了しました。何かキーを押すと閉じます。
pause > nul
