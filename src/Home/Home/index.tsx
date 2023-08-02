import { useContext } from 'react';
import { Page, Main } from '@flumens';
import { IonButton, NavContext } from '@ionic/react';
import records from 'models/collections/records';
import Media from 'models/media';
import Record from 'models/record';
import './styles.scss';

function generateImage() {
  // create random image
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  const imgData: any = ctx.createImageData(1000, 1000); // px

  for (let i = 0; i < imgData.data.length; i += 4) {
    imgData.data[i] = (Math.random() * 100).toFixed(0);
    imgData.data[i + 1] = (Math.random() * 100).toFixed(0);
    imgData.data[i + 2] = (Math.random() * 100).toFixed(0);
    imgData.data[i + 3] = 105;
  }
  ctx.putImageData(imgData, 0, 0);
  const imageData = canvas.toDataURL('jpg');

  const image = new Media({
    attrs: {
      data: imageData,
      type: 'image/jpg',
    },
  });

  return image;
}

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

    const image = generateImage();
    record.media.push(image);

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
