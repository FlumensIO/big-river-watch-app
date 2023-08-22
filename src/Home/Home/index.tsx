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
            <IonButton
              className="absolute bottom-20 left-1/2 h-14 w-3/4 -translate-x-1/2 -translate-y-1/2 transform rounded-md text-center text-lg font-bold shadow-2xl [--border-radius:15px]"
              color="primary"
              mode="ios"
            >
              <IonLabel className="p-1">
                <T>Start survey</T>
              </IonLabel>
            </IonButton>
          </IonRouterLink>
        </IonItemGroup>
      </Main>
    </Page>
  );
};

export default HomeController;
