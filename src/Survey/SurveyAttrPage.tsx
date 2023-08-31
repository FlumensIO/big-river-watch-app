import { observer } from 'mobx-react';
import { Page, Main, Attr } from '@flumens';
import Record, { Attrs } from 'models/record';
import Footer from './Components/Footer';
import Header from './Components/Header';
import useValidationProps from './Components/useValidationProps';
import survey from './config';
import { useNavigateNext } from './router';

type Props = { sample: Record; attr: keyof Attrs };

const SurveyAttrPage = ({ sample: record, attr }: Props) => {
  const attrConf = (survey.attrs as any)[attr].pageProps;

  const comingFrom = attrConf.headerProps.title;
  const navigateNext = useNavigateNext(comingFrom);

  const validate = () => {
    if (attrConf.attrProps?.inputProps?.min) {
      const length = Array.isArray(record.attrs[attr])
        ? record.attrs[attr].length
        : record.attrs[attr];

      return length >= attrConf.attrProps?.inputProps?.min;
    }

    if (attrConf.attrProps.validation) {
      return attrConf.attrProps.validation.isValidSync(record.attrs[attr]);
    }

    return (
      attrConf.attrProps.required === false ||
      (Array.isArray(record.attrs[attr])
        ? record.attrs[attr].length
        : !!record.attrs[attr])
    );
  };

  const isComplete = validate();

  const onChange = (a: any, exit: any) => {
    if (exit && validate()) navigateNext();
  };

  const getValidationProps = useValidationProps();

  const getAttr = (attrProps: any) => {
    let inputProps = { ...attrProps.inputProps };
    if (attrProps.validation) {
      inputProps = {
        ...inputProps,
        ...getValidationProps(attrProps.validation, record.attrs[attr]),
      };
    }

    return (
      <Attr
        key={attr}
        model={record}
        attr={attr}
        onChange={onChange}
        {...attrProps}
        inputProps={inputProps}
      />
    );
  };

  const { attrProps } = attrConf;
  const attrs = Array.isArray(attrProps)
    ? attrConf.attrProps.map(getAttr)
    : [getAttr(attrConf.attrProps)];

  return (
    <Page id={`survey-${attr}`}>
      <Header />

      <Main className="survey">{attrs}</Main>

      {!!isComplete && <Footer comingFrom={comingFrom} />}
    </Page>
  );
};

export default observer(SurveyAttrPage);
