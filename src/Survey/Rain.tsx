import { observer } from 'mobx-react';
import { Page, InfoMessage, Main, Attr } from '@flumens';
import Record from 'models/record';
import Footer from './Components/Footer';
import Header from './Components/Header';
import survey from './config';

type Props = { sample: Record };

const Rain = ({ sample: record }: Props) => {
  const isComplete = !!record.attrs.rain;

  return (
    <Page id="survey-rain">
      <Header />

      <Main className="survey">
        <InfoMessage className="info-message">
          Has it rained in the last 24 hours?
        </InfoMessage>

        <Attr model={record} {...survey.attrs.rain.pageProps.attrProps} />
      </Main>

      {isComplete && <Footer comingFrom="Rain" />}
    </Page>
  );
};

export default observer(Rain);
