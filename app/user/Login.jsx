import React, {Component} from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

import Functions from "../helpers/Functions.js";
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

var Login = class extends Component{
    constructor(props){
        super(props)
        this.state = {
            submitting: false,
            loginSuccess: false,
            loginForm:{
                email: "",
                password: ""
            }
        }
    }
    componentDidMount(){
        
    }
    UpdateLoginForm(key, value){
        let loginForm = this.state.loginForm;
        loginForm[key] = value;
        this.setState({loginForm: loginForm});
    }
    SubmitLogin(e){
        let that = this;
        e.preventDefault();
        let er = false;
        if(this.state.loginForm.email == ""){
            er = "Email is required";
        }else if(this.state.loginForm.password == ""){
            er = "Password is required";
        }else if(!Functions.IsValidEmail(this.state.loginForm.email)){
            er = "Email is invalid";
        }
        if(er){
            this.setState({
                loginError: er
            })
            return
        }
        this.setState({
            loginError: false,
            submitting: true
        })
        axios.post(API_URL + "login", this.state.loginForm).then((res)=>{
            that.props.app.events.emit("login");
        }).catch(function(er){
            if(er && er.response && er.response.data && er.response.data.error){
                that.setState({
                    submitting: false,
                    loginError: er.response.data.error,
                })
            }
        })
    }
    render(){
        let that = this;
        if(this.state.loginSuccess){
            return <Navigate to="/" reaplce />
        }
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
                                        <div className="uk-h3 uk-text-center">Login To Assemble Giving</div>
                                        <form className="uk-form-stacked" onSubmit={(e)=>{that.SubmitLogin(e)}}>
                                            <div className="uk-margin-bottom">
                                                <label className="uk-form-label">Email Address</label>
                                                <div className="uk-form-controls">
                                                    <input type="text" className="uk-input" value={this.state.loginForm.email} onChange={(e)=>{that.UpdateLoginForm("email", e.target.value)}} disabled={this.state.submitting}/>
                                                </div>
                                            </div>
                                            <div className="uk-margin-bottom">
                                                <div className="uk-form-label">Password</div>
                                                <div className="uk-form-controls uk-form-controls-text">
                                                    <input type="password" className="uk-input" value={this.state.loginForm.password} onChange={(e)=>{that.UpdateLoginForm("password", e.target.value)}} disabled={this.state.submitting}/>
                                                </div>
                                            </div>
                                            <div className="uk-margin-bottom">
                                                <div className="uk-form-controls uk-form-controls-text">
                                                    <input type="submit" className="uk-button uk-width-1-1 uk-margin-bottom" value={this.state.submitting?"...":"Login"} disabled={this.state.submitting}/>
                                                </div>
                                                {this.state.loginError &&
                                                    <div className="uk-alert-danger uk-text-center">{this.state.loginError}</div>
                                                }
                                            </div>
                                            <div className="uk-margin-bottom uk-text-center">
                                                <Link to="/forgotton-password" className="uk-link-muted">Forgot Password?</Link>
                                            </div>
                                        </form>
                                        <hr />
                                        <div className="uk-h3 uk-text-center">Register To Assemble Giving</div>
                                        <p className="uk-text">To register for Assemble Giving, make your first donation on the main Assemble Church website.</p>
                                        <a href="https://www.assemblechurch.com/giving/give-online" className="uk-text uk-text-muted">Go To Assemble Church</a>
                                    </div>
                                </div>
                                <div className="uk-width-1-4"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
};

export default Login;