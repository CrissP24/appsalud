@echo off
REM Script rápido para generar APK de Inner Compass

echo.
echo ╔════════════════════════════════════════╗
echo ║   Inner Compass - APK Generator        ║
echo ╚════════════════════════════════════════╝
echo.

echo Selecciona una opción:
echo.
echo 1. Generar APK de DESARROLLO (Debug)
echo 2. Generar APK de PRODUCCIÓN (Release)
echo 3. Abrir Android Studio
echo 4. Instalar APK en dispositivo conectado
echo 5. Salir
echo.

set /p choice="Ingresa tu opción (1-5): "

if "%choice%"=="1" (
    echo.
    echo 🔨 Compilando APK de desarrollo...
    call npm run apk:debug
    echo.
    echo ✅ APK de desarrollo completado!
    echo 📁 Ubicación: android\app\build\outputs\apk\debug\app-debug.apk
) else if "%choice%"=="2" (
    echo.
    echo 🔨 Compilando APK de producción...
    call npm run apk:release
    echo.
    echo ✅ APK de producción completado!
    echo 📁 Ubicación: android\app\build\outputs\apk\release\app-release.apk
) else if "%choice%"=="3" (
    echo.
    echo 🚀 Abriendo Android Studio...
    call npm run mobile:open
) else if "%choice%"=="4" (
    echo.
    echo 📱 Instalando APK en dispositivo...
    if exist "android\app\build\outputs\apk\debug\app-debug.apk" (
        adb install -r android\app\build\outputs\apk\debug\app-debug.apk
        echo ✅ APK instalado correctamente!
    ) else (
        echo ❌ APK no encontrado. Primero genera el APK con la opción 1
    )
) else if "%choice%"=="5" (
    echo Saliendo...
    exit /b 0
) else (
    echo ❌ Opción inválida
)

pause
