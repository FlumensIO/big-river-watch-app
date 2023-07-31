import { Model, ModelAttrs } from '@flumens';
import languages from 'common/languages';
import { genericStore } from './store';

export interface Attrs extends ModelAttrs {
  appSession: number;
  sendAnalytics: boolean;
  language?: keyof typeof languages;
}

const defaults: Attrs = {
  sendAnalytics: true,
  appSession: 0,
};

class AppModel extends Model {
  attrs: Attrs = Model.extendAttrs(this.attrs, defaults);
}

const appModel = new AppModel({ cid: 'app', store: genericStore });

export { appModel as default, AppModel };
