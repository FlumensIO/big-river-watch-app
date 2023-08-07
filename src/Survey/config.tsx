import * as Yup from 'yup';

const survey = {
  attrs: {},

  create({ Record }: any) {
    const record = new Record({
      attrs: {
        location: null,
      },
    });

    record.startGPS();

    return record;
  },

  verify(attrs: any) {
    try {
      Yup.object().shape({}).validateSync(attrs, { abortEarly: false });
    } catch (attrError) {
      return attrError;
    }

    return null;
  },
};

export default survey;
