import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import MicroFrontend from './components/MicroFrontend'

const {
  REACT_APP_MODULE_A_HOST,
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

const ModuleA = ({history, text}) => 
  <MicroFrontend history={history} text={text} name="ModuleA" host={REACT_APP_MODULE_A_HOST} />

const App = () => {
  const [text, setText] = useState('initial')

  return <>
    <header style={{background: 'red', padding: '2rem'}}>
      Demo app
      <input value={text} onChange={({target: {value}}) => setText(value)}/>
    </header>
    <Router>
      <Switch>
        <Route exact path="/" component={Browse} />
        <Route exact path="/moduleA"><ModuleA text={text}/></Route>
      </Switch>
    </Router>
  </>
}

export default App;
