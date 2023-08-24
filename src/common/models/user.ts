import { Model, ModelAttrs } from '@flumens';
import { genericStore } from './store';

export interface Attrs extends ModelAttrs {
  firstName: string;
  lastName: string;
  email: string;
  allowContact: boolean;
  postcode?: string;
  experience?: boolean;
}

const defaults: Attrs = {
  firstName: '',
  lastName: '',
  email: '',
  allowContact: false,
};

export class User extends Model {
  attrs: Attrs = Model.extendAttrs(this.attrs, defaults);
}

const appModel = new User({ cid: 'user', store: genericStore });

export { appModel as default, User as UserModel };
