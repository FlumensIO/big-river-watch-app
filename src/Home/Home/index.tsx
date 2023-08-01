import { useContext } from 'react';
import { Page, Main } from '@flumens';
import { IonButton, NavContext } from '@ionic/react';
import records from 'models/collections/records';
import Record from 'models/record';
import './styles.scss';

const HomeController = () => {
  const { navigate } = useContext(NavContext);
  const addRandomRecord = () => {
    const record = new Record({
      metadata: {
        saved: true,
      },
      attrs: {
        date: new Date().toISOString(),
        latitude: 51 + Math.random(),
        longitude: 1 + Math.random(),
      },
    });
    record.save();
    records.push(record);

    navigate('/home/records/pending');
  };

  return (
    <Page id="home">
      <Main>
        <IonButton
          onClick={addRandomRecord}
          className="absolute bottom-20 left-1/2 w-3/4 -translate-x-1/2 -translate-y-1/2 transform"
        >
          Add Survey
        </IonButton>
      </Main>
    </Page>
  );
};

export default HomeController;
