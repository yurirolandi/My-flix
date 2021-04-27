import React from 'react';
import Routes from "./routes";
import './style/global.scss';
import 'react-toastify/dist/ReactToastify.css';
import Store from './store';

function App() {
  return  <Store><Routes /></Store>;
}

export default App;
