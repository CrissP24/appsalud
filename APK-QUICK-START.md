# 🚀 GENERAR APK - GUÍA RÁPIDA

Tu aplicación Inner Compass ya está configurada para generar un APK para Android.

## ⚡ Opción Más Rápida

**En PowerShell:**
```powershell
.\build-apk.ps1
```

**En CMD:**
```cmd
build-apk.bat
```

Luego selecciona la opción **1** para generar APK de desarrollo (recomendado para testing).

---

## 📝 Comandos Directos

### Generar APK de Desarrollo (Testing)
```bash
npm run apk:debug
```
✅ Recomendado para probar la app  
📁 Resultado: `android/app/build/outputs/apk/debug/app-debug.apk` (~50MB)

### Generar APK de Producción (Play Store)
```bash
npm run apk:release
```
✅ Para publicar en Play Store  
📁 Resultado: `android/app/build/outputs/apk/release/app-release.apk` (~30MB)

---

## 📱 Instalar en tu Teléfono

### Opción 1: Via Script (Más fácil)
```powershell
.\build-apk.ps1
```
Selecciona opción **4** (Instalar en dispositivo)

### Opción 2: Manual con ADB
Conecta tu teléfono por USB y ejecuta:
```bash
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

### Opción 3: Android Studio
1. Ejecuta: `npm run mobile:open`
2. Conecta tu teléfono
3. Haz click en "Run" ▶️

---

## 🎯 Primeros Pasos

1. **Instala Android Studio** (si no lo tienes):
   - Descarga: https://developer.android.com/studio
   
2. **Conecta tu teléfono Android** por USB
   - Activa "Depuración USB" en Configuración > Opciones de desarrollador

3. **Genera el APK**:
   ```bash
   npm run apk:debug
   ```

4. **Instala en tu teléfono**:
   ```bash
   adb install -r android/app/build/outputs/apk/debug/app-debug.apk
   ```

5. **¡Abre la app!** 🎉

---

## 🆘 Solucionar Problemas

### "command not found: adb"
Instala Android SDK desde Android Studio.

### "No devices found"
- Conecta el teléfono por USB
- Activa "Depuración USB" en el teléfono
- Ejecuta: `adb devices`

### La compilación es muy lenta
Es normal la primera vez (15-20 min). Las siguientes serán más rápidas.

---

## 📚 Información Técnica

| Aspecto | Valor |
|--------|-------|
| **Plataforma** | Android 14+ (API Level 34) |
| **Framework** | React 18 + Capacitor 8 |
| **Empaquetador** | Gradle |
| **Tamaño APK** | ~30-50 MB |
| **Estado** | ✅ Listo para compilar |

---

## 🎁 Tu app incluye:

✅ Interfaz completa responsive  
✅ Navegación móvil optimizada  
✅ Storage local para datos  
✅ Componentes UI modernos  
✅ Tailwind CSS optimizado  
✅ Service Workers (offline mode)  

---

**¡Listo para compartir tu demo móvil!** 📱✨

Para más detalles ver: `MOBILE_BUILD.md`
