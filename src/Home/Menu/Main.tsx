import { observer } from 'mobx-react';
import { informationCircleOutline, heartOutline } from 'ionicons/icons';
import { Main } from '@flumens';
import { IonIcon, IonList, IonItem, IonItemDivider } from '@ionic/react';
import CONFIG from 'common/config';
import flumensLogo from 'common/images/flumens.svg';

const MainComponent = () => {
  return (
    <Main>
      <IonList lines="full">
        <h1 className="my-10 text-center">Menu</h1>

        <IonItemDivider>Info</IonItemDivider>
        <div className="rounded">
          <IonItem routerLink="/info/about" detail>
            <IonIcon
              icon={informationCircleOutline}
              size="small"
              slot="start"
            />
            About
          </IonItem>

          <IonItem routerLink="/info/credits" detail>
            <IonIcon icon={heartOutline} size="small" slot="start" />
            Credits
          </IonItem>
        </div>

        <div className="text-center">
          <a href="https://flumens.io">
            <img className="m-auto block w-1/3" src={flumensLogo} alt="logo" />
          </a>

          <p className="mb-10 pt-4 opacity-50">
            <span>
              App version: v{CONFIG.version} ({CONFIG.build})
            </span>
          </p>
        </div>
      </IonList>
    </Main>
  );
};

export default observer(MainComponent);
