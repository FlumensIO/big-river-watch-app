import { observer } from 'mobx-react';
import { informationCircleOutline, shareSocialOutline } from 'ionicons/icons';
import { InfoMessage, Main, MenuAttrToggle, PickByType } from '@flumens';
import { IonIcon, IonList, IonItem, IonItemDivider } from '@ionic/react';
import CONFIG from 'common/config';
import flumensLogo from 'common/images/flumens.svg';
import appModel, { Attrs } from 'models/app';
import './styles.scss';

type Props = {
  onToggle: (
    setting: keyof PickByType<Attrs, boolean>,
    checked: boolean
  ) => void;
};

const MainComponent = ({ onToggle }: Props) => {
  const { sendAnalytics } = appModel.attrs;

  const onSendAnalyticsToggle = (checked: boolean) =>
    onToggle('sendAnalytics', checked);

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
        </div>

        <IonItemDivider>Settings</IonItemDivider>
        <div className="rounded">
          <MenuAttrToggle
            icon={shareSocialOutline}
            label="Share App Analytics"
            value={sendAnalytics}
            onChange={onSendAnalyticsToggle}
            className="[&>ion-icon]:text-[18px]"
          />
          <InfoMessage color="medium">
            Share app crash data so we can make the app more reliable.
          </InfoMessage>
        </div>

        <div className="text-center">
          <a href="https://flumens.io">
            <img className="m-auto block w-1/3" src={flumensLogo} alt="logo" />
          </a>

          <p className="mb-10 pt-4 text-primary-900 opacity-70">
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
