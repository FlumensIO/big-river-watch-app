import { useState } from 'react';
import { Main, Page } from '@flumens';
import GuideItemProfile from 'Components/GuideItemProfile';
import GuideItems, { GuideItem } from '../common/GuideItems';
import './images';
import items from './items.json';
import './thumbnails';

const Wildlife = () => {
  const [item, setItem] = useState<GuideItem | null>();

  const onClose = () => setItem(null);
  const onOpen = (newItem: GuideItem) => setItem(newItem);

  return (
    <Page id="wildlife">
      <Main>
        <GuideItems items={items} onClick={onOpen} />
        <GuideItemProfile item={item} onClose={onClose} />
      </Main>
    </Page>
  );
};

export default Wildlife;
