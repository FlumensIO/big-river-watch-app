import { observer } from 'mobx-react';
import { Capacitor } from '@capacitor/core';
import { PhotoPicker, captureImage } from '@flumens';
import { isPlatform } from '@ionic/react';
import config from 'common/config';
import Media from 'models/media';
import Record from 'models/record';
import './styles.scss';

type Props = {
  model: Record;
};

const AppPhotoPicker = ({ model }: Props) => {
  const isUploaded = model.isUploaded();

  async function onAdd(shouldUseCamera: boolean) {
    const images = await captureImage(
      shouldUseCamera ? { camera: true } : { multiple: true }
    );
    if (!images.length) return;

    const getImageModel = async (image: any) => {
      const imageModel: any = await Media.getImageModel(
        isPlatform('hybrid') ? Capacitor.convertFileSrc(image) : image,
        config.dataPath
      );

      return imageModel;
    };

    const imageModels: Media[] = await Promise.all<any>(
      images.map(getImageModel)
    );

    model.media.push(...imageModels);
    model.save();
  }

  const onRemove = (m: any) => m.destroy();

  return (
    <PhotoPicker
      onAdd={onAdd}
      onRemove={onRemove}
      value={model.media}
      isDisabled={isUploaded}
    />
  );
};

export default observer(AppPhotoPicker);
