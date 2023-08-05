const CONFIG = {
  environment: process.env.NODE_ENV as string,
  version: process.env.APP_VERSION as string,
  build: process.env.APP_BUILD as string,

  sentryDNS: process.env.APP_SENTRY_KEY as string,

  websitePath: 'https://theriverstrust.org',

  backend: {
    url: 'https://zroimasbjhsbchprbllu.supabase.co',
    mediaPath: 'storage/v1/object/public/media',
    anonKey: process.env.SUPABASE_ANON_KEY as string,
  },
};

export default CONFIG;
