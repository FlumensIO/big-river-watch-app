import { FC, useState } from 'react';
import { observer } from 'mobx-react';
import { Trans as T } from 'react-i18next';
import { useRouteMatch } from 'react-router';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonProgressBar,
  useIonRouter,
  useIonViewWillEnter,
} from '@ionic/react';
import { questionRoutes } from '../../router';
import BackButton from './BackButton';
import './styles.scss';

type Props = {
  onCancel?: any;
  rightSlot?: any;
};

const SurveyHeader: FC<Props> = ({ onCancel, rightSlot }) => {
  const match = useRouteMatch();
  const surveyProgressIndex = parseInt(match.url.split('/').pop()!, 10);

  const router = useIonRouter();

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

  return (
    <IonHeader id="survey-header">
      <IonToolbar>
        <IonButtons onClick={onCancel} slot="start">
          <BackButton onCancel={onCancel} backButtonLabel={backButtonLabel} />
        </IonButtons>

        <IonTitle>
          <b>{surveyProgressIndex}</b>{' '}
          <span>
            <T>of</T> {surveyStepCount}
          </span>
        </IonTitle>

        <IonProgressBar color="secondary" value={index / surveyStepCount} />

        {rightSlot}
      </IonToolbar>
    </IonHeader>
  );
};

export default observer(SurveyHeader);
