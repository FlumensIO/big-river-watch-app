import { observer } from 'mobx-react';
import { Page, Main, Attr } from '@flumens';
import Record, { Attrs } from 'models/record';
import Footer from './Components/Footer';
import Header from './Components/Header';
import survey from './config';

type Props = { sample: Record; attr: keyof Attrs };

const SurveyAttrPage = ({ sample: record, attr }: Props) => {
  const attrConf = (survey.attrs as any)[attr].pageProps;

  const isComplete =
    attrConf.attrProps.required === false ||
    (Array.isArray(record.attrs[attr])
      ? record.attrs[attr].length
      : !!record.attrs[attr]);

  return (
    <Page id={`survey-${attr}`}>
      <Header />

      <Main className="survey">
        <Attr model={record} attr={attr} {...attrConf.attrProps} />
      </Main>

      {!!isComplete && <Footer comingFrom={attrConf.headerProps.title} />}
    </Page>
  );
};

export default observer(SurveyAttrPage);
