import { observer } from 'mobx-react';
import {
  documentTextOutline,
  globeOutline,
  heartOutline,
  helpBuoyOutline,
  informationCircleOutline,
  lockClosedOutline,
  openOutline,
  shareSocialOutline,
  shieldOutline,
  warningOutline,
} from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import { InfoMessage, Main, Toggle, PickByType } from '@flumens';
import { IonIcon, IonList, IonItem } from '@ionic/react';
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

  const welshPath = language === 'cy' ? '-cymru' : '';

  return (
    <Main>
      <IonList lines="full">
        <h1 className="my-10 text-center">
          <T>Information</T>
        </h1>

        <h3 className="list-title">
          <T>Info</T>
        </h3>
        <div className="rounded-list">
          <IonItem routerLink="/info/about" detail>
            <IonIcon
              icon={informationCircleOutline}
              size="small"
              slot="start"
            />
            <T>About</T>
          </IonItem>
          <IonItem
            href={`${CONFIG.websitePath}/take-action/the-big-river-watch/big-river-watch-partners`}
            detail
            detailIcon={openOutline}
          >
            <IonIcon icon={heartOutline} size="small" slot="start" />
            <T>Partners</T>
          </IonItem>
          <IonItem
            href={`${CONFIG.websitePath}/take-action/the-big-river-watch/big-river-watch-faqs`}
            detail
            detailIcon={openOutline}
          >
            <IonIcon icon={helpBuoyOutline} size="small" slot="start" />
            <T>FAQ</T>
          </IonItem>
          <IonItem routerLink="/info/pollution" detail>
            <IonIcon icon={warningOutline} size="small" slot="start" />
            <T>Report pollution</T>
          </IonItem>
          <IonItem
            href={`${CONFIG.websitePath}/take-action/the-big-river-watch/big-river-watch-health-safety${welshPath}`}
            detail
            detailIcon={openOutline}
          >
            <IonIcon icon={shieldOutline} size="small" slot="start" />
            <T>Health and Safety</T>
          </IonItem>{' '}
          <IonItem
            href={`${CONFIG.websitePath}/take-action/the-big-river-watch/big-river-watch-t-cs${welshPath}`}
            detail
            detailIcon={openOutline}
          >
            <IonIcon icon={documentTextOutline} size="small" slot="start" />
            <T>Terms and Conditions</T>
          </IonItem>
          <IonItem
            href={`${CONFIG.websitePath}/take-action/the-big-river-watch/big-river-watch-privacy-policy${welshPath}`}
            detail
            detailIcon={openOutline}
          >
            <IonIcon icon={lockClosedOutline} size="small" slot="start" />
            <T>Privacy Policy</T>
          </IonItem>
        </div>

        <h3 className="list-title">
          <T>Settings</T>
        </h3>
        <div className="rounded-list">
          <IonItem routerLink="/settings/language" detail>
            <IonIcon icon={globeOutline} size="small" slot="start" />
            <T>Language</T>
            <div slot="end" className="text-black/50">
              {appModel.attrs.language}
            </div>
          </IonItem>

          <Toggle
            label="Share App Analytics"
            prefix={<IonIcon src={shareSocialOutline} className="size-5" />}
            onChange={onSendAnalyticsToggle}
            defaultSelected={sendAnalytics}
          />
          <InfoMessage inline>
            Share app crash data so we can make the app more reliable.
          </InfoMessage>
        </div>

        <div className="mt-10 text-center">
          <a href="https://flumens.io">
            <img className="m-auto block w-1/3" src={flumensLogo} alt="logo" />
          </a>

          <p className="mb-5 pt-2 text-primary-900 opacity-70">
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
