import { RouteWithModels } from '@flumens';
import records from 'models/collections/records';
import Location from './Location';
import StartNewSurvey from './StartNewSurvey';
import User from './User';

const baseURL = '/survey';

const routes = [
  [`${baseURL}`, StartNewSurvey, true],
  [`${baseURL}/:smpId/0`, User],
  [`${baseURL}/:smpId/1`, Location],
];

export default RouteWithModels.fromArray(records, routes);
