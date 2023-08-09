import * as Yup from 'yup';
import { Model, ModelAttrs } from '@flumens';
import { genericStore } from './store';

export interface Attrs extends ModelAttrs {
  firstName: string;
  lastName: string;
  email: string;
  allowContact: boolean;
  postcode?: string;
  citSciExperience?: boolean;
}

const defaults: Attrs = {
  firstName: '',
  lastName: '',
  email: '',
  allowContact: false,
};

export class User extends Model {
  attrs: Attrs = Model.extendAttrs(this.attrs, defaults);

  isValid() {
    try {
      Yup.object()
        .shape({
          firstName: Yup.string().required(),
          lastName: Yup.string().required(),
          email: Yup.string().email().required(),
          citSciExperience: Yup.string().required(),
          allowContact: Yup.boolean().required(),
          postcode: Yup.string().when('allowContact', {
            is: true,
            then: (schema: any) =>
              schema.matches(
                // https://gist.github.com/simonwhitaker/5748487
                /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) {0,1}[0-9][A-Za-z]{2})$/,
                'Valid postcode'
              ),
          }),
        })
        .validateSync(this.attrs, { abortEarly: false });
    } catch (attrError) {
      return false;
    }
    return true;
  }
}

const appModel = new User({ cid: 'user', store: genericStore });

export { appModel as default, User as UserModel };
