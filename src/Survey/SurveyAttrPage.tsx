import { observer } from 'mobx-react';
import { Page, Main, Attr } from '@flumens';
import Record, { Attrs } from 'models/record';
import Footer from './Components/Footer';
import Header from './Components/Header';
import survey from './config';

type Props = { sample: Record; attr: keyof Attrs };

const SurveyAttrPage = ({ sample: record, attr }: Props) => {
  const attrConf = (survey.attrs as any)[attr].pageProps;

  const validate = () => {
    if (attrConf.attrProps?.inputProps?.min) {
      const length = Array.isArray(record.attrs[attr])
        ? record.attrs[attr].length
        : record.attrs[attr];

      return length >= attrConf.attrProps?.inputProps?.min;
    }

    return (
      attrConf.attrProps.required === false ||
      (Array.isArray(record.attrs[attr])
        ? record.attrs[attr].length
        : !!record.attrs[attr])
    );
  };

  const isComplete = validate();

  const getAttr = (attrProps: any) => (
    <Attr key={attr} model={record} attr={attr} {...attrProps} />
  );

  const attrs = Array.isArray(attrConf.attrProps)
    ? attrConf.attrProps.map(getAttr)
    : [getAttr(attrConf.attrProps)];

  return (
    <Page id={`survey-${attr}`}>
      <Header />

      <Main className="survey">{attrs}</Main>

      {!!isComplete && <Footer comingFrom={attrConf.headerProps.title} />}
    </Page>
  );
};

export default observer(SurveyAttrPage);
