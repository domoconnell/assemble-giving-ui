import React, {Component} from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
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

var Register = class extends Component{
    constructor(props){
        super(props)
        this.state = {
            redirect: false
        }
    }
    componentDidMount(){
        let that = this;
        axios.get(API_URL + "logout").then((res)=>{
            that.props.app.events.emit("login");
        });
    }
    render(){
        if(this.state.redirect){
            return <Navigate to="/" replace />
        }
        return(
            <React.Fragment>
                <Navbar app={this.props.app} />
                <div className="uk-section-default uk-section uk-section-xsmall">
                    <div className="uk-container">
                        <div className="uk-text-center">
                            <div uk-spinner="ratio: 3"></div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
    );
    }
};

export default Register;