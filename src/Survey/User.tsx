import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Page, InfoMessage, Main, Attr } from '@flumens';
import { IonList } from '@ionic/react';
import Record from 'models/record';
import Footer from './Components/Footer';
import Header from './Components/Header';
import useValidationProps from './Components/useValidationProps';

const emailValidation = Yup.string().email().required();

const nameValidation = Yup.string().required();

export const validation = Yup.object().shape({
  firstName: nameValidation,
  lastName: nameValidation,
  email: emailValidation,
});

type Props = { sample: Record };

const User = ({ sample: record }: Props) => {
  const isComplete = validation.isValidSync(record.attrs);

  const { t } = useTranslation();

  const getValidationProps = useValidationProps();

  return (
    <Page id="survey-user">
      <Header />

      <Main className="survey">
        <InfoMessage className="info-message !border-sky-900/40 font-medium ![--background:#eef6ff]">
          Take your time to observe the river. This survey should take you 15
          minutes.
        </InfoMessage>

        <InfoMessage className="info-message">
          <div className="font-medium">Please tell us more about yourself.</div>
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
                autocapitalize: 'on',
                ...getValidationProps(nameValidation, record.attrs.firstName),
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
                autocapitalize: 'on',
                ...getValidationProps(nameValidation, record.attrs.lastName),
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
                email: true,
                ...getValidationProps(emailValidation, record.attrs.email),
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
