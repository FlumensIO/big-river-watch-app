import { Filesystem, Directory } from '@capacitor/filesystem';
import { isPlatform } from '@ionic/react';

const CONFIG = {
  environment: process.env.NODE_ENV as string,
  version: process.env.APP_VERSION as string,
  build: process.env.APP_BUILD as string,

  sentryDNS: process.env.APP_SENTRY_KEY as string,

  websitePath: 'https://theriverstrust.org',

  map: {
    mapboxApiKey: process.env.APP_MAPBOX_MAP_KEY as string,
  },

  backend: {
    url: `https://${process.env.SUPABASE_PROJECT}.supabase.co`,
    mediaPath: 'storage/v1/object/public/media',
    anonKey: process.env.SUPABASE_ANON_KEY as string,
  },

  dataPath: '',
};

(async function getMediaDirectory() {
  if (isPlatform('hybrid')) {
    const { uri } = await Filesystem.getUri({
      path: '',
      directory: Directory.Data,
    });
    CONFIG.dataPath = uri;
  }
})();

export default CONFIG;
