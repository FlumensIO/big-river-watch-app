import { useContext } from 'react';
import { observer } from 'mobx-react';
import clsx from 'clsx';
import { chevronForwardOutline, flagOutline } from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import { useRouteMatch } from 'react-router';
import {
  IonItem,
  IonLabel,
  IonFooter,
  IonIcon,
  NavContext,
} from '@ionic/react';
import config from '../../config';
import './styles.scss';

type Props = {
  className?: string;
  comingFrom?: string;
};

const Footer = ({ comingFrom, className }: Props) => {
  const { navigate } = useContext(NavContext);
  const match = useRouteMatch();
  const route = match.url.split('/');
  const step = parseInt(route.pop()!, 10);

  const surveyStepCount = config.stepCount;
  const isLastStep = surveyStepCount === step;
  const footerTitle = isLastStep ? 'Finish' : 'Next';

  const onClick = () => {
    if (isLastStep) {
      route.push(`end`);
    } else {
      route.push(`${step + 1}`);
    }

    const navigateTo = route.join('/');

    navigate(navigateTo, 'forward', 'push', undefined, {
      comingFrom,
      unmount: true,
    });
  };

  return (
    <IonFooter
      className={clsx('ion-no-border absolute bottom-0', className)}
      id="survey-footer"
    >
      <div>
        <IonItem
          lines="none"
          className="next-button"
          onClick={onClick}
          mode="md"
        >
          <IonIcon
            slot="end"
            color="secondary"
            icon={isLastStep ? flagOutline : chevronForwardOutline}
          />
          <IonLabel className="ion-text-center">
            <T>{footerTitle}</T>
          </IonLabel>
        </IonItem>
      </div>
    </IonFooter>
  );
};

export default observer(Footer);
