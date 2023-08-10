import { RouteWithModels } from '@flumens';
import records from 'models/collections/records';
import End from './End';
import Location from './Location';
import Photo from './Photo';
import Rain from './Rain';
import StartNewSurvey from './StartNewSurvey';
import Surveyors from './Surveyors';
import User from './User';
import UserContact from './UserContact';
import UserExperience from './UserExperience';

const baseURL = '/survey';

const getQuestionRoute = (Component: unknown, index: number) => [
  `${baseURL}/:smpId/${index + 1}`,
  Component,
];

const questionRoutes = [
  User,
  UserContact,
  UserExperience,
  Surveyors,
  Location,
  Photo,
  Rain,
].map(getQuestionRoute);

const routes = [
  [`${baseURL}`, StartNewSurvey, true],
  ...questionRoutes,
  [`${baseURL}/:smpId/end`, End],
];

export default RouteWithModels.fromArray(records, routes);
