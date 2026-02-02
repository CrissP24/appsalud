#!/usr/bin/env pwsh
# Script de compilación de APK para Inner Compass

Write-Host ""
Write-Host "╔════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   Inner Compass - APK Generator        ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

Write-Host "Selecciona una opción:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Generar APK de DESARROLLO (Debug)" -ForegroundColor Green
Write-Host "2. Generar APK de PRODUCCIÓN (Release)" -ForegroundColor Green
Write-Host "3. Abrir Android Studio" -ForegroundColor Cyan
Write-Host "4. Instalar APK en dispositivo conectado" -ForegroundColor Magenta
Write-Host "5. Sincronizar cambios web" -ForegroundColor Blue
Write-Host "6. Salir" -ForegroundColor Red
Write-Host ""

$choice = Read-Host "Ingresa tu opción (1-6)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "🔨 Compilando APK de desarrollo..." -ForegroundColor Yellow
        npm run apk:debug
        Write-Host ""
        Write-Host "✅ APK de desarrollo completado!" -ForegroundColor Green
        Write-Host "📁 Ubicación: android\app\build\outputs\apk\debug\app-debug.apk" -ForegroundColor Cyan
    }
    "2" {
        Write-Host ""
        Write-Host "🔨 Compilando APK de producción..." -ForegroundColor Yellow
        npm run apk:release
        Write-Host ""
        Write-Host "✅ APK de producción completado!" -ForegroundColor Green
        Write-Host "📁 Ubicación: android\app\build\outputs\apk\release\app-release.apk" -ForegroundColor Cyan
    }
    "3" {
        Write-Host ""
        Write-Host "🚀 Abriendo Android Studio..." -ForegroundColor Yellow
        npm run mobile:open
    }
    "4" {
        Write-Host ""
        Write-Host "📱 Instalando APK en dispositivo..." -ForegroundColor Yellow
        $debugApk = "android\app\build\outputs\apk\debug\app-debug.apk"
        if (Test-Path $debugApk) {
            adb install -r $debugApk
            Write-Host "✅ APK instalado correctamente!" -ForegroundColor Green
        }
        else {
            Write-Host "❌ APK no encontrado. Primero genera el APK con la opción 1" -ForegroundColor Red
        }
    }
    "5" {
        Write-Host ""
        Write-Host "🔄 Sincronizando cambios web..." -ForegroundColor Yellow
        npm run mobile:sync
        Write-Host "✅ Sincronización completada!" -ForegroundColor Green
    }
    "6" {
        Write-Host ""
        Write-Host "Saliendo..." -ForegroundColor Yellow
        exit 0
    }
    default {
        Write-Host ""
        Write-Host "❌ Opción inválida" -ForegroundColor Red
    }
}

Write-Host ""
Read-Host "Presiona Enter para continuar"
