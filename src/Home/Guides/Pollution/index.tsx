import { useState } from 'react';
import { informationCircle } from 'ionicons/icons';
import { InfoMessage, Main, Page } from '@flumens';
import { IonIcon } from '@ionic/react';
import GuideItemProfile from 'Components/GuideItemProfile';
import GuideItems, { GuideItem } from '../common/GuideItems';
import './images';
import items from './items';
import './thumbnails';

const Wildlife = () => {
  const [item, setItem] = useState<GuideItem | null>();

  const onClose = () => setItem(null);
  const onOpen = (newItem: GuideItem) => setItem(newItem);

  return (
    <Page id="pollution">
      <Main className="[--padding-bottom:0]">
        <InfoMessage
          className="!m-0 !max-w-none ![--border-radius:0] ![border-radius:0]"
          prefix={<IonIcon icon={informationCircle} className="size-6" />}
        >
          There are many different types of pollution that can be found in our
          waterways. Some, like chemicals and nutrients are hard to identify,
          but others are easier to see. Here are a few examples of the more
          common types of pollution.
        </InfoMessage>
        <GuideItems items={items} onClick={onOpen} />
        <GuideItemProfile item={item} onClose={onClose} />
      </Main>
    </Page>
  );
};

export default Wildlife;
