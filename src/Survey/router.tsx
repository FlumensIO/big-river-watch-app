import { RouteWithModels } from '@flumens';
import { Attrs } from 'common/models/record';
import records from 'models/collections/records';
import End from './End';
import Location from './Location';
import Photo from './Photo';
import StartNewSurvey from './StartNewSurvey';
import SurveyAttrPage from './SurveyAttrPage';
import User from './User';
import UserContact from './UserContact';

const baseURL = '/survey';

const getQuestionRoute = (Component: unknown, index: number) => {
  if (typeof Component === 'string') {
    const attr = Component as keyof Attrs;
    return [
      `${baseURL}/:smpId/${index + 1}`,
      // eslint-disable-next-line @getify/proper-arrows/name
      ({ sample }: any) => <SurveyAttrPage sample={sample} attr={attr} />,
    ];
  }

  return [`${baseURL}/:smpId/${index + 1}`, Component];
};

export const questionRoutes = [
  User,
  UserContact,
  'citSciExperience',
  'surveyors',
  Location,
  Photo,
  'rain',
  'flow',
  'visitFrequency',
  'riverHealth',
  'feeling',
  'riverNaturalness',
  'barriers',
  'banks',
  'wildlife',
  'plants',
  'water',
  'smell',
  'litter',
  'pollution',
  // TODO: 3 things
  'comments',
];

const routes = [
  [`${baseURL}`, StartNewSurvey, true],

  ...questionRoutes.map(getQuestionRoute),

  [`${baseURL}/:smpId/end`, End],
];

export default RouteWithModels.fromArray(records, routes);
