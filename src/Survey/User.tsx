import { observer } from 'mobx-react';
import { informationCircleOutline } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import { Page, InfoMessage, Main, Attr } from '@flumens';
import { IonList } from '@ionic/react';
import Record from 'models/record';
import Footer from './Components/Footer';
import Header from './Components/Header';

type Props = { sample: Record };

const User = ({ sample: record }: Props) => {
  const isComplete =
    record.attrs.firstName && record.attrs.lastName && record.attrs.email;

  const { t } = useTranslation();

  return (
    <Page id="survey-user">
      <Header />

      <Main className="[--padding-bottom:100px]">
        <InfoMessage icon={informationCircleOutline} className="info-message">
          Please tell us more about yourself.
        </InfoMessage>

        <IonList>
          <div className="rounded">
            <Attr
              attr="firstName"
              input="input"
              model={record}
              inputProps={{
                label: t('First name'),
                labelPlacement: 'floating',
                autofocus: false,
              }}
            />
          </div>

          <div className="rounded">
            <Attr
              attr="lastName"
              input="input"
              model={record}
              inputProps={{
                label: t('Last name'),
                labelPlacement: 'floating',
                autofocus: false,
              }}
            />
          </div>

          <div className="rounded">
            <Attr
              attr="email"
              input="input"
              model={record}
              inputProps={{
                label: t('Email'),
                labelPlacement: 'floating',
                type: 'email',
                autofocus: false,
              }}
            />
          </div>
        </IonList>
      </Main>

      {isComplete && <Footer comingFrom="User" />}
    </Page>
  );
};

export default observer(User);
