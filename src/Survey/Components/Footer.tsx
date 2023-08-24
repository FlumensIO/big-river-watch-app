import { useContext } from 'react';
import { observer } from 'mobx-react';
import clsx from 'clsx';
import { chevronForwardOutline } from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import { useRouteMatch } from 'react-router';
import {
  IonItem,
  IonLabel,
  IonFooter,
  IonIcon,
  NavContext,
} from '@ionic/react';
import { questionRoutes } from '../router';

type Props = {
  className?: string;
  comingFrom?: string;
};

const Footer = ({ comingFrom, className }: Props) => {
  const { navigate } = useContext(NavContext);
  const match = useRouteMatch();
  const route = match.url.split('/');
  const step = parseInt(route.pop()!, 10);

  const surveyStepCount = questionRoutes.length;
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
      className={clsx(
        'ion-no-border absolute bottom-7 left-1/2 w-3/4 -translate-x-1/2',
        className
      )}
      id="survey-footer"
    >
      <div>
        <IonItem
          lines="none"
          className="next-button rounded-md font-bold shadow-lg shadow-secondary-800/30"
          onClick={onClick}
          type="button"
          color="secondary"
        >
          {!isLastStep && (
            <IonIcon slot="end" color="primary" icon={chevronForwardOutline} />
          )}
          <IonLabel className="ion-text-center">
            <T>{footerTitle}</T>
          </IonLabel>
        </IonItem>
      </div>
    </IonFooter>
  );
};

export default observer(Footer);
