import { useContext, useState } from 'react';
import { observer } from 'mobx-react';
import { closeOutline } from 'ionicons/icons';
import { Trans as T, useTranslation } from 'react-i18next';
import { useRouteMatch } from 'react-router';
import { useAlert } from '@flumens';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonProgressBar,
  useIonRouter,
  useIonViewWillEnter,
  IonBackButton,
  IonButton,
  IonIcon,
  NavContext,
} from '@ionic/react';
import records from 'models/collections/records';
import Record from 'models/record';
import { questionRoutes } from '../../router';
import './styles.scss';

const useCancelPrompt = () => {
  const alert = useAlert();

  const showCancelPropt = () => {
    const promiseWrap = (resolve: (value: unknown) => void): void => {
      alert({
        header: 'Exit',
        message:
          'Do you want to close and save the survey for later or discard it?',
        buttons: [
          {
            text: 'Discard',
            role: 'destructive',
            handler: () => resolve(true),
          },
          {
            text: 'Close',
            role: 'cancel',
            handler: () => resolve(false),
          },
        ],
      });
    };
    return new Promise(promiseWrap);
  };

  return showCancelPropt;
};

const SurveyHeader = () => {
  const match = useRouteMatch<{ smpId: string }>();

  const byId = (record: Record) => record.cid === match.params.smpId;
  const record = records.find(byId);

  const surveyProgressIndex = parseInt(match.url.split('/').pop()!, 10);

  const { navigate } = useContext(NavContext);

  const router = useIonRouter();

  const { t } = useTranslation();
  const showCancelPropt = useCancelPrompt();

  const backButtonLabel = router.routeInfo.routeOptions?.comingFrom || 'Back';

  const surveyStepCount = questionRoutes.length;

  const lastIndex = parseInt(
    router.routeInfo.lastPathname?.split('/').pop() || '',
    10
  );
  const [index, setIndex] = useState(
    Number.isFinite(lastIndex) ? lastIndex : surveyProgressIndex - 1
  );
  const updateIndex = () => setIndex(surveyProgressIndex);
  useIonViewWillEnter(updateIndex);

  const onCancel = async () => {
    const discard = await showCancelPropt();
    if (discard) {
      record.destroy();
    }

    navigate('/home/landing', 'root');
  };

  return (
    <IonHeader id="survey-header">
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton
            text={t(backButtonLabel)}
            defaultHref="/home/landing"
          />
        </IonButtons>

        <IonTitle>
          <b>{surveyProgressIndex}</b>{' '}
          <span>
            <T>of</T> {surveyStepCount}
          </span>
        </IonTitle>

        <IonButtons slot="end">
          <IonButton onClick={onCancel}>
            <IonIcon icon={closeOutline} slot="icon-only" />
          </IonButton>
        </IonButtons>

        <IonProgressBar color="secondary" value={index / surveyStepCount} />
      </IonToolbar>
    </IonHeader>
  );
};

export default observer(SurveyHeader);
