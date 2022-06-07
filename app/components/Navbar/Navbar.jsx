import React, {Component} from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";

import Navitems from "../NavItems.jsx";

var Navbar = class extends Component{
    constructor(props){
        super(props)
        this.state = {
            
        }
    }
    componentDidMount(){
        
    }
    render(){
        return(
            <React.Fragment>
                <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">
                    <nav className="uk-navbar-container">
                        <div className="uk-container uk-container-large">
                            <nav className="uk-navbar" uk-navbar="true">
                                <div className="uk-navbar-left">
                                    <a href="/" className="uk-navbar-item uk-logo">
                                        <img src="https://cdn.webworksdesign.co.uk/assemble/giving/assemble-giving-1.2.png" style={{height:"40px"}}/>
                                    </a>
                                </div>
                                <div className="uk-navbar-right">
                                    <div className="uk-flex uk-flex-center uk-flex-middle" style={{minHeight:"80px"}}>

                                        {!this.props.hideMenu &&
                                            <ul className="uk-navbar-nav uk-hidden@m">
                                                <li>
                                                    <a href="#" uk-navbar-toggle-icon="true"></a>
                                                    <div className="uk-navbar-dropdown">
                                                        <ul className="uk-nav uk-navbar-dropdown-nav">
                                                            <Navitems />
                                                        </ul>
                                                    </div>
                                                </li>
                                            </ul>
                                        }
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </nav>
                </div>
                <div className="uk-sticky-placeholder" style={{height:"81px"}}></div>
            </React.Fragment>
            
        )
    }
};

export default Navbar;