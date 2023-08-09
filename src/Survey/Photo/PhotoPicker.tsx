import { FC, useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Capacitor } from '@capacitor/core';
import { PhotoPicker, captureImage, useToast } from '@flumens';
import { isPlatform } from '@ionic/react';
import config from 'common/config';
import Media from 'models/media';
import Record from 'models/record';

type URL = string;

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
  const toast = useToast();

  async function onAddNew(shouldUseCamera: boolean) {
    try {
      const photoURLs = await captureImage(
        shouldUseCamera ? { camera: true } : { multiple: true }
      );

      if (!photoURLs.length) return;

      const getImageModel = async (imageURL: URL) => {
        const media = Media.getImageModel(
          isPlatform('hybrid') ? Capacitor.convertFileSrc(imageURL) : imageURL,
          config.dataPath
        );

        return media;
      };

      const imageModels: Media[] = await Promise.all<any>(
        photoURLs.map(getImageModel)
      );

      model.media.push(...imageModels);
      model.save();
    } catch (e: any) {
      toast.error(e);
    }
  }

  const onCancelEdit = () => setEditImage(undefined);

  useOnBackButton(onCancelEdit, editImage);

  const isDisabled = model.isDisabled();
  if (isDisabled && !model.media.length) return null;

  return (
    <>
      <PhotoPicker
        onAddNew={onAddNew}
        model={model}
        isDisabled={isDisabled}
        // placeholder={placeholder}
      />
    </>
  );
};

export default observer(AppPhotoPicker);
