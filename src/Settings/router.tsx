import { Route } from 'react-router-dom';
import Language from './Language';

export default [
  <Route
    path="/settings/language"
    key="/settings/language"
    exact
    component={Language}
  />,
];
