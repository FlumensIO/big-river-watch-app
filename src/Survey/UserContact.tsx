import { useState } from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { Page, InfoMessage, Main, Attr, Toggle } from '@flumens';
import { IonList } from '@ionic/react';
import config from 'common/config';
import appModel from 'models/app';
import Record from 'models/record';
import Footer from './Components/Footer';
import Header from './Components/Header';
import useValidationProps from './Components/useValidationProps';

const allowContactValidation = z.boolean();

const postcodeValidation = z.string().superRefine((postcode, ctx) => {
  // validate postcode only if allowLocalContact is true
  const allowLocalContact = ctx.path.length > 0;

  if (allowLocalContact && !postcode) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'this must be a valid postcode',
    });
  }
});

export const validation = z
  .object({
    allowContact: allowContactValidation,
    postcode: z.string().optional(),
    allowLocalContact: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    // validate postcode when allowLocalContact is true
    if (data.allowLocalContact && !data.postcode) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'this must be a valid postcode',
        path: ['postcode'],
      });
    }
  });

type Props = { sample: Record };

const UserContact = ({ sample: record }: Props) => {
  const { language } = appModel.data;

  const { t } = useTranslation();

  const getValidationProps = useValidationProps();

  const toggleAllowContact = (value: boolean) => {
    // eslint-disable-next-line no-param-reassign
    record.data.allowContact = value;
  };

  const [allowLocalContact, setAllowLocalContact] = useState(
    !!record.data.postcode
  );
  const toggleAllowLocalContact = (value: boolean) => {
    setAllowLocalContact(value);
    if (!value) record.data.postcode = ''; // eslint-disable-line no-param-reassign
  };

  const isComplete = validation.safeParse({
    allowLocalContact,
    ...record.data,
  }).success;

  const formatPostcode = (newValue: string) => {
    const newValueUppercase = newValue?.toUpperCase();
    return newValueUppercase;
    // const normalisedValue = toNormalised(newValueUppercase);
    // return normalisedValue || newValueUppercase;
  };

  const isWelsh = language === 'cy';

  const formatPostcodeWrap = (val: any) => {
    // eslint-disable-next-line no-param-reassign
    record.data.postcode = formatPostcode(val);
  };

  return (
    <Page id="survey-user-contact">
      <Header />

      <Main className="survey">
        <InfoMessage>
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
          <div className="rounded-list">
            <Toggle
              label="I am happy to be contacted by The Rivers Trust"
              defaultSelected={record.data.allowContact}
              onChange={toggleAllowContact}
            />
          </div>
        </IonList>

        {record.data.allowContact && (
          <>
            <InfoMessage>
              Are you happy to be contacted by your local Rivers Trust to
              receive the results from this survey and information about future
              campaigns, local events and volunteering? To match you to your
              local Rivers Trust, please share your postcode with us.
            </InfoMessage>

            <IonList>
              <div className="rounded-list">
                <Toggle
                  label="I am happy to be contacted by my local Rivers Trust"
                  defaultSelected={allowLocalContact}
                  onChange={toggleAllowLocalContact}
                />
              </div>
            </IonList>
          </>
        )}

        {allowLocalContact && (
          <>
            <IonList>
              <div className="rounded-list">
                <Attr
                  attr="postcode"
                  input="input"
                  model={record}
                  set={formatPostcodeWrap}
                  inputProps={{
                    label: t('Postcode'),
                    labelPlacement: 'floating',
                    autocapitalize: 'words',
                    autofocus: false,
                    ...getValidationProps(
                      postcodeValidation,
                      record.data.postcode
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
