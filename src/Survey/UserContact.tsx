import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { Page, InfoMessage, Main, Attr, MenuAttrToggle } from '@flumens';
import { IonList } from '@ionic/react';
import Record from 'models/record';
import Footer from './Components/Footer';
import Header from './Components/Header';

type Props = { sample: Record };

const UserContact = ({ sample: record }: Props) => {
  const isComplete = !record.attrs.allowContact || record.attrs.postcode;
  const { t } = useTranslation();

  const toggleAllowContact = (value: boolean) => {
    // eslint-disable-next-line no-param-reassign
    record.attrs.allowContact = value;
  };

  return (
    <Page id="survey-user-contact">
      <Header />

      <Main>
        <IonList>
          <div className="rounded">
            <MenuAttrToggle
              label="Happy to be contacted"
              value={record.attrs.allowContact}
              onChange={toggleAllowContact}
            />
            <InfoMessage color="medium">
              Are you happy to be contacted by The Rivers Trust and your local
              partner to receive the results from this survey and information
              about future campaigns? Read our full Privacy Notice to find out
              how we use your personal data.
            </InfoMessage>
          </div>
        </IonList>

        {record.attrs.allowContact && (
          <>
            <InfoMessage color="medium">
              Please share with us your postcode so that we can connect you with
              your local trust, so that you can get involved with more local
              events and volunteering
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
