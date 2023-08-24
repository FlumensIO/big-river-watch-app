import { observer } from 'mobx-react';
import {
  documentTextOutline,
  heartOutline,
  informationCircleOutline,
  lockClosedOutline,
  openOutline,
  shareSocialOutline,
  shieldOutline,
} from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import { InfoMessage, Main, MenuAttrToggle, PickByType } from '@flumens';
import { IonIcon, IonList, IonItem, IonItemDivider } from '@ionic/react';
import CONFIG from 'common/config';
import flumensLogo from 'common/images/flumens.svg';
import appModel, { Attrs } from 'models/app';

type Props = {
  onToggle: (
    setting: keyof PickByType<Attrs, boolean>,
    checked: boolean
  ) => void;
};

const MainComponent = ({ onToggle }: Props) => {
  const { sendAnalytics, language } = appModel.attrs;

  const onSendAnalyticsToggle = (checked: boolean) =>
    onToggle('sendAnalytics', checked);

  return (
    <Main>
      <IonList lines="full">
        <h1 className="my-10 text-center">Info</h1>

        <IonItemDivider>Info</IonItemDivider>
        <div className="rounded">
          <IonItem routerLink="/info/about" detail>
            <IonIcon
              icon={informationCircleOutline}
              size="small"
              slot="start"
            />
            <T>About</T>
          </IonItem>
          <IonItem
            href={`${CONFIG.websitePath}/take-action/the-big-river-watch/big-river-watch-partners?lang=${language}`}
            detail
            detailIcon={openOutline}
          >
            <IonIcon icon={heartOutline} size="small" slot="start" />
            <T>Partners</T>
          </IonItem>{' '}
          <IonItem
            href={`${CONFIG.websitePath}/take-action/the-big-river-watch/health-and-safety-brw?lang=${language}`}
            detail
            detailIcon={openOutline}
          >
            <IonIcon icon={shieldOutline} size="small" slot="start" />
            <T>Health and Safety</T>
          </IonItem>{' '}
          <IonItem
            href={`${CONFIG.websitePath}/take-action/the-big-river-watch/big-river-watch-t-cs?lang=${language}`}
            detail
            detailIcon={openOutline}
          >
            <IonIcon icon={documentTextOutline} size="small" slot="start" />
            <T>Terms and Conditions</T>
          </IonItem>
          <IonItem
            href={`${CONFIG.websitePath}/privacy?lang=${language}`}
            detail
            detailIcon={openOutline}
          >
            <IonIcon icon={lockClosedOutline} size="small" slot="start" />
            <T>Privacy Policy</T>
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
              <T>App version</T>: v{CONFIG.version} ({CONFIG.build})
            </span>
          </p>
        </div>
      </IonList>
    </Main>
  );
};

export default observer(MainComponent);
