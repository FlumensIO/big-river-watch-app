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
  'experience',
  'surveyors',
  Location,
  Photo,
  'rain',
  'flow',
  'visits',
  'health',
  'feeling',
  'naturalness',
  'barriers',
  'banks',
  'wildlife',
  'plants',
  'water',
  'smell',
  'litter',
  'pollution',
  'goodThings',
  'comment',
];

const routes = [
  [`${baseURL}`, StartNewSurvey, true],

  ...questionRoutes.map(getQuestionRoute),

  [`${baseURL}/:smpId/end`, End],
];

export default RouteWithModels.fromArray(records, routes);
