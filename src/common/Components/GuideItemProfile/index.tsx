/* eslint-disable @getify/proper-arrows/name */
import { useState } from 'react';
import { arrowBack } from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Main, useOnBackButton } from '@flumens';
import {
  IonCardHeader,
  IonButton,
  IonCardContent,
  IonIcon,
  IonButtons,
  IonHeader,
  IonModal,
  IonToolbar,
} from '@ionic/react';
import '@ionic/react/css/ionic-swiper.css';
import FullScreenPhotoViewer from './FullScreenPhotoViewer';
import './styles.scss';

type Props = {
  onClose: any;
  item?: any;
};

const GuideItemProfile = ({ item, onClose }: Props) => {
  const [showGallery, setShowGallery] = useState<number>();

  const id = item?.id;

  useOnBackButton(onClose);

  const showPhotoInFullScreen = (index: number) => setShowGallery(index);

  const images = [`/images/${id}_1.jpg`, `/images/${id}_2.jpg`];

  const getSlides = () => {
    const slideOpts = {
      initialSlide: 0,
      speed: 400,
    };

    const getSlide = (imageURL: string, index: number) => {
      const showPhotoInFullScreenWrap = () => showPhotoInFullScreen(index);

      return (
        <SwiperSlide
          key={imageURL}
          onClick={showPhotoInFullScreenWrap}
          className="item-profile-photo"
        >
          <img src={imageURL} />
        </SwiperSlide>
      );
    };

    const slideImage = images.map(getSlide);

    return (
      <Swiper modules={[Pagination]} pagination {...slideOpts}>
        {slideImage}
      </Swiper>
    );
  };

  if (!item) return null;

  const onGalleryClose = () => setShowGallery(undefined);

  const itemPhotos = images.map((src: any) => ({ src }));

  return (
    <>
      <IonModal
        id="item-profile"
        isOpen={!!item}
        backdropDismiss={false}
        mode="md"
      >
        <IonHeader className="item-modal-header">
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton
                onClick={onClose}
                fill="solid"
                color="light"
                shape="round"
              >
                <IonIcon slot="icon-only" icon={arrowBack} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <Main className="">
          {getSlides()}

          <IonCardHeader>
            <h1 className="text-primary m-2 font-bold">
              <T>{item.name}</T>
            </h1>
          </IonCardHeader>

          <IonCardContent>
            <h3 className="text-primary">
              <T>Description</T>:
            </h3>
            <p>
              <T>{item.description}</T>
            </p>
          </IonCardContent>
        </Main>
      </IonModal>

      <FullScreenPhotoViewer
        photos={itemPhotos}
        onClose={onGalleryClose}
        isOpen={showGallery}
      />
    </>
  );
};

export default GuideItemProfile;
