import { Trans as T } from 'react-i18next';
import { Page, Main } from '@flumens';
import { IonItemGroup, IonLabel, IonRouterLink } from '@ionic/react';
import appLogo from 'common/images/TheBigRiverWatchLogo.png';
import './styles.scss';

const HomeController = () => {
  return (
    <Page id="home">
      <Main>
        <img src={appLogo} alt="" className="m-auto mt-14 w-3/4" />

        <IonItemGroup>
          <IonRouterLink routerLink="/survey" routerDirection="none">
            <button className="bg-secondary shadow-secondary-900 absolute bottom-[12vh] left-1/2 h-14 w-2/3 -translate-x-1/2 -translate-y-1/2 transform rounded-xl text-center text-lg font-bold shadow-2xl">
              <IonLabel className="p-1">
                <T>Start survey</T>
              </IonLabel>
            </button>
          </IonRouterLink>
        </IonItemGroup>
      </Main>
    </Page>
  );
};

export default HomeController;
