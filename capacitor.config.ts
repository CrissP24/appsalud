import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.innercompass.app',
  appName: 'Inner Compass',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
      autoHide: true,
      androidSpinnerStyle: 'large',
      showSpinner: true,
    },
  }
};

export default config;
