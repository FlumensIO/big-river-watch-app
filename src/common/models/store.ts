import { Store } from '@flumens';
import { isPlatform } from '@ionic/react';

const isDemo = !isPlatform('hybrid');

export const genericStore = new Store({
  name: 'main',
  storeName: 'generic',
  debugging: isDemo,
});
export const modelStore = new Store({
  name: 'main',
  storeName: 'models',
  debugging: isDemo,
});

if (isDemo) {
  Object.assign(window, { genericStore });
}
