import { Store } from '@flumens';
import SQLiteDatabase from '@flumens/models/dist/Stores/SQLiteDatabase';
import { isPlatform } from '@ionic/react';

const web = !isPlatform('hybrid');

export const db = new SQLiteDatabase({ name: 'main', web, debug: web });
export const mainStore = new Store({ name: 'main', db });
export const recordsStore = new Store({ name: 'records', db });

if (web) {
  Object.assign(window, { mainStore, recordsStore, db });
}
