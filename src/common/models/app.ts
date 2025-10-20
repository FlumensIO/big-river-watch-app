import { Model, ModelAttrs } from '@flumens';
import languages from 'common/languages';
import { mainStore } from 'models/store';

export interface Attrs extends ModelAttrs {
  appSession: number;
  sendAnalytics: boolean;
  showedWelcome: boolean;
  language?: '' | keyof typeof languages;

  // draft survey pointers
  'draftId:survey': string;
}

const defaults: Attrs = {
  language: '',
  sendAnalytics: true,
  appSession: 0,
  showedWelcome: false,
  'draftId:survey': '',
};

export class AppModel extends Model<Attrs> {
  constructor(options: any) {
    super({ ...options, data: { ...defaults, ...options.data } });
  }

  resetDefaults() {
    return super.reset(defaults);
  }
}

const appModel = new AppModel({ cid: 'app', store: mainStore });
export default appModel;
