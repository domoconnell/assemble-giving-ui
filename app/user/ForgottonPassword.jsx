import React, {Component} from "react";
import Navbar from "../components/Navbar/Navbar.jsx";
import Functions from "../helpers/Functions.js";

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

var ForgottonPassword = class extends Component{
    constructor(props){
        super(props)
        this.state = {
            redirect: false,
            fp:{
                email: "",
                code:"",
                password:"",
                confirmPassword:"",
                passwordHelpers: []
            },
            initialPartSubmitted: false,
            fpError: false,
            submitting: false
        }
    }
    componentDidMount(){
        
    }
    UpdateFpForm(key, value){
        let fp = this.state.fp;
        fp[key] = value;
        if(key=="password"){
            fp.passwordHelpers = Functions.PasswordValidation(value)
        }
        this.setState({fp: fp});

    }
    SubmitFP(e){
        e.preventDefault();
        let that = this;
        if(this.state.initialPartSubmitted){
            this.PasswordResetConfirm()
            return;
        }
        let error = false;
        if(this.state.fp.email == ""){
            error = "Email is required";
        }else if(!Functions.IsValidEmail(this.state.fp.email)){
            error = "Email is invalid";
        }
        if(error){
            this.setState({
                fpError: error
            })
            return
        }

        this.setState({submitting: true, fpError: false});
        axios.get(API_URL + "password-reset?email=" + this.state.fp.email).then(function(response){
            that.setState({
                fpError: false,
                submitting: false,
                initialPartSubmitted: true
            });

        }).catch(function(error){
            let e = "An error occurred while trying to reset your password. Please try again later.";
            if(error && error.response && error.response.data && error.response.data.error){
                e = error.response.data.error;
            }
            that.setState({
                fpError: e,
                submitting: false
            });
        })

    }
    PasswordResetConfirm(){
        let that = this;
        //validation checks on inputs
        let error = false;
        if(this.state.fp.password == ""){
            error = "Password is required";
        }else if(this.state.fp.password != this.state.fp.confirmPassword){
            error = "Passwords do not match";
        }else if(this.state.fp.code.length!=6){
            error = "Code is invalid";
        }else if(this.state.fp.passwordHelpers.length>0){
            error = "Password is invalid";
        }
        if(error){
            this.setState({
                fpError: error
            })
            return
        }
        this.setState({submitting: true, fpError: false});

        let body = {
            email: this.state.fp.email,
            password: this.state.fp.password,
            passwordconfirm: this.state.fp.confirmPassword,
            resetcode: this.state.fp.code
        }
        axios.post(API_URL + "password-reset-submit", body).then(function(response){
            that.setState({
                redirect: true,
            });
        }).catch(function(error){
            console.log(error)
            let e = "An error occurred while trying to reset your password. Please try again later.";
            if(error && error.response && error.response.data && error.response.data.error){
                e = error.response.data.error;
            }
            that.setState({
                fpError: e,
                submitting: false
            });
        })
    }
    render(){
        if(this.state.redirect){
            return <Navigate to="/" replace />
        }
        let that = this;
        let resetText = "Reset Password";
        if(this.state.initialPartSubmitted && !this.state.submitting){
            resetText = "Confirm Reset";
        }else if(this.state.submitting){
            resetText = "...";
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
                                        <div className="uk-h3 uk-text-center">Forgotton Password</div>
                                        <form className="uk-form-stacked" onSubmit={(e)=>{that.SubmitFP(e)}}>
                                            <div className="uk-margin-bottom">
                                                <label className="uk-form-label">Email Address</label>
                                                <div className="uk-form-controls">
                                                    <input type="text" className="uk-input" value={this.state.fp.email} onChange={(e)=>{that.UpdateFpForm("email", e.target.value)}} disabled={this.state.submitting || this.state.initialPartSubmitted}/>
                                                </div>
                                            </div>
                                            {this.state.initialPartSubmitted &&
                                                <React.Fragment>
                                                    <div className="uk-margin-bottom">
                                                        <div className="uk-form-label">Verification Code</div>
                                                        <div className="uk-form-controls uk-form-controls-text">
                                                            <input type="text" maxLength={6} className="uk-input" value={this.state.fp.code} onChange={(e)=>{that.UpdateFpForm("code", e.target.value)}} disabled={this.state.submitting}/>
                                                        </div>
                                                    </div>
                                                    <div className="uk-margin-bottom">
                                                        <div className="uk-form-label">Password</div>
                                                        <div className="uk-form-controls uk-form-controls-text">
                                                            <input type="password" className="uk-input" value={this.state.fp.password} onChange={(e)=>{that.UpdateFpForm("password", e.target.value)}} disabled={this.state.submitting}/>
                                                        </div>
                                                        <div className="uk-text-danger">
                                                            {this.state.fp.passwordHelpers.map(function(helper){
                                                                return <div key={Math.random()}>{helper}</div>
                                                            })}
                                                        </div>
                                                    </div>
                                                    <div className="uk-margin-bottom">
                                                        <div className="uk-form-label">Confirm Password</div>
                                                        <div className="uk-form-controls uk-form-controls-text">
                                                            <input type="password" className="uk-input" value={this.state.fp.confirmPassword} onChange={(e)=>{that.UpdateFpForm("confirmPassword", e.target.value)}} disabled={this.state.submitting || this.state.fp.password.length==0 || this.state.fp.passwordHelpers.length>0}/>
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                            }
                                            <div className="uk-margin-bottom">
                                                <div className="uk-form-controls uk-form-controls-text">
                                                    <input type="submit" className="uk-button uk-width-1-1 uk-margin-bottom" value={resetText} disabled={this.state.submitting}/>
                                                </div>
                                                {this.state.fpError &&
                                                    <div className="uk-alert-danger uk-text-center">{this.state.fpError}</div>
                                                }
                                            </div>
                                        </form>
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

export default ForgottonPassword;

