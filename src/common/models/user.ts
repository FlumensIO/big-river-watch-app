import { Model, ModelAttrs } from '@flumens';
import { mainStore } from './store';

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

export class UserModel extends Model<Attrs> {
  constructor(options: any) {
    super({ ...options, data: { ...defaults, ...options.data } });
  }
}

const userModel = new UserModel({
  cid: 'user',
  store: mainStore,
});

export default userModel;
