import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Route, Redirect } from 'react-router-dom';
import { App as AppPlugin } from '@capacitor/app';
import {
  IonApp as IonAppPlain,
  IonRouterOutlet,
  useIonRouter,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import 'common/translations/translator';
import appModel from 'models/app';
import LanguageSelectRequired from 'Components/LanguageSelectRequired';
import Onboarding from 'Components/Onboarding';
import Home from './Home';
import Info from './Info/router';
import Settings from './Settings/router';
import Survey from './Survey/router';

const IonApp = IonAppPlain as any; // IonApp has 'lang' prop missing.

const HomeRedirect = () => {
  return <Redirect to="home" />;
};

const App = () => {
  const ionRouter = useIonRouter();

  const exitApp = () => {
    const onExitApp = () => !ionRouter.canGoBack() && AppPlugin.exitApp();

    // eslint-disable-next-line @getify/proper-arrows/name
    document.addEventListener('ionBackButton', (ev: any) =>
      ev.detail.register(-1, onExitApp)
    );

    const removeEventListener = () =>
      document.addEventListener('ionBackButton', onExitApp);
    return removeEventListener;
  };
  useEffect(exitApp, []);

  const { language } = appModel.attrs;

  return (
    <IonApp lang={language as any}>
      <LanguageSelectRequired>
        <Onboarding>
          <IonReactRouter>
            <IonRouterOutlet id="main">
              <Route exact path="/" component={HomeRedirect} />
              <Route path="/home" component={Home} />
              {Info}
              {Settings}
              {Survey}
            </IonRouterOutlet>
          </IonReactRouter>
        </Onboarding>
      </LanguageSelectRequired>
    </IonApp>
  );
};

export default observer(App);
