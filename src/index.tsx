import { configure as mobxConfig } from 'mobx';
import i18n from 'i18next';
import { createRoot } from 'react-dom/client';
import { initReactI18next } from 'react-i18next';
import { App as AppPlugin } from '@capacitor/app';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style as StatusBarStyle } from '@capacitor/status-bar';
import { setupIonicReact, isPlatform } from '@ionic/react';
import * as SentryBrowser from '@sentry/browser';
import config from 'common/config';
import { sentryOptions } from 'common/flumens';
import appModel from 'models/app';
import records from 'models/collections/records';
import App from './App';

console.log('🚩 App starting.'); // eslint-disable-line

i18n.use(initReactI18next).init({ lng: 'en' });

mobxConfig({ enforceActions: 'never' });

setupIonicReact();

async function init() {
  await appModel.ready;
  await records.ready;

  appModel.attrs.sendAnalytics &&
    SentryBrowser.init({
      ...sentryOptions,
      dsn: config.sentryDNS,
      environment: config.environment,
      release: config.version,
      dist: config.build,
      initialScope: {
        tags: { session: appModel.attrs.appSession },
      },
    });

  appModel.attrs.appSession += 1;
  appModel.save();

  const container = document.getElementById('root');
  const root = createRoot(container!);
  root.render(<App />);

  if (isPlatform('hybrid')) {
    StatusBar.setStyle({
      style: StatusBarStyle.Dark,
    });

    SplashScreen.hide();

    AppPlugin.addListener('backButton', () => {
      /* disable android app exit using back button */
    });
  }
}

init();
