import { useContext } from 'react';
import { useRouteMatch } from 'react-router';
import { RouteWithModels } from '@flumens';
import { NavContext } from '@ionic/react';
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

export const useNavigateNext = (comingFrom?: string) => {
  const { navigate } = useContext(NavContext);
  const match = useRouteMatch();
  const route = match.url.split('/');
  const step = parseInt(route.pop()!, 10);

  const surveyStepCount = questionRoutes.length;
  const isLastStep = surveyStepCount === step;

  const navigateNext = () => {
    if (isLastStep) {
      route.push(`end`);
    } else {
      route.push(`${step + 1}`);
    }

    const navigateTo = route.join('/');

    navigate(navigateTo, 'forward', 'push', undefined, {
      comingFrom,
      unmount: true,
    });
  };

  return navigateNext;
};

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

const routes = [
  [`${baseURL}`, StartNewSurvey, true],

  ...questionRoutes.map(getQuestionRoute),

  [`${baseURL}/:smpId/end`, End],
];

export default RouteWithModels.fromArray(records, routes);
