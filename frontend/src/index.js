import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import './index.css';
import history from './history';
import App from './components/App';
import Blockchain from './components/Blockchain';
import ConductTransaction from './components/ConductTransaction';
import TransactionPool from './components/TransactionPool';



ReactDOM.render(


  <Router history={history}>
    <Switch>
      <Route path='/' exact component={App} />
      <Route path='/artificial geometric oracle blockchain' component={Blockchain} />
      <Route path='/conduct-transaction' component={ConductTransaction} />
      <Route path='/transaction-pool' component={TransactionPool} />

    </Switch>
  </Router>,

      //      <div>
      //   <Visualizer />
      // </div>,
  document.getElementById('root')
);
