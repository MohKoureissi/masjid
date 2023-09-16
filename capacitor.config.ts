import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.masjid.app',
  appName: 'Masjid',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
