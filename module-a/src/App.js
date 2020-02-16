import React from 'react';
import { ComponentA } from './components/ComponentA';


const App = ({text}) =>
  <div>
    <h1>Demo App A</h1>
    <ComponentA />
    {text}
  </div>

export default App;
