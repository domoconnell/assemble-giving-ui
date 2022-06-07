import React, {Component} from "react";
import Navbar from "../components/Navbar/Navbar.jsx";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";
import axios from "axios";

var Register = class extends Component{
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
                <Navbar app={this.props.app} />
                <div className="uk-section-default uk-section uk-section-xsmall">
                    <div className="uk-container">
                        <div className="uk-section">
                            <div className="uk-grid">
                                <div className="uk-width-1-4"></div>
                                <div className="uk-width-1-2">
                                    <div className="uk-card uk-card-default uk-card-body">
                                        <div className="uk-h3 uk-text-center">Register To Assemble Giving</div>
                                        <p className="uk-text">To register for Assemble Giving, make your first donation on the main Assemble Church website.</p>
                                        <a href="https://www.assemblechurch.com/giving/give-online" className="uk-button uk-button-primary uk-width-1-1">Go To Assemble Church</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
};

export default Register;

