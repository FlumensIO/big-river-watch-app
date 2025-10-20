import { observer } from 'mobx-react';
import writeBlob from 'capacitor-blob-writer';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { Page, PickByType } from '@flumens';
import { isPlatform } from '@ionic/core';
import CONFIG from 'common/config';
import { db } from 'common/models/store';
import appModel, { Attrs } from 'models/app';
import Main from './Main';

const exportDatabase = async () => {
  const blob = await db.export();

  if (!isPlatform('hybrid')) {
    window.open(window.URL.createObjectURL(blob), '_blank');
    return;
  }

  const path = `export-app-${CONFIG.build}-${Date.now()}.db`;
  const directory = Directory.External;

  await writeBlob({ path, directory, blob });
  const { uri: url } = await Filesystem.getUri({ directory, path });
  await Share.share({ title: `App database`, files: [url] });
  await Filesystem.deleteFile({ directory, path });
};

// For dev purposes only
const importDatabase = async () => {
  const blob = await new Promise<Blob>(resolve => {
    const input = document.createElement('input');
    input.type = 'file';
    input.addEventListener('change', function () {
      const fileReader = new FileReader();
      fileReader.onloadend = async (e: any) =>
        resolve(
          new Blob([e.target.result], { type: 'application/vnd.sqlite3' })
        );
      fileReader.readAsArrayBuffer(input.files![0]);
    });
    input.click();
  });

  await db.sqliteConnection.closeAllConnections();
  await db.import(blob);
  window.location.reload();
};

const MenuController = () => {
  const onToggleWrap = (
    setting: keyof PickByType<Attrs, boolean>,
    checked: boolean
  ) => {
    appModel.data[setting] = checked; // eslint-disable-line
    appModel.save();
  };

  return (
    <Page id="menu">
      <Main
        onToggle={onToggleWrap}
        exportDatabase={exportDatabase}
        importDatabase={importDatabase}
      />
    </Page>
  );
};

export default observer(MenuController);
