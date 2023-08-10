import { observer } from 'mobx-react';
import * as Yup from 'yup';
import { Page, InfoMessage, Main, Attr } from '@flumens';
import Record from 'models/record';
import Footer from './Components/Footer';
import Header from './Components/Header';

function isValid(attrs: any) {
  try {
    Yup.object()
      .shape({
        citSciExperience: Yup.string().required(),
      })
      .validateSync(attrs, { abortEarly: false });
  } catch (attrError) {
    return false;
  }
  return true;
}

type Props = { sample: Record };

const UserExperience = ({ sample: record }: Props) => {
  const isComplete = isValid(record.attrs);

  return (
    <Page id="survey-user-experience">
      <Header />

      <Main>
        <InfoMessage className="info-message">
          Have you ever taken part in a citizen science activity before?
        </InfoMessage>

        <Attr
          model={record}
          attr="citSciExperience"
          input="radio"
          inputProps={{
            options: [{ value: 'Yes' }, { value: 'No' }, { value: 'Unsure' }],
          }}
        />
      </Main>

      {isComplete && <Footer comingFrom="Experience" />}
    </Page>
  );
};

export default observer(UserExperience);
