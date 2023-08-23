import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Page, InfoMessage, Main, Attr } from '@flumens';
import { IonList } from '@ionic/react';
import Record from 'models/record';
import Footer from './Components/Footer';
import Header from './Components/Header';

function isValid(attrs: any) {
  try {
    Yup.object()
      .shape({
        firstName: Yup.string().required(),
        lastName: Yup.string().required(),
        email: Yup.string().email().required(),
      })
      .validateSync(attrs, { abortEarly: false });
  } catch (attrError) {
    return false;
  }
  return true;
}

type Props = { sample: Record };

const User = ({ sample: record }: Props) => {
  const isComplete = isValid(record.attrs);

  const { t } = useTranslation();

  return (
    <Page id="survey-user">
      <Header />

      <Main className="survey">
        <InfoMessage className="info-message">
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
