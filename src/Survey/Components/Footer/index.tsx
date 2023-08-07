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
import './styles.scss';

type Props = {
  title?: string;
  className?: string;
  comingFrom?: string;
};

const Footer = ({ title, comingFrom, className }: Props) => {
  const { navigate } = useContext(NavContext);
  const match = useRouteMatch();

  const route = match.url.split('/');
  const step = parseInt(route.pop()!, 10);
  route.push(`${step + 1}`);
  const navigateTo = route.join('/');

  const footerTitle = title || 'Next';

  const onClick = () => {
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
          className={clsx('next-button', title && 'finish-button')}
          onClick={onClick}
          mode="md"
        >
          <IonIcon slot="end" color="light" icon={chevronForwardOutline} />
          <IonLabel className="ion-text-center">
            <T>{footerTitle}</T>
          </IonLabel>
        </IonItem>
      </div>
    </IonFooter>
  );
};

export default observer(Footer);
