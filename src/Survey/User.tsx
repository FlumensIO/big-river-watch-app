import { informationCircleOutline } from 'ionicons/icons';
import { Page, InfoMessage, Main } from '@flumens';
import Footer from './Components/Footer';
import Header from './Components/Header';

const User = () => {
  return (
    <Page id="survey-user">
      <Header />

      <Main>
        <InfoMessage icon={informationCircleOutline} className="info-message">
          Please tell us more about yourself.
        </InfoMessage>
      </Main>

      <Footer comingFrom="User" />
    </Page>
  );
};

export default User;
