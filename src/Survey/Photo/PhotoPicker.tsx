import { FC, useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { PhotoPicker, captureImage } from '@flumens';
import config from 'common/config';
import Media from 'models/media';
import Record from 'models/record';

type Props = {
  model: Record;
};

const useOnBackButton = (onCancelEdit: () => void, editImage?: Media) => {
  const hideModal = () => {
    const disableHardwareBackButton = (event: any) => {
      // eslint-disable-next-line
      event.detail.register(100, (processNextHandler: any) => {
        if (!editImage) {
          processNextHandler();
          return null;
        }

        onCancelEdit();
      });
    };

    // eslint-disable-next-line
    document.addEventListener('ionBackButton', disableHardwareBackButton);
    // eslint-disable-next-line
    const removeEventListener = () =>
      document.removeEventListener('ionBackButton', disableHardwareBackButton);
    return removeEventListener;
  };

  useEffect(hideModal, [editImage]);
};

const AppPhotoPicker: FC<Props> = ({ model }) => {
  const [editImage, setEditImage] = useState<Media>();

  const onAdd = async (shouldUseCamera: boolean) => {
    const [image] = await captureImage({
      camera: shouldUseCamera,
    });
    if (!image) return;

    const imageModel = await Media.getImageModel(image, config.dataPath);
    model.media.push(imageModel);
    model.save();
  };

  const onRemove = async (media: any) => media.destroy();

  const onCancelEdit = () => setEditImage(undefined);

  useOnBackButton(onCancelEdit, editImage);

  const isDisabled = model.isDisabled();
  if (isDisabled && !model.media.length) return null;

  return (
    <>
      <PhotoPicker
        value={model.media}
        onAdd={onAdd}
        onRemove={onRemove}
        isDisabled={isDisabled}
        // placeholder={placeholder}
      />
    </>
  );
};

export default observer(AppPhotoPicker);
