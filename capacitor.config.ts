import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'org.theriverstrust.bigriverwatch',
  appName: 'big-river-watch',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
