import { observer } from 'mobx-react';
import { informationCircleOutline } from 'ionicons/icons';
import { Page, InfoMessage, Main, Attr } from '@flumens';
import Record from 'models/record';
import Footer from './Components/Footer';
import Header from './Components/Header';

type Props = { sample: Record };

const UserExperience = ({ sample: record }: Props) => {
  const isComplete = !!record.attrs.citSciExperience;

  return (
    <Page id="survey-user-experience">
      <Header />

      <Main>
        <InfoMessage icon={informationCircleOutline} className="info-message">
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
