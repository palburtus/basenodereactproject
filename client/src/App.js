import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Home from './components/home.jsx'

function App() {
  
  const UnAuthenticatedContainer = () => (
    <div>
      <div className="container body-content">
        <Route path="/home" component={Home} />         
      </div>
    </div>
   )
  
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
            <Route exact path="/home" component={UnAuthenticatedContainer}/> 
          </div>
        </Switch>
      </Router>
  );
}

export default App;
