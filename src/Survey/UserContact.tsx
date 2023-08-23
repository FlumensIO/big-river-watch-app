import { useState } from 'react';
import { observer } from 'mobx-react';
import { toNormalised, isValid as isValidPostcode } from 'postcode';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Page, InfoMessage, Main, Attr, MenuAttrToggle } from '@flumens';
import { IonList } from '@ionic/react';
import config from 'common/config';
import appModel from 'models/app';
import Record from 'models/record';
import Footer from './Components/Footer';
import Header from './Components/Header';

function isValid(attrs: any, allowLocalContact: boolean) {
  try {
    Yup.object()
      .shape({
        allowContact: Yup.boolean().required(),
      })
      .validateSync(attrs, { abortEarly: false });

    if (allowLocalContact)
      Yup.object()
        .shape({
          postcode: Yup.mixed()
            .test('postcode', 'Enter valid postcode.', isValidPostcode)
            .required(),
        })
        .validateSync(attrs, { abortEarly: false });
  } catch (attrError) {
    return false;
  }
  return true;
}

type Props = { sample: Record };

const UserContact = ({ sample: record }: Props) => {
  const { language } = appModel.attrs;

  const { t } = useTranslation();

  const toggleAllowContact = (value: boolean) => {
    // eslint-disable-next-line no-param-reassign
    record.attrs.allowContact = value;
  };

  const [allowLocalContact, setAllowLocalContact] = useState(
    !!record.attrs.postcode
  );
  const toggleAllowLocalContact = (value: boolean) => {
    setAllowLocalContact(value);
    if (!value) record.attrs.postcode = ''; // eslint-disable-line no-param-reassign
  };

  const isComplete = isValid(record.attrs, allowLocalContact);

  const formatPostcode = (newValue: string) => {
    const newValueUppercase = newValue?.toUpperCase();
    const normalisedValue = toNormalised(newValueUppercase);
    return normalisedValue || newValueUppercase;
  };

  return (
    <Page id="survey-user-contact">
      <Header />

      <Main>
        <InfoMessage className="info-message">
          Are you happy to be contacted by The Rivers Trust? Read our full{' '}
          <a
            href={`${config.websitePath}/privacy?lang=${language}`}
            className="underline"
          >
            Privacy Notice
          </a>{' '}
          to find out how we use your personal data.
        </InfoMessage>

        <IonList>
          <div className="rounded">
            <MenuAttrToggle
              label="Happy to be contacted"
              value={record.attrs.allowContact}
              onChange={toggleAllowContact}
            />
          </div>
        </IonList>

        {record.attrs.allowContact && (
          <IonList>
            <div className="rounded">
              <MenuAttrToggle
                label="Connect to my local trust"
                value={allowLocalContact}
                onChange={toggleAllowLocalContact}
              />
            </div>
          </IonList>
        )}

        {allowLocalContact && (
          <>
            <InfoMessage color="medium">
              Please share with us your postcode so that you can get involved
              with more local events and volunteering.
            </InfoMessage>

            <IonList>
              <div className="rounded">
                <Attr
                  attr="postcode"
                  input="input"
                  model={record}
                  inputProps={{
                    label: t('Postcode'),
                    labelPlacement: 'floating',
                    autocapitalize: 'words',
                    autofocus: false,
                    format: formatPostcode,
                  }}
                />
              </div>
            </IonList>
          </>
        )}
      </Main>

      {isComplete && <Footer comingFrom="Contact" />}
    </Page>
  );
};

export default observer(UserContact);
