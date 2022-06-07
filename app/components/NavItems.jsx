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

var Navitems = class extends Component{
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
                <li className="uk-nav-header">Main Menu</li>
                <li>
                    <Link to="/">
                        <span className="uk-margin-small-right" uk-icon="thumbnails"></span>
                        Summary
                    </Link>
                </li>
                <li>
                    <Link to="/recurring-donations">
                        <span className="uk-margin-small-right" uk-icon="clock"></span>
                        Recurring Donations
                    </Link>
                </li>
                <li>
                    <Link to="/one-time-donations">
                        <span className="uk-margin-small-right" uk-icon="credit-card"></span>
                        One Time Donations
                    </Link>
                </li>
                <li>
                    <Link to="/quick-give">
                        <span className="uk-margin-small-right" uk-icon="bolt"></span>
                        Quick Give
                    </Link>
                </li>
                <li>
                    <a href="https://www.assemblechurch.com/giving/give-online">
                        <span className="uk-margin-small-right" uk-icon="plus"></span>
                        New Donation
                    </a>
                </li>
                <li className="uk-nav-divider"></li>
                <li className="uk-nav-header">Me</li>
                <li>
                    <Link to="/logout">
                        <span className="uk-margin-small-right" uk-icon="sign-out"></span>
                        Logout
                    </Link>
                </li>
            </React.Fragment>
            
        )
    }
};

export default Navitems;