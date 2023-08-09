import { observer } from 'mobx-react';
import { informationCircleOutline } from 'ionicons/icons';
import { Page, InfoMessage, Main, Attr } from '@flumens';
import Record from 'models/record';
import Footer from './Components/Footer';
import Header from './Components/Header';
import survey from './config';

type Props = { sample: Record };

const Rain = ({ sample: record }: Props) => {
  const isComplete = !!record.attrs.surveyors;

  return (
    <Page id="survey-rain">
      <Header />

      <Main>
        <InfoMessage icon={informationCircleOutline} className="info-message">
          How many of you have taken part in this survey today?
        </InfoMessage>

        <Attr model={record} {...survey.attrs.surveyors.pageProps.attrProps} />
      </Main>

      {isComplete && <Footer comingFrom="Rain" />}
    </Page>
  );
};

export default observer(Rain);
