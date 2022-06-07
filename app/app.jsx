import React, {Component} from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
import styles from "./style/assemble-giving.less";

import Navbar from "./components/Navbar/Navbar.jsx";
import Admin from "./admin/admin.index.jsx";
import Mygiving from "./MyGiving/Mygiving.index.jsx";
import Login from "./user/Login.jsx";
import Logout from "./user/Logout.jsx";
import Register from "./user/Register.jsx";
import events from "./helpers/Events.service.js";
import ForgottonPassword from "./user/ForgottonPassword.jsx";
import StatusCheck from "./components/StatusCheck.jsx";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";

var GivingApplication = class extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading: true,
            app: {
                session: false,
                events: events
            }
        }
    }
    componentDidMount(){
        let that = this;
        this.FindSession();
        this.state.app.events.on("login", function(){
            that.FindSession();
        })
        this.state.app.events.on("logout", function(){
            that.FindSession();
        })
    }
    FindSession(){
        let that = this;
        axios.get(API_URL + "hello").then(function(response){
            let app = that.state.app;
                app.session = response.data.session;
            that.setState({
                app:app,
                loading: false
            })
        })
    }
    render(){
        if(this.state.loading){
            return(
                <React.Fragment>
                    <Navbar app={this.state.app} hideMenu={true} />
                    <div className="uk-section-default uk-section uk-section-xsmall">
                        <div className="uk-container">
                            <div className="uk-text-center">
                                <div uk-spinner="ratio: 3"></div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
        //check for none login sensitive pages
        return(
            <Router>
                <Routes>
                    <Route path="/status" element={<StatusCheck app={this.props.app} />} />
                    <Route>
                        {!this.state.app.session ?
                            <React.Fragment>
                                <Route path="login" element={<Login app={this.state.app} />} />
                                <Route path="register" element={<Register app={this.state.app} />} />
                                <Route path="forgotton-password" element={<ForgottonPassword app={this.state.app} />} />
                                <Route path="*" element={<Navigate to="login" replace />} />
                            </React.Fragment>
                        :
                            <React.Fragment>
                                <Route path="logout" element={<Logout app={this.state.app} />} />
                                <Route path="admin/*" element={<Admin app={this.state.app} />} />
                                <Route path="*" element={<Mygiving app={this.state.app} />} />
                            </React.Fragment>
                        }
                    </Route>
                </Routes>
            </Router>
        );

    }
};

export default GivingApplication;