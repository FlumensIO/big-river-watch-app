import { FC } from 'react';
import { observer } from 'mobx-react';
import { Page } from '@flumens';
import Main from './Main';

const MenuController: FC = () => {
  return (
    <Page id="menu">
      <Main />
    </Page>
  );
};

export default observer(MenuController);
