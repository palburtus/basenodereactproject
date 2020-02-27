import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import logo from './logo.svg';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import Home from './components/home'

function App() {
  
   function NoMatch({ location }) {
    return (
      <div>
        <h3>
          404!
        </h3>
        <p>Could not find page <code>{location.pathname}</code></p>
      </div>
    );
  }

  return (
    
    <Router>
        <Switch>
          <div className="App">
            <div className="container body-content">
              <Route exact path="/" component={Home} />
            </div>      
          </div>
        </Switch>
      </Router>
  );
}

export default App;
