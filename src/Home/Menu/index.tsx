import { FC } from 'react';
import { observer } from 'mobx-react';
import { Page, PickByType } from '@flumens';
import appModel, { Attrs } from 'models/app';
import Main from './Main';

const MenuController: FC = () => {
  const onToggleWrap = (
    setting: keyof PickByType<Attrs, boolean>,
    checked: boolean
  ) => {
    appModel.attrs[setting] = checked; // eslint-disable-line
    appModel.save();
  };

  return (
    <Page id="menu">
      <Main onToggle={onToggleWrap} />
    </Page>
  );
};

export default observer(MenuController);
