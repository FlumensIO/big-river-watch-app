import {
  layersOutline,
  readerOutline,
  informationCircleOutline,
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
import dragonflyIcon from 'common/images/dragonfly.svg';
import sewerIcon from 'common/images/sewer.svg';
import records from 'models/collections/records';
import Pollution from './Guides/Pollution';
import Wildlife from './Guides/Wildlife';
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
        <Route path="/home/landing" component={Home} exact />
        <Route path="/home/records/:id?" component={Records} exact />
        <Route path="/home/wildlife" component={Wildlife} exact />
        <Route path="/home/pollution" component={Pollution} exact />
        <Route path="/home/info" component={Menu} exact />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="home/landing" href="/home/landing">
          <IonIcon icon={readerOutline} />
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
          <IonIcon icon={dragonflyIcon} />
          <IonLabel>
            <T>Wildlife</T>
          </IonLabel>
        </IonTabButton>

        <IonTabButton tab="home/pollution" href="/home/pollution">
          <IonIcon icon={sewerIcon} />
          <IonLabel>
            <T>Pollution</T>
          </IonLabel>
        </IonTabButton>

        <IonTabButton tab="info" href="/home/info">
          <IonIcon icon={informationCircleOutline} />
          <IonLabel>
            <T>Info</T>
          </IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default HomeController;
