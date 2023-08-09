import * as Yup from 'yup';
import user from 'models/user';

const survey = {
  stepCount: 7,

  attrs: {
    rain: {
      pageProps: {
        attrProps: {
          attr: 'rain',
          input: 'radio',
          inputProps: {
            options: [
              { value: 'Yes' },
              { value: 'No' },
              { value: "Don't know" },
              { value: 'Currently raining' },
            ],
          },
        },
      },
    },

    surveyors: {
      pageProps: {
        attrProps: {
          attr: 'surveyors',
          input: 'slider',
          inputProps: {
            min: 1,
            max: 20,
            step: 1,
          },
        },
      },
    },
  },

  create({ Record }: any) {
    const record = new Record({
      attrs: {
        date: new Date().toISOString(),
        surveyors: 1,
        ...user.attrs,
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
