import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage';
import NavBar from './components/navBar';
import About from './components/About';
import View from './components/View';
import Manager from './components/Manager';


import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginManager from './components/LoginManager';



function App() {
  return (
   
    <BrowserRouter>
          <NavBar></NavBar>
          <Switch>
              <Route path="/About" component={About} exact></Route>
              <Route path="/View" component={View} exact></Route>
              <Route path="/HomePage" component={HomePage} exact></Route>
              <Route path="/LoginManager" component={LoginManager} exact></Route>

          </Switch>
        </BrowserRouter>
  );
}

export default App;
