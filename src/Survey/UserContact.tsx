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
import useValidationProps from './Components/useValidationProps';

const allowContactValidation = Yup.boolean().required();

const postcodeValidation = Yup.mixed().test(
  'postcode',
  'this must be a valid postcode',
  // eslint-disable-next-line @getify/proper-arrows/name
  (email: any, { parent }: any) =>
    parent?.allowLocalContact === false ? true : isValidPostcode(email || '')
);

export const validation = Yup.object().shape({
  allowContact: allowContactValidation,
  postcode: postcodeValidation,
});

type Props = { sample: Record };

const UserContact = ({ sample: record }: Props) => {
  const { language } = appModel.attrs;

  const { t } = useTranslation();

  const getValidationProps = useValidationProps();

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

  const isComplete = validation.isValidSync({
    allowLocalContact,
    ...record.attrs,
  });

  const formatPostcode = (newValue: string) => {
    const newValueUppercase = newValue?.toUpperCase();
    const normalisedValue = toNormalised(newValueUppercase);
    return normalisedValue || newValueUppercase;
  };

  const isWelsh = language === 'cy';

  return (
    <Page id="survey-user-contact">
      <Header />

      <Main className="survey">
        <InfoMessage className="info-message">
          <div className="font-medium">
            Are you happy to be contacted by The Rivers Trust to receive the
            results from this survey and information about future campaigns?
          </div>
          <div className="mt-2">
            <i>
              Read our full{' '}
              <a
                href={`${
                  config.websitePath
                }/take-action/the-big-river-watch/big-river-watch-privacy-policy${
                  isWelsh ? '-cymru' : ''
                }`}
                className="underline"
              >
                Privacy Notice
              </a>{' '}
              to find out how we use your personal data.
            </i>
          </div>
        </InfoMessage>

        <IonList>
          <div className="rounded">
            <MenuAttrToggle
              label="I am happy to be contacted by The Rivers Trust"
              value={record.attrs.allowContact}
              onChange={toggleAllowContact}
            />
          </div>
        </IonList>

        {record.attrs.allowContact && (
          <>
            <InfoMessage color="medium">
              Are you happy to be contacted by your local Rivers Trust to
              receive the results from this survey and information about future
              campaigns, local events and volunteering? To match you to your
              local Rivers Trust, please share your postcode with us.
            </InfoMessage>

            <IonList>
              <div className="rounded">
                <MenuAttrToggle
                  label="I am happy to be contacted by my local Rivers Trust"
                  value={allowLocalContact}
                  onChange={toggleAllowLocalContact}
                />
              </div>
            </IonList>
          </>
        )}

        {allowLocalContact && (
          <>
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
                    ...getValidationProps(
                      postcodeValidation,
                      record.attrs.postcode
                    ),
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
