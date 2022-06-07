import React, {Component} from "react";
import Navbar from "../components/Navbar/Navbar.jsx";
import Navitems from "../components/NavItems.jsx";

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

import Quickgive from "./Quickgive.comp.jsx";
import DonationsRecurring from "./DonationsRecurring.comp.jsx";
import DonationsOneTime from "./DonationsOneTime.comp.jsx";
import Summary from "./Summary.comp.jsx";

var Mygiving = class extends Component{
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
                        <div className="uk-grid uk-grid-divider">
                            <div className="uk-width-1-4 uk-first-column uk-visible@m">
                                <ul className="uk-nav uk-nav-default uk-nav-parent-icon" uk-nav="multiple: true">
                                    <Navitems />
                                </ul>
                            </div>
                            <div className="uk-width-3-4">
                                <Routes>
                                    <Route path="/" element={<Summary />} />
                                    <Route path="recurring-donations" element={<DonationsRecurring app={this.props.app} />} />
                                    <Route path="one-time-donations" element={<DonationsOneTime app={this.props.app} />} />
                                    <Route path="quick-give" element={<Quickgive app={this.props.app} />} />
                                    <Route path="*" element={<Navigate to="/" replace />} />
                                </Routes>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
};

export default Mygiving;