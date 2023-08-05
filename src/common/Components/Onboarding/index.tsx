import { useState } from 'react';
import { observer } from 'mobx-react';
import clsx from 'clsx';
import { arrowForward } from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Main, Page } from '@flumens';
import {
  IonButton,
  IonButtons,
  IonFooter,
  IonIcon,
  IonToolbar,
} from '@ionic/react';
import '@ionic/react/css/ionic-swiper.css';
import config from 'common/config';
import appModel from 'models/app';
import './styles.scss';
import slide1 from './welcome1.jpg';
import slide2 from './welcome2.jpg';
import slide3 from './welcome3.jpg';
import slide4 from './welcome4.jpg';

const Onboarding = ({ children }: any) => {
  const [moreSlidesExist, setMoreSlidesExist] = useState(true);
  const [controlledSwiper, setControlledSwiper] = useState<SwiperCore>();

  const handleSlideChangeStart = async () => {
    const isEnd = controlledSwiper && controlledSwiper.isEnd;
    setMoreSlidesExist(!isEnd);
  };

  function exit() {
    console.log('Info:Welcome:Controller: exit.');
    appModel.attrs.showedWelcome = true;
    appModel.save();
  }

  const slideNextOrClose = () => {
    if (moreSlidesExist) {
      controlledSwiper && controlledSwiper.slideNext();
      return;
    }

    exit();
  };

  const { showedWelcome } = appModel.attrs;

  if (showedWelcome) return children;

  const headerWave = (
    <svg width="0" height="0">
      <clipPath id="svgClip" clipPathUnits="objectBoundingBox">
        <path d="M0.406,0.955c0.074,-0.009 0.145,-0.025 0.218,-0.035c0.104,-0.014 0.212,-0.014 0.316,0c0.101,0.014 0.206,0.048 0.306,0.066c0.088,0.015 0.185,0.021 0.271,0.002l-0,-0.988l-1.517,0l0,0.931c0.13,0.032 0.27,0.041 0.406,0.024Z" />
      </clipPath>
    </svg>
  );

  return (
    <Page id="welcome">
      <Main scrollY={false}>
        <Swiper
          onSwiper={setControlledSwiper}
          modules={[Pagination]}
          pagination={{
            el: '.pagination-container',
          }}
          onSlideChange={handleSlideChangeStart}
        >
          {
            headerWave // clip-path reference in css
          }

          <SwiperSlide>
            <div className="with-shadow">
              <img src={slide1} alt="" />
              <img src={slide1} alt="" className="shadow" />
            </div>

            <div className="message">
              <h1 className="mb-5">
                <T>
                  Welcome to <b>Big River Watch</b>!
                </T>
              </h1>
              <p>
                <T>
                  Take part in the survey to help us understand the health of
                  our rivers.
                </T>
              </p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="with-shadow">
              <img src={slide2} alt="" />
              <img src={slide2} alt="" className="shadow" />
            </div>

            <div className="message">
              <h1 className="mb-5">
                <T>
                  Simply sign up and pick a riverside location that you can
                  spend 10-15 mins observing.
                </T>
              </h1>
              <p>
                <T>
                  Look out for things like wildlife, plants and pollution, then
                  start the survey in this app to tell us what you can see.
                  Click ‘submit’ to send us your results!
                </T>
              </p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="with-shadow">
              <img src={slide3} alt="" />
              <img src={slide3} alt="" className="shadow" />
            </div>

            <div className="message">
              <h1 className="mb-5">
                <T>Not sure what you’re looking at?</T>
              </h1>
              <p>
                <T>
                  Use our handy ID guides to help identify some of the different
                  species or types of pollution you might come across.
                </T>
              </p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="with-shadow">
              <img src={slide4} alt="" />
              <img src={slide4} alt="" className="shadow" />
            </div>

            <div className="message">
              <h1 className="mb-5">
                <T>
                  Remember, you should never enter the river to take part in{' '}
                  <b>Big River Watch</b>.
                </T>
              </h1>
              <p>
                <T>
                  Find somewhere safe nearby to the river where there is no risk
                  of slipping into the water, and enjoy a peaceful time
                  observing river life.
                </T>
              </p>
              <p className="mt-4">
                <T>
                  Click to confirm you’ve read the{' '}
                  <a
                    href={`${config.websitePath}/safety-guidance`}
                    className="underline"
                  >
                    Health and Safety guidance
                  </a>{' '}
                  and you agree to our{' '}
                  <a href={`${config.websitePath}/terms`} className="underline">
                    Terms and Conditions
                  </a>
                  .
                </T>
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </Main>

      <IonFooter className="ion-no-border">
        <IonToolbar>
          <div className="pagination-container mx-5" />
          <IonButtons slot="end">
            <IonButton
              onClick={slideNextOrClose}
              color="primary"
              fill="solid"
              shape="round"
              className={clsx('!m-3 h-12', moreSlidesExist && 'w-12')}
            >
              {!moreSlidesExist ? (
                <span className="px-5 font-bold">Confirm</span>
              ) : (
                <IonIcon slot="icon-only" icon={arrowForward} />
              )}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </Page>
  );
};

export default observer(Onboarding);
