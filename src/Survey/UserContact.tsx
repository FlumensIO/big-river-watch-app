import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Page, InfoMessage, Main, Attr, MenuAttrToggle } from '@flumens';
import { IonList } from '@ionic/react';
import config from 'common/config';
import appModel from 'models/app';
import Record from 'models/record';
import Footer from './Components/Footer';
import Header from './Components/Header';

function isValid(attrs: any) {
  try {
    Yup.object()
      .shape({
        allowContact: Yup.boolean().required(),
        postcode: Yup.string().when('allowContact', {
          is: true,
          then: (schema: any) =>
            schema
              .matches(
                // https://gist.github.com/simonwhitaker/5748487
                /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) {0,1}[0-9][A-Za-z]{2})$/,
                'Valid postcode'
              )
              .required(),
        }),
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

  const isComplete = isValid(record.attrs);
  const { t } = useTranslation();

  const toggleAllowContact = (value: boolean) => {
    // eslint-disable-next-line no-param-reassign
    record.attrs.allowContact = value;
  };

  return (
    <Page id="survey-user-contact">
      <Header />

      <Main>
        <InfoMessage className="info-message">
          Are you happy to be contacted by The Rivers Trust and your local
          partner to receive the results from this survey and information about
          future campaigns? Read our full{' '}
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
          <>
            <InfoMessage color="medium">
              Please share with us your postcode so that we can connect you with
              your local trust, so that you can get involved with more local
              events and volunteering.
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
