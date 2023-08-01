const CONFIG = {
  environment: process.env.NODE_ENV as string,
  version: process.env.APP_VERSION as string,
  build: process.env.APP_BUILD as string,

  sentryDNS: process.env.APP_SENTRY_KEY as string,

  backend: {
    url: 'https://zroimasbjhsbchprbllu.supabase.co',
    anonKey: process.env.SUPABASE_ANON_KEY as string,
  },
};

export default CONFIG;
