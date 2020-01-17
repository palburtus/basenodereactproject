import React from 'react';
import Menu from 'react-burger-menu/lib/menus/slide'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../css/left-nav.css';

class LeftNav extends React.Component{

    constructor(props, context) {
        super(props, context);
        this.state = {
            menuOpen: true
          }
    }

    render(){

        const isMobile = window.innerWidth < 480;

        var leftNavItems = [];

        if(this.props.navConfig.leftMenuItems){
            
            leftNavItems = this.props.navConfig.leftMenuItems.map((n, i) => {
                //if(n.isActive){
                //  return <li className="nav-item active" key={i}><a className="nav-link" href={n.url}>{n.label}</a></li>;
                //}else {
                    return <Link id={n.label} className="menu-item" to={n.url} key={i}>{n.label}</Link>
                    //return <li className="nav-item" key={i}><a className="nav-link" href={n.url}>{n.label}</a></li>;
                //}
              })
              
            if(isMobile){
                return (
                    <div>
                        <Menu  width={ '70%' } disableAutoFocus pageWrapId={ "page-wrap" }  noOverlay>
                            {leftNavItems}
                        </Menu>
                    </div>  
                );
            }else {
                return (
                    <div>
                        <Menu  width={ '20%' } disableAutoFocus isOpen={this.state.menuOpen} pageWrapId={ "page-wrap" }  noOverlay>
                            {leftNavItems}
                        </Menu>
                    </div>  
                );
            }
            
        }else {
            return (
                <div></div>  
            );
        }
    }
}

export default LeftNav;