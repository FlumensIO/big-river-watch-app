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

  // const recordAttrs = {
  //   record: record.attrs,
  //   isDisabled: record.isDisabled(),
  // };

  // const firstNameAttr = {
  //   id: 'firstName',
  //   type: 'text_input',
  //   title: 'First name',
  //   validations: { required: true },
  // } as const;

  return (
    <Page id="survey-user">
      <Header />

      <Main className="survey">
        <InfoMessage className="m-2 !border-sky-900/40 font-medium ![background:#eef6ff]">
          Take your time to observe the river. This survey should take you 15
          minutes.
        </InfoMessage>

        <InfoMessage>
          <div className="font-medium">Please tell us more about yourself.</div>
        </InfoMessage>

        <IonList className="flex flex-col gap-3">
          <div className="rounded-list">
            <Attr
              attr="firstName"
              input="input"
              model={record}
              inputProps={{
                label: t('First name'),
                labelPlacement: 'floating',
                autocapitalize: 'on',
                ...getValidationProps(nameValidation, record.attrs.firstName),
              }}
            />
          </div>

          <div className="rounded-list">
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

          <div className="rounded-list">
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
