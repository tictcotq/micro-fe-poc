import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import MicroFrontend from './components/MicroFrontend'

const {
  REACT_APP_BROWSE_HOST: browseHost,
  // REACT_APP_RESTAURANT_HOST: restaurantHost,
} = process.env;

const Browse = () => 
  <>
    <h1>Look around:</h1>
    <ul>
      <li>
        <Link to='/moduleA'>Module A</Link>
      </li>
      <li>
        <Link to='/moduleB'>Module B</Link>
      </li>
    </ul>
  </>

const ModuleA = ({history}) => 
  <MicroFrontend history={history} name="ModuleA" host={browseHost} />

const App = () =>
  <>
    <header style={{background: 'red', padding: '2rem'}}>Demo app</header>
    <Router>
      <Switch>
        <Route exact path="/" component={Browse} />
        <Route exact path="/moduleA" component={ModuleA} /> 
        {/* <Route exact path="/moduleB" render={Random} /> */}
      </Switch>
    </Router>
  </>

export default App;
