# 🔧 INSTALAR ANDROID STUDIO

Si obtuviste el mensaje **"JDK no encontrado"** en la verificación, necesitas instalar Android Studio.

## ⚡ Instalación Rápida (10 minutos)

### 1. Descargar Android Studio
👉 [Descargar Android Studio](https://developer.android.com/studio)

### 2. Ejecutar el instalador
- Haz doble click en `android-studio-xxxx-windows.exe`
- Sigue el wizard de instalación
- Selecciona "Standard Installation"

### 3. Configuración Inicial
Cuando se abre por primera vez:
- ✅ Descargará automáticamente el SDK
- ✅ Instalará JDK 17
- ✅ Configurará Gradle

### 4. Instalar Android SDK API 34
- Abre Android Studio
- Menú: `Tools` > `SDK Manager`
- En la pestaña "SDK Platforms":
  - Marca "Android 14" (API Level 34)
  - Haz click en "Apply"
  - Espera a que descargue (~1 GB)

### 5. Verificar Instalación
```bash
# En PowerShell
cd "c:\Users\home\Desktop\inner-compass-main"
.\verify-setup.ps1
```

Si ahora dice ✅ JDK, ¡estás listo!

---

## 📝 Variables de Entorno (Si Es Necesario)

Si aún así falla, agrega manualmente:

1. **Presiona `Win + X`** → Selecciona "Terminal (Administrador)"

2. **Ejecuta estos comandos:**

```powershell
# Encontrar dónde está Android Studio
$androidPath = "C:\Users\$env:USERNAME\AppData\Local\Android\Sdk"

# Agregar ANDROID_HOME
[Environment]::SetEnvironmentVariable("ANDROID_HOME", $androidPath, "User")
[Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\Program Files\Android\Android Studio\jbr", "User")

# Verificar
$env:ANDROID_HOME
$env:JAVA_HOME
```

3. **Reinicia PowerShell** y prueba nuevamente

---

## ✅ Checklist de Instalación

- [ ] Android Studio descargado e instalado
- [ ] JDK 17 instalado
- [ ] Android SDK instalado
- [ ] API Level 34 descargado
- [ ] `verify-setup.ps1` muestra ✅ en todo

---

## 🎯 Una Vez Instalado

```bash
# En tu terminal
npm run apk:debug

# Esto generará tu primer APK en:
# android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 🆘 Problemas Comunes

### "Gradle daemon exited unexpectedly"
```bash
cd android
./gradlew clean
./gradlew assembleDebug
```

### "Failed to compile aapt2"
Actualiza Android SDK Tools:
- Android Studio > Tools > SDK Manager
- Updates tab > Instala todo lo disponible

### "No tienes espacio en disco"
Android Studio + SDK necesitan ~10 GB

---

**Documentación Oficial:**
- https://developer.android.com/studio/install
- https://capacitorjs.com/docs/android

Después de instalar Android Studio, vuelve a ejecutar:
```bash
npm run apk:debug
```

🎉
