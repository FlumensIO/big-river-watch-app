import { Model, ModelAttrs } from '@flumens';
import languages from 'common/languages';
import { genericStore } from './store';

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

class AppModel extends Model {
  // eslint-disable-next-line
  // @ts-ignore
  attrs: Attrs = Model.extendAttrs(this.attrs, defaults);
}

const appModel = new AppModel({ cid: 'app', store: genericStore });

export { appModel as default, AppModel };
