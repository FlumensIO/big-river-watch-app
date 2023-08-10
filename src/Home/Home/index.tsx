import { Trans as T } from 'react-i18next';
import { Page, Main } from '@flumens';
import { IonButton, IonItemGroup, IonLabel, IonRouterLink } from '@ionic/react';
import appLogo from 'common/images/TheBigRiverWatchLogo.png';
import './styles.scss';

const HomeController = () => {
  return (
    <Page id="home">
      <Main>
        <img src={appLogo} alt="" className="m-auto mt-16 w-3/4" />

        <IonItemGroup>
          <IonRouterLink routerLink="/survey" routerDirection="none">
            <IonButton className="survey-button" color="secondary">
              <IonLabel>
                <T>Start Survey</T>
              </IonLabel>
            </IonButton>
          </IonRouterLink>
        </IonItemGroup>
      </Main>
    </Page>
  );
};

export default HomeController;
