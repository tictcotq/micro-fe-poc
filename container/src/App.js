import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import MicroFrontend from './components/MicroFrontend'
import { createStore, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'

const initialState = {
  user: 'Pavel'
}

const rootReducer = combineReducers({
  auth: (state = initialState, action) => {
    switch(action.type) {
      case 'user.update':
        return {
          ...state,
          user: action.payload
        }
      default:
        return state
    }

  }
})

const store = createStore(rootReducer);

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
  updateUser: name => dispatch({ type: 'user.update', payload: name})
})

const {
  REACT_APP_MODULE_A_HOST,
} = process.env;

const Browse = connect(mapStateToProps)(({auth}) => 
  <>
    <h1>Look around, {auth.user}</h1>
    <ul>
      <li>
        <Link to='/moduleA'>Module A</Link>
      </li>
      <li>
        <Link to='/moduleB'>Module B</Link>
      </li>
    </ul>
  </>
)

const Header = connect(mapStateToProps, mapDispatchToProps)(({auth, updateUser}) => 
  <header style={{background: 'red', padding: '2rem'}}>
    Demo app
    <input value={auth.user} onChange={({target: {value}}) => updateUser(value)}/>
  </header>
)

const ModuleA = connect(mapStateToProps)(({auth, history}) => 
  <MicroFrontend history={history} text={auth.user} name="ModuleA" host={REACT_APP_MODULE_A_HOST} />
)

const App = () => {
  return <>
    <Provider store={store}>
    <Header />
    <Router>
      <Switch>
        <Route exact path="/" component={Browse} />
        <Route exact path="/moduleA"><ModuleA/></Route>
      </Switch>
    </Router>
    </Provider>
  </>
}

export default App;
