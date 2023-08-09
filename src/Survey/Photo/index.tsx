import { observer } from 'mobx-react';
import { informationCircleOutline } from 'ionicons/icons';
import { Page, Main, InfoMessage } from '@flumens';
import { IonList } from '@ionic/react';
import Record from 'models/record';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import PhotoPicker from './PhotoPicker';

type Props = { sample: Record };

const Photo = ({ sample: record }: Props) => {
  return (
    <Page id="survey-photo">
      <Header />

      <Main>
        <InfoMessage icon={informationCircleOutline} className="info-message">
          Upload a photo of the river.
        </InfoMessage>

        <IonList>
          <div className="rounded">
            <PhotoPicker model={record} />
          </div>
        </IonList>
      </Main>

      <Footer comingFrom="Photo" />
    </Page>
  );
};

export default observer(Photo);
