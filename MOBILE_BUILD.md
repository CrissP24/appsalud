# 📱 Guía de Compilación para APK

Este documento explica cómo compilar y generar el APK de Inner Compass para Android.

## 📋 Requisitos Previos

1. **Android Studio** instalado
   - Descarga desde: https://developer.android.com/studio
   
2. **JDK 17+** instalado
   - Se configura automáticamente con Android Studio

3. **Android SDK** instalado
   - Se configura automáticamente con Android Studio
   - Asegúrate de tener el SDK API Level 34 (Android 14)

4. **Node.js** instalado (ya lo tienes)

## 🚀 Pasos para Generar el APK

### 1. Compilar la Versión de Desarrollo (Debug APK)

Este APK es útil para testing y desarrollo:

```bash
npm run apk:debug
```

El APK se generará en: `android/app/build/outputs/apk/debug/app-debug.apk`

### 2. Compilar la Versión de Producción (Release APK)

Para una versión lista para publicar:

```bash
npm run apk:release
```

El APK se generará en: `android/app/build/outputs/apk/release/app-release.apk`

> **Nota:** La primera compilación puede tomar 10-15 minutos mientras descarga dependencias.

## 📝 Comandos Disponibles

| Comando | Descripción |
|---------|------------|
| `npm run mobile:sync` | Sincroniza cambios web con el proyecto Android |
| `npm run mobile:build` | Compila el web y sincroniza con Android |
| `npm run mobile:open` | Abre Android Studio con el proyecto |
| `npm run apk:debug` | Genera APK de desarrollo |
| `npm run apk:release` | Genera APK de producción |

## 📱 Instalar en un Dispositivo

### Via USB (Debug APK):
```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### Via Android Studio:
1. Conecta tu dispositivo Android
2. Ejecuta: `npm run mobile:open`
3. Haz click en "Run" > "Run 'app'"

## 🔐 Firmar el APK (Release)

Para publicar en Play Store necesitas firmar el APK:

1. **Generar Keystore** (solo la primera vez):
```bash
keytool -genkey -v -keystore my-release-key.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias
```

2. **Configurar Gradle** en `android/app/build.gradle`:
```gradle
signingConfigs {
    release {
        storeFile file('../../my-release-key.keystore')
        storePassword 'tu_password'
        keyAlias 'my-key-alias'
        keyPassword 'tu_key_password'
    }
}

buildTypes {
    release {
        signingConfig signingConfigs.release
    }
}
```

3. **Generar APK Firmado**:
```bash
npm run apk:release
```

## 🧪 Testing en Emulador

### Crear Emulador:
1. Abre Android Studio
2. Herramientas > Device Manager
3. Crea un nuevo dispositivo virtual

### Ejecutar en Emulador:
```bash
npm run mobile:open
```
Luego selecciona el emulador en Android Studio y presiona "Run"

## 📊 Solucionar Problemas

### Error: "Gradle not found"
```bash
cd android
./gradlew clean build
```

### Error: "SDK not found"
1. Abre Android Studio
2. Tools > SDK Manager
3. Instala API Level 34

### Cambios no aparecen en APK
```bash
npm run mobile:build
npm run apk:debug
```

## 🎯 Optimizaciones para Mobile

Tu app ya incluye:
- ✅ Tailwind CSS optimizado
- ✅ Componentes responsive
- ✅ Capacitor plugins pre-configurados
- ✅ Service Workers para offline

## 📚 Recursos Útiles

- [Capacitor Docs](https://capacitorjs.com/docs)
- [Android Developers](https://developer.android.com/)
- [React + Capacitor Guide](https://capacitorjs.com/docs/getting-started/with-your-app)

## 💾 Archivo APK

Después de compilar:
- **Debug**: `android/app/build/outputs/apk/debug/app-debug.apk` (~50MB)
- **Release**: `android/app/build/outputs/apk/release/app-release.apk` (~30MB)

---

¡Listo para compartir tu demo móvil! 🎉
