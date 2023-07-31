const backendUrl = process.env.APP_BACKEND_URL || 'https://TODO:';

const CONFIG = {
  environment: process.env.NODE_ENV as string,
  version: process.env.APP_VERSION as string,
  build: process.env.APP_BUILD as string,

  sentryDNS: process.env.APP_SENTRY_KEY as string,

  backend: {
    url: backendUrl,
  },
};

export default CONFIG;
