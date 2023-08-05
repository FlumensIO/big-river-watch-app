import { useContext } from 'react';
import { Trans as T } from 'react-i18next';
import { Page, Main } from '@flumens';
import {
  IonButton,
  IonItemGroup,
  IonLabel,
  IonRouterLink,
  NavContext,
} from '@ionic/react';
import appLogo from 'common/images/TheBigRiverWatchLogo.png';
import records from 'models/collections/records';
import Record from 'models/record';
import './styles.scss';

const HomeController = () => {
  const { navigate } = useContext(NavContext);
  const addRandomRecord = () => {
    const record = new Record({
      metadata: {
        saved: true,
      },
      attrs: {
        date: new Date().toISOString(),
        latitude: 51 + Math.random(),
        longitude: 1 + Math.random(),
      },
    });

    record.save();
    records.push(record);

    navigate('/home/records/pending');
  };

  return (
    <Page id="home">
      <Main>
        <img src={appLogo} alt="" className="m-auto mt-4 w-3/4" />

        <IonItemGroup>
          <IonRouterLink
            // routerLink="/survey/new"
            routerDirection="none"
          >
            <IonButton
              className="absolute bottom-20 left-1/2 w-3/4 -translate-x-1/2 -translate-y-1/2 transform rounded-md text-center text-lg font-bold uppercase shadow-2xl"
              color="secondary"
              onClick={addRandomRecord}
            >
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
