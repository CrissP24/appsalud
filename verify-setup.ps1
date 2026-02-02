#!/usr/bin/env pwsh
# Script de verificación del setup de Capacitor

Write-Host ""
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "    🔍 VERIFICACIÓN DE SETUP - Inner Compass Mobile" -ForegroundColor Cyan
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

$allOk = $true

# 1. Verificar Node.js
Write-Host "1️⃣  Verificando Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($nodeVersion) {
    Write-Host "   ✅ Node.js $nodeVersion instalado" -ForegroundColor Green
} else {
    Write-Host "   ❌ Node.js no encontrado" -ForegroundColor Red
    $allOk = $false
}

# 2. Verificar npm
Write-Host "2️⃣  Verificando npm..." -ForegroundColor Yellow
$npmVersion = npm --version 2>$null
if ($npmVersion) {
    Write-Host "   ✅ npm $npmVersion instalado" -ForegroundColor Green
} else {
    Write-Host "   ❌ npm no encontrado" -ForegroundColor Red
    $allOk = $false
}

# 3. Verificar Java/JDK
Write-Host "3️⃣  Verificando JDK..." -ForegroundColor Yellow
$javaVersion = java -version 2>&1 | Select-String "version"
if ($javaVersion) {
    Write-Host "   ✅ JDK encontrado" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  JDK no encontrado (necesario para compilar Android)" -ForegroundColor Yellow
}

# 4. Verificar dist
Write-Host "4️⃣  Verificando compilación web..." -ForegroundColor Yellow
if (Test-Path "dist") {
    $distSize = (Get-ChildItem -Path "dist" -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
    Write-Host "   ✅ Versión compilada encontrada (~$([math]::Round($distSize, 2))MB)" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  dist/ no encontrado (ejecuta 'npm run build' primero)" -ForegroundColor Yellow
}

# 5. Verificar Capacitor
Write-Host "5️⃣  Verificando Capacitor..." -ForegroundColor Yellow
if (Test-Path "capacitor.config.ts") {
    Write-Host "   ✅ capacitor.config.ts encontrado" -ForegroundColor Green
} else {
    Write-Host "   ❌ Capacitor no configurado" -ForegroundColor Red
    $allOk = $false
}

# 6. Verificar Android
Write-Host "6️⃣  Verificando proyecto Android..." -ForegroundColor Yellow
if (Test-Path "android/app/src/main/AndroidManifest.xml") {
    Write-Host "   ✅ Proyecto Android configurado" -ForegroundColor Green
} else {
    Write-Host "   ❌ Android no configurado correctamente" -ForegroundColor Red
    $allOk = $false
}

# 7. Verificar Gradle
Write-Host "7️⃣  Verificando Gradle..." -ForegroundColor Yellow
if (Test-Path "android/gradlew.bat") {
    Write-Host "   ✅ Gradle wrapper disponible" -ForegroundColor Green
} else {
    Write-Host "   ❌ Gradle wrapper no encontrado" -ForegroundColor Red
    $allOk = $false
}

# 8. Verificar dependencias npm
Write-Host "8️⃣  Verificando dependencias npm..." -ForegroundColor Yellow
if (Test-Path "node_modules/@capacitor/core") {
    Write-Host "   ✅ Capacitor instalado" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  Capacitor no instalado (ejecuta 'npm install')" -ForegroundColor Yellow
}

# Resumen
Write-Host ""
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan

if ($allOk) {
    Write-Host "✅ ¡TODO ESTÁ LISTO PARA GENERAR APK!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Próximo paso: ejecuta" -ForegroundColor Green
    Write-Host "  npm run apk:debug" -ForegroundColor Cyan
} else {
    Write-Host "⚠️  Se encontraron algunos problemas" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Soluciona los errores marcados con ❌ antes de continuar" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Para más información, lee:" -ForegroundColor Cyan
Write-Host "  📄 APK-QUICK-START.md" -ForegroundColor Green
Write-Host "  📄 SETUP-COMPLETE.md" -ForegroundColor Green
Write-Host ""
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

Read-Host "Presiona Enter para salir"
