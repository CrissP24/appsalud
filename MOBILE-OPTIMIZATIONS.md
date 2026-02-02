# 📱 Optimizaciones para Mobile - Inner Compass

Tu aplicación ya tiene las optimizaciones base, aquí hay tips adicionales para mejorar la experiencia móvil.

## 🎯 Optimizaciones Ya Implementadas

✅ **Responsive Design** - Tailwind CSS mobile-first  
✅ **Componentes Ligeros** - shadcn/ui optimizado  
✅ **Rutas Optimizadas** - React Router v6  
✅ **Storage Local** - Persistencia de datos  
✅ **Compilación Optimizada** - Vite bundling  

---

## 🚀 Mejoras Recomendadas

### 1. Agregar Splash Screen Personalizado

Crear `src/components/SplashScreen.tsx`:

```typescript
import { useEffect, useState } from 'react';

export function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-blue-600 to-purple-600 flex items-center justify-center z-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Inner Compass</h1>
        <p className="text-xl text-blue-100">Tu brújula interior</p>
      </div>
    </div>
  );
}
```

### 2. Detectar y Adaptar a Mobile

Archivo `src/hooks/use-is-mobile.ts` ya existe, usalo así:

```typescript
import { useIsMobile } from '@/hooks/use-mobile';

export function MyComponent() {
  const isMobile = useIsMobile();
  
  if (isMobile) {
    // Versión móvil optimizada
    return <MobileLayout />;
  }
  
  return <DesktopLayout />;
}
```

### 3. Notificaciones Push (Opcional)

```bash
npm install @capacitor/push-notifications
npx cap sync android
```

### 4. Geolocalización (Opcional)

```bash
npm install @capacitor/geolocation
npx cap sync android
```

---

## 📊 Monitoreo de Rendimiento

### Medir Performance en Mobile

```typescript
// En tu componente principal
useEffect(() => {
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      console.log('Performance metrics:', list.getEntries());
    });
    observer.observe({ entryTypes: ['navigation', 'paint'] });
  }
}, []);
```

---

## 🔋 Optimizaciones de Batería

### Lazy Loading de Imágenes

```typescript
<img 
  loading="lazy"
  src="imagen.jpg"
  alt="Descripción"
/>
```

### Reducir Frecuencia de Updates

```typescript
import { useMemo } from 'react';

const memoizedData = useMemo(() => {
  return expensiveCalculation();
}, [dependencies]);
```

---

## 🎨 Optimizaciones UI/UX

### 1. Bottom Navigation Fija

Tu `BottomNav.tsx` ya está optimizado para móvil. Asegúrate de:
- Iconos grandes para toques precisos (48x48px mínimo)
- Espaciado suficiente entre elementos
- Usar `safe-area-inset` en bordes

### 2. Touch-Friendly Components

```css
/* En index.css */
@layer base {
  /* Botones con área mínima de toque */
  button {
    @apply min-h-12 min-w-12;
  }
  
  /* Inputs optimizados */
  input {
    @apply text-base; /* Evita zoom auto en iOS */
  }
}
```

### 3. Dark Mode para Móvil

Tu app ya tiene `next-themes`, actívalo:

```typescript
import { ThemeProvider } from 'next-themes';

export function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      {/* Tu contenido */}
    </ThemeProvider>
  );
}
```

---

## 🧪 Testing en Dispositivos Reales

### Requisitos:
- Teléfono Android 10+ 
- Cable USB
- Depuración USB activada

### Pasos:
1. Conecta el teléfono
2. Ejecuta: `adb devices`
3. Ejecuta: `npm run apk:debug`
4. Instala: `adb install -r android/app/build/outputs/apk/debug/app-debug.apk`

---

## 📈 Tamaño del APK

### Reducir Tamaño

```bash
# Ver tamaño actual
du -sh android/app/build/outputs/apk/debug/app-debug.apk

# Habilitar minificación (ya está en release)
npm run apk:release
```

### Análisis de Dependencias

```bash
npm list
npm outdated
```

---

## 🔐 Permisos Necesarios

El archivo `android/app/src/main/AndroidManifest.xml` incluye:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

Si necesitas más permisos (cámara, micrófono, ubicación), agrégalos aquí.

---

## 📝 Checklist Pre-Release

- [ ] Probada en al menos 2 dispositivos
- [ ] Orientación correcta (portrait/landscape)
- [ ] Scrolling suave sin lag
- [ ] Botones accesibles (toques precisos)
- [ ] Imágenes optimizadas
- [ ] No hay warnings en console
- [ ] Storage local funciona
- [ ] Navegación responsive

---

## 🎯 Siguientes Pasos

1. Genera APK: `npm run apk:debug`
2. Prueba en dispositivo real
3. Ajusta UI según feedback
4. Publica versión final: `npm run apk:release`
5. Carga en Play Store

---

**Documentación útil:**
- [Capacitor Best Practices](https://capacitorjs.com/docs/web/best-practices)
- [Android Development](https://developer.android.com/guide)
- [React Performance](https://react.dev/reference/react/memo)

