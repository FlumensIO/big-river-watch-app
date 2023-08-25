import { Route } from 'react-router-dom';
import About from './About';
import Pollution from './Pollution';

export default [
  <Route path="/info/about" key="/info/about" exact component={About} />,
  <Route
    path="/info/pollution"
    key="/info/pollution"
    exact
    component={Pollution}
  />,
];
