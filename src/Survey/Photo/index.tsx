import { observer } from 'mobx-react';
import { Page, Main, InfoMessage } from '@flumens';
import { IonList } from '@ionic/react';
import Record from 'models/record';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import PhotoPicker from './PhotoPicker';
import './styles.scss';

type Props = { sample: Record };

const Photo = ({ sample: record }: Props) => {
  return (
    <Page id="survey-photo">
      <Header />

      <Main>
        <InfoMessage className="info-message">
          <div className="font-medium">Upload a photo of the river.</div>
        </InfoMessage>

        <IonList>
          <div className="rounded">
            <PhotoPicker model={record} />
            <InfoMessage className="[--inner-padding-end:0] [&>ion-label]:p-0">
              <div className="text-base">
                We’ll share selected images to celebrate our rivers and also to
                shine a light on the problems they face. While we won’t make
                every image available, we’ll endeavour to use them all in our
                research behind the scenes.
              </div>
            </InfoMessage>
          </div>
        </IonList>
      </Main>

      <Footer comingFrom="Photo" />
    </Page>
  );
};

export default observer(Photo);
