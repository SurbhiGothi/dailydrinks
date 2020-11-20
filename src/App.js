
import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import { Route, Switch } from "react-router-dom";
import ManageDrinks from './Component/ManageDrinks';


export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={ManageDrinks} />
      </Switch>
    </div>
  );
}

