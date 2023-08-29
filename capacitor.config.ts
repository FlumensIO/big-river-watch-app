import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'org.theriverstrust.bigriverwatch',
  appName: 'Big River Watch',
  webDir: 'build',
  server: {
    androidScheme: 'https',
  },
};

export default config;
