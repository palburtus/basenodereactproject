import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import $ from "jquery";
import '../css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

class NavBar extends React.Component{
    
  constructor(props, context) {
    super(props, context);
  }
  
  render() {

    var navItems = []

    if(this.props.navConfig.items){
      navItems = this.props.navConfig.items.map((n, i) => {
        if(n.isActive){
          return <li className="nav-item active" key={i}><Link className="nav-link" to={n.url}>{n.label}</Link></li>;
        }else {
          return <li className="nav-item" key={i}><Link className="nav-link" to={n.url}>{n.label}</Link></li>;
        }
      })

      return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">{this.props.navConfig.wordMark}</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
  
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                {navItems}
              </ul>
            </div>
          </nav>
        </div>
      );

    }else {
      return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">{this.props.navConfig.wordMark}</a>
            
          </nav>
        </div>
      );
    }
    

    
  }
}

