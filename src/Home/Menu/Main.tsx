import { observer } from 'mobx-react';
import {
  cloudDownloadOutline,
  cloudUploadOutline,
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
import { InfoMessage, Main, Toggle, PickByType, useAlert } from '@flumens';
import { IonIcon, IonList, IonItem, isPlatform } from '@ionic/react';
import CONFIG from 'common/config';
import flumensLogo from 'common/images/flumens.svg';
import appModel, { Attrs } from 'models/app';

function useDatabaseExportDialog(exportFn: any) {
  const alert = useAlert();

  const showDatabaseExportDialog = () => {
    alert({
      header: 'Export',
      message: (
        <T>
          Are you sure you want to export the data?
          <p className="my-2 font-bold">
            This feature is intended solely for technical support and is not a
            supported method for exporting your data
          </p>
        </T>
      ),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Export',
          handler: exportFn,
        },
      ],
    });
  };

  return showDatabaseExportDialog;
}

type Props = {
  onToggle: (
    setting: keyof PickByType<Attrs, boolean>,
    checked: boolean
  ) => void;
  exportDatabase: any;
  importDatabase: any;
};

const MainComponent = ({ onToggle, exportDatabase, importDatabase }: Props) => {
  const showDatabaseExportDialog = useDatabaseExportDialog(exportDatabase);

  const { sendAnalytics, language } = appModel.data;

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
              {appModel.data.language}
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

          <IonItem onClick={showDatabaseExportDialog}>
            <IonIcon icon={cloudDownloadOutline} size="small" slot="start" />
            <T>Export database</T>
          </IonItem>

          {!isPlatform('hybrid') && (
            <IonItem onClick={importDatabase}>
              <IonIcon icon={cloudUploadOutline} size="small" slot="start" />
              Import database
            </IonItem>
          )}
        </div>

        <div className="mt-10 text-center">
          <a href="https://flumens.io">
            <img className="m-auto block w-1/3" src={flumensLogo} alt="logo" />
          </a>

          <p className="text-primary-900 mb-5 pt-2 opacity-70">
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
