import {
  menuOutline,
  homeOutline,
  bookOutline,
  layersOutline,
} from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import { Route, Redirect } from 'react-router-dom';
import {
  IonTabs,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonTabBar,
  IonRouterOutlet,
} from '@ionic/react';
import records from 'models/collections/records';
import Home from './Home';
import Menu from './Menu';
import PendingSurveysBadge from './PendingSurveysBadge';
import Records from './Records';
import './styles.scss';

const HomeController = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/home" to="/home/landing" />
        <Route path="/home/records/:id?" component={Records} exact />
        <Route path="/home/landing" component={Home} exact />
        <Route path="/home/menu" component={Menu} exact />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="home/landing" href="/home/landing">
          <IonIcon icon={homeOutline} />
          <IonLabel>
            <T>Home</T>
          </IonLabel>
        </IonTabButton>

        <IonTabButton tab="/home/records" href="/home/records">
          <IonIcon icon={layersOutline} />
          <IonLabel>
            <T>Surveys</T>
          </IonLabel>
          <PendingSurveysBadge collection={records} />
        </IonTabButton>

        <IonTabButton tab="home/wildlife" href="/home/wildlife">
          <IonIcon icon={bookOutline} />
          <IonLabel>
            <T>Wildlife</T>
          </IonLabel>
        </IonTabButton>

        <IonTabButton tab="home/pollution" href="/home/pollution">
          <IonIcon icon={bookOutline} />
          <IonLabel>
            <T>Pollution</T>
          </IonLabel>
        </IonTabButton>

        <IonTabButton tab="menu" href="/home/menu">
          <IonIcon icon={menuOutline} />
          <IonLabel>
            <T>Menu</T>
          </IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default HomeController;
