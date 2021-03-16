import React from 'react';
import logo from './logo.svg';
import './App.css';
import Count from './Count';
import Count2 from './Count2';
import { Provider } from './redux/react-redux';

const App = () => {
  return (
    <Provider>
      <Count />
      <Count2 />
    </Provider>
  )
}

export default App;
